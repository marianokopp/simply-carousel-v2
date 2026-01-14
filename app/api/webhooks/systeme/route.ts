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

/**
 * Webhook handler para eventos de Systeme.io
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = req.headers.get('x-systeme-signature');

        // 1. Verificar firma del webhook
        if (!verifySignature(body, signature)) {
            console.error('Invalid webhook signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const event = JSON.parse(body);

        console.log('[Systeme Webhook] Event received:', event.type);

        // 2. Procesar según tipo de evento
        switch (event.type) {
            case 'order.completed':
                await handleOrderCompleted(event.data);
                break;

            case 'subscription.activated':
                await handleSubscriptionActivated(event.data);
                break;

            case 'subscription.cancelled':
                await handleSubscriptionCancelled(event.data);
                break;

            case 'subscription.renewed':
                await handleSubscriptionRenewed(event.data);
                break;

            case 'subscription.failed':
                await handleSubscriptionFailed(event.data);
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
 * Handler: Order completed (pago inicial exitoso)
 */
async function handleOrderCompleted(data: any) {
    const { contact_email, contact_id, product_id, order_id } = data;

    console.log('[Systeme Webhook] Order completed:', {
        email: contact_email,
        contactId: contact_id,
        orderId: order_id,
    });

    // Buscar usuario por email
    const { data: user, error: userError } = await supabase
        .from('auth.users')
        .select('id')
        .eq('email', contact_email)
        .single();

    if (userError || !user) {
        console.error(
            '[Systeme Webhook] User not found for email:',
            contact_email,
            userError
        );
        return;
    }

    // Crear o actualizar suscripción
    const { error: subError } = await supabase.from('subscriptions').upsert(
        {
            user_id: user.id,
            systeme_contact_id: contact_id,
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

    console.log('[Systeme Webhook] ✅ Subscription created for user:', user.id);
}

/**
 * Handler: Subscription activated
 */
async function handleSubscriptionActivated(data: any) {
    const { contact_id, subscription_id } = data;

    console.log('[Systeme Webhook] Subscription activated:', subscription_id);

    const { error } = await supabase
        .from('subscriptions')
        .update({
            systeme_subscription_id: subscription_id,
            status: 'active',
            started_at: new Date().toISOString(),
        })
        .eq('systeme_contact_id', contact_id);

    if (error) {
        console.error('[Systeme Webhook] Error activating subscription:', error);
        return;
    }

    console.log('[Systeme Webhook] ✅ Subscription activated:', subscription_id);
}

/**
 * Handler: Subscription cancelled
 */
async function handleSubscriptionCancelled(data: any) {
    const { subscription_id } = data;

    console.log('[Systeme Webhook] Subscription cancelled:', subscription_id);

    const { error } = await supabase
        .from('subscriptions')
        .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
        })
        .eq('systeme_subscription_id', subscription_id);

    if (error) {
        console.error('[Systeme Webhook] Error cancelling subscription:', error);
        return;
    }

    console.log('[Systeme Webhook] ❌ Subscription cancelled:', subscription_id);
}

/**
 * Handler: Subscription renewed (pago mensual exitoso)
 */
async function handleSubscriptionRenewed(data: any) {
    const { subscription_id, next_billing_date } = data;

    console.log('[Systeme Webhook] Subscription renewed:', subscription_id);

    const { error } = await supabase
        .from('subscriptions')
        .update({
            status: 'active',
            expires_at: next_billing_date || calculateExpiryDate('pro_monthly'),
        })
        .eq('systeme_subscription_id', subscription_id);

    if (error) {
        console.error('[Systeme Webhook] Error renewing subscription:', error);
        return;
    }

    console.log('[Systeme Webhook] 🔄 Subscription renewed:', subscription_id);
}

/**
 * Handler: Payment failed (aplicar grace period)
 */
async function handleSubscriptionFailed(data: any) {
    const { subscription_id } = data;

    console.log('[Systeme Webhook] Payment failed:', subscription_id);

    // Grace period de 7 días
    const graceExpiry = new Date();
    graceExpiry.setDate(graceExpiry.getDate() + 7);

    const { error } = await supabase
        .from('subscriptions')
        .update({
            status: 'past_due',
            expires_at: graceExpiry.toISOString(),
        })
        .eq('systeme_subscription_id', subscription_id);

    if (error) {
        console.error('[Systeme Webhook] Error updating failed payment:', error);
        return;
    }

    console.log('[Systeme Webhook] ⚠️ Payment failed, grace period applied:', subscription_id);
}
