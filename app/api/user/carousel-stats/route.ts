import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkSubscription, getUserCarouselCount } from '@/lib/subscriptions';

/**
 * GET /api/user/carousel-stats
 * Obtiene estadísticas del usuario: plan, límite y carruseles creados este mes
 */
export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'No autenticado' },
                { status: 401 }
            );
        }

        // Obtener suscripción y plan
        const subscription = await checkSubscription(user.id);
        const plan = subscription?.plan || 'free';
        const limit = plan === 'pro_monthly' ? 30 : 3;

        // Obtener contador del mes actual
        const now = new Date();
        const count = await getUserCarouselCount(
            user.id,
            now.getMonth() + 1,
            now.getFullYear()
        );

        return NextResponse.json({
            plan: plan === 'pro_monthly' ? 'pro' : 'free',
            limit,
            count,
            remaining: Math.max(0, limit - count),
        });
    } catch (error) {
        console.error('Error fetching carousel stats:', error);
        return NextResponse.json(
            { error: 'Error al obtener estadísticas' },
            { status: 500 }
        );
    }
}
