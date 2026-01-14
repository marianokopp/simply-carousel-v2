import { createClient } from '@/lib/supabase/server';

/**
 * Interface de suscripción
 */
export interface Subscription {
    id: string;
    user_id: string;
    systeme_contact_id: string | null;
    systeme_subscription_id: string | null;
    plan: 'free' | 'pro_monthly';
    status: 'active' | 'inactive' | 'cancelled' | 'expired' | 'past_due';
    started_at: string | null;
    expires_at: string | null;
    cancelled_at: string | null;
    created_at: string;
    updated_at: string;
}

/**
 * Resultado de verificación de suscripción
 */
export interface SubscriptionCheck {
    isPro: boolean;
    plan: 'free' | 'pro_monthly';
    status: string;
    expiresAt?: string;
}

/**
 * Resultado de verificación de límites
 */
export interface CarouselLimitCheck {
    allowed: boolean;
    reason?: string;
    currentCount?: number;
    limit?: number;
    requiresUpgrade?: boolean;
}

/**
 * Verifica el estado de suscripción de un usuario
 */
export async function checkSubscription(userId: string): Promise<SubscriptionCheck> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error || !data) {
        return {
            isPro: false,
            plan: 'free',
            status: 'inactive',
        };
    }

    // Verificar si la suscripción está activa y no expiró
    const now = new Date();
    const expiresAt = data.expires_at ? new Date(data.expires_at) : null;

    const isActive = data.status === 'active' && (!expiresAt || expiresAt > now);

    return {
        isPro: isActive,
        plan: data.plan as 'free' | 'pro_monthly',
        status: data.status,
        expiresAt: data.expires_at,
    };
}

/**
 * Obtiene la cantidad de carruseles creados por un usuario en un mes específico
 */
export async function getUserCarouselCount(
    userId: string,
    month: number,
    year: number
): Promise<number> {
    const supabase = await createClient();

    // Calcular inicio y fin del mes
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const { count, error } = await supabase
        .from('carousels')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

    if (error) {
        console.error('Error counting carousels:', error);
        return 0;
    }

    return count || 0;
}

/**
 * Verifica si un usuario puede crear un nuevo carrusel
 */
export async function canCreateCarousel(userId: string): Promise<CarouselLimitCheck> {
    const { isPro } = await checkSubscription(userId);

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const count = await getUserCarouselCount(userId, currentMonth, currentYear);

    // Límites según plan
    const limit = isPro ? 30 : 3;

    if (count >= limit) {
        return {
            allowed: false,
            reason: isPro
                ? 'Has alcanzado el límite de 30 carruseles este mes.'
                : 'Has alcanzado el límite de 3 carruseles gratis este mes. Upgrade a Pro para crear más.',
            currentCount: count,
            limit,
            requiresUpgrade: !isPro,
        };
    }

    return {
        allowed: true,
        currentCount: count,
        limit,
    };
}

/**
 * Calcula la fecha de expiración según el plan
 */
export function calculateExpiryDate(plan: 'pro_monthly'): string {
    const now = new Date();

    if (plan === 'pro_monthly') {
        now.setMonth(now.getMonth() + 1);
    }

    return now.toISOString();
}

/**
 * Obtiene la suscripción completa de un usuario
 */
export async function getUserSubscription(userId: string): Promise<Subscription | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error || !data) {
        return null;
    }

    return data as Subscription;
}
