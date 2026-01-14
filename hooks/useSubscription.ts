'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SubscriptionCheck } from '@/lib/subscriptions';

/**
 * Hook para obtener el estado de suscripción del usuario actual
 */
export function useSubscription() {
    const [subscription, setSubscription] = useState<SubscriptionCheck | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    const loadSubscription = async () => {
        try {
            setLoading(true);
            setError(null);

            // Obtener usuario autenticado
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                setSubscription({
                    isPro: false,
                    plan: 'free',
                    status: 'inactive',
                });
                setLoading(false);
                return;
            }

            // Obtener suscripción del usuario
            const { data, error: subError } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (subError || !data) {
                setSubscription({
                    isPro: false,
                    plan: 'free',
                    status: 'inactive',
                });
                setLoading(false);
                return;
            }

            // Verificar si está activa (no expirada)
            const now = new Date();
            const expiresAt = data.expires_at ? new Date(data.expires_at) : null;
            const isActive = data.status === 'active' && (!expiresAt || expiresAt > now);

            setSubscription({
                isPro: isActive,
                plan: data.plan,
                status: data.status,
                expiresAt: data.expires_at,
            });
        } catch (err) {
            console.error('Error loading subscription:', err);
            setError('Error al cargar suscripción');
            setSubscription({
                isPro: false,
                plan: 'free',
                status: 'inactive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSubscription();
    }, []);

    return {
        subscription,
        loading,
        error,
        refresh: loadSubscription,
    };
}
