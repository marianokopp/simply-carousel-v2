'use client';

import { createClient } from '@/lib/supabase/client';

interface UpgradeButtonProps {
    source?: string;
    className?: string;
    children?: React.ReactNode;
}

/**
 * Botón para redirigir al checkout de Systeme.io
 */
export default function UpgradeButton({
    source = 'app',
    className = '',
    children = 'Upgrade to Pro',
}: UpgradeButtonProps) {
    const handleUpgrade = async () => {
        const supabase = createClient();

        // Obtener email del usuario actual
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            // Si no está autenticado, redirigir a login
            window.location.href = '/login';
            return;
        }

        // URL del checkout de Systeme.io con email pre-rellenado
        const checkoutUrl = new URL(process.env.NEXT_PUBLIC_SYSTEME_CHECKOUT_URL!);
        checkoutUrl.searchParams.set('email', user.email!);
        checkoutUrl.searchParams.set('source', source);

        // Redirigir al checkout
        window.location.href = checkoutUrl.toString();
    };

    return (
        <button
            onClick={handleUpgrade}
            className={
                className ||
                'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-6 py-3 rounded-lg hover:scale-105 transition-all shadow-lg'
            }
        >
            {children}
        </button>
    );
}
