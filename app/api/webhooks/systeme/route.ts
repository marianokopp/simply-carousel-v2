import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { calculateExpiryDate } from '@/lib/subscriptions';

// Cliente Supabase con service_role para bypass RLS
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Secret compartido con Systeme.io
const WEBHOOK_SECRET = process.env.SYSTEME_WEBHOOK_SECRET!;
const PRO_TAG = process.env.SYSTEME_PRO_TAG || 'simply_carousel_pro';

/**
 * Webhook handler para eventos de Systeme.io
 * Eventos soportados:
 * - sale.completed: Venta realizada
 * - sale.cancelled: Venta cancelada/reembolsada
 * - contact.tag.added: Etiqueta asignada a contacto
 * - contact.tag.removed: Etiqueta removida de contacto
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = req.headers.get('x-systeme-signature');

        // 1. Verificar firma del webhook
        if (!verifySignature(body, signature)) {
            console.error('[Systeme Webhook] Invalid signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const event = JSON.parse(body);

        console.log('[Systeme Webhook] Event received:', event.type);

        // 2. Procesar según tipo de evento
        switch (event.type) {
            case 'sale.completed':
                await handleSaleCompleted(event.data);
                break;

            case 'sale.cancelled':
                await handleSaleCancelled(event.data);
                break;

            case 'contact.tag.added':
                await handleTagAdded(event.data);
                break;

            case 'contact.tag.removed':
                await handleTagRemoved(event.data);
                break;

            default:
                console.log('[Systeme Webhook] Unhandled event type:', event.type);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('[Systeme Webhook] Error:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}

/**
 * Verifica la firma HMAC SHA256 del webhook
 */
function verifySignature(body: string, signature: string | null): boolean {
    if (!signature || !WEBHOOK_SECRET) {
        console.warn('[Systeme Webhook] Missing signature or secret');
        return false;
    }

    const hash = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(body)
        .digest('hex');

    return hash === signature;
}

/**
 * Handler: Sale completed (venta realizada)
 * Se ejecuta cuando se completa un pago inicial
 */
async function handleSaleCompleted(data: any) {
    const { contact, order } = data;
    const email = contact?.email;
    const contactId = contact?.id;

    if (!email) {
        console.error('[Systeme Webhook] Sale completed: missing email');
        return;
    }

    console.log('[Systeme Webhook] Sale completed:', {
        email,
        contactId,
        orderId: order?.id,
        amount: order?.amount,
    });

    // Buscar usuario por email en Supabase
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
        console.error('[Systeme Webhook] Error fetching users:', userError);
        return;
    }

    const user = users.users.find((u) => u.email === email);

    if (!user) {
        console.error('[Systeme Webhook] User not found for email:', email);
        return;
    }

    // Crear o actualizar suscripción como activa
    const { error: subError } = await supabase.from('subscriptions').upsert(
        {
            user_id: user.id,
            systeme_contact_id: contactId?.toString(),
            plan: 'pro_monthly',
            status: 'active',
            started_at: new Date().toISOString(),
            expires_at: calculateExpiryDate('pro_monthly'),
        },
        {
            onConflict: 'user_id',
        }
    );

    if (subError) {
        console.error('[Systeme Webhook] Error creating subscription:', subError);
        return;
    }

    console.log('[Systeme Webhook] ✅ Subscription activated for user:', user.id);
}

/**
 * Handler: Sale cancelled (venta cancelada o reembolsada)
 * Se ejecuta cuando se cancela una suscripción o se reembolsa
 */
async function handleSaleCancelled(data: any) {
    const { contact } = data;
    const email = contact?.email;
    const contactId = contact?.id;

    if (!email) {
        console.error('[Systeme Webhook] Sale cancelled: missing email');
        return;
    }

    console.log('[Systeme Webhook] Sale cancelled:', { email, contactId });

    // Buscar usuario por email
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
        console.error('[Systeme Webhook] Error fetching users:', userError);
        return;
    }

    const user = users.users.find((u) => u.email === email);

    if (!user) {
        console.error('[Systeme Webhook] User not found for email:', email);
        return;
    }

    // Cancelar suscripción
    const { error } = await supabase
        .from('subscriptions')
        .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

    if (error) {
        console.error('[Systeme Webhook] Error cancelling subscription:', error);
        return;
    }

    console.log('[Systeme Webhook] ❌ Subscription cancelled for user:', user.id);
}

/**
 * Handler: Tag added (etiqueta asignada)
 * Se ejecuta cuando se asigna la etiqueta Pro a un contacto
 */
async function handleTagAdded(data: any) {
    const { contact, tag } = data;
    const email = contact?.email;
    const tagName = tag?.name;

    if (!email || !tagName) {
        console.error('[Systeme Webhook] Tag added: missing email or tag name');
        return;
    }

    // Solo procesar si es la etiqueta Pro
    if (tagName.toLowerCase() !== PRO_TAG.toLowerCase()) {
        console.log('[Systeme Webhook] Ignoring tag:', tagName);
        return;
    }

    console.log('[Systeme Webhook] Pro tag added:', { email, tag: tagName });

    // Buscar usuario por email
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
        console.error('[Systeme Webhook] Error fetching users:', userError);
        return;
    }

    const user = users.users.find((u) => u.email === email);

    if (!user) {
        console.error('[Systeme Webhook] User not found for email:', email);
        return;
    }

    // Activar suscripción Pro
    const { error: subError } = await supabase.from('subscriptions').upsert(
        {
            user_id: user.id,
            systeme_contact_id: contact?.id?.toString(),
            plan: 'pro_monthly',
            status: 'active',
            started_at: new Date().toISOString(),
            expires_at: calculateExpiryDate('pro_monthly'),
        },
        {
            onConflict: 'user_id',
        }
    );

    if (subError) {
        console.error('[Systeme Webhook] Error activating Pro:', subError);
        return;
    }

    console.log('[Systeme Webhook] ✅ Pro activated via tag for user:', user.id);
}

/**
 * Handler: Tag removed (etiqueta removida)
 * Se ejecuta cuando se remueve la etiqueta Pro de un contacto
 */
async function handleTagRemoved(data: any) {
    const { contact, tag } = data;
    const email = contact?.email;
    const tagName = tag?.name;

    if (!email || !tagName) {
        console.error('[Systeme Webhook] Tag removed: missing email or tag name');
        return;
    }

    // Solo procesar si es la etiqueta Pro
    if (tagName.toLowerCase() !== PRO_TAG.toLowerCase()) {
        console.log('[Systeme Webhook] Ignoring tag removal:', tagName);
        return;
    }

    console.log('[Systeme Webhook] Pro tag removed:', { email, tag: tagName });

    // Buscar usuario por email
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
        console.error('[Systeme Webhook] Error fetching users:', userError);
        return;
    }

    const user = users.users.find((u) => u.email === email);

    if (!user) {
        console.error('[Systeme Webhook] User not found for email:', email);
        return;
    }

    // Desactivar suscripción
    const { error } = await supabase
        .from('subscriptions')
        .update({
            status: 'inactive',
            cancelled_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

    if (error) {
        console.error('[Systeme Webhook] Error deactivating Pro:', error);
        return;
    }

    console.log('[Systeme Webhook] ❌ Pro deactivated via tag removal for user:', user.id);
}
