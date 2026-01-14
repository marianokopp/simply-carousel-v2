'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function SuccessPage() {
    const router = useRouter();
    const [status, setStatus] = useState<'checking' | 'activated' | 'timeout'>('checking');
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        const supabase = createClient();
        let attempts = 0;
        const maxAttempts = 10; // 30 segundos (3 seg × 10)

        // Función para verificar activación
        const checkActivation = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login');
                return;
            }

            const { data } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .eq('status', 'active')
                .single();

            if (data) {
                // ¡Activada!
                setStatus('activated');
                setTimeout(() => {
                    router.push('/generator');
                }, 2000);
                return true;
            }

            return false;
        };

        // Polling cada 3 segundos
        const interval = setInterval(async () => {
            attempts++;
            setCountdown(30 - attempts * 3);

            const activated = await checkActivation();

            if (activated || attempts >= maxAttempts) {
                clearInterval(interval);
                if (!activated) {
                    setStatus('timeout');
                }
            }
        }, 3000);

        // Check inicial inmediato
        checkActivation();

        return () => clearInterval(interval);
    }, [router]);

    if (status === 'checking') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl text-center">
                    <Loader2 className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-spin" />
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        Procesando tu suscripción...
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Esto puede tomar hasta 30 segundos
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Verificando ({countdown}s restantes)
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'activated') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl text-center">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-black mb-2 text-gray-900 dark:text-white">
                        ¡Bienvenido a Pro! 🎉
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Tu cuenta ha sido activada exitosamente
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
                        Redirigiendo al generador...
                    </div>
                </div>
            </div>
        );
    }

    // Timeout
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl text-center">
                <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    Estamos verificando tu pago
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    El proceso está tomando más tiempo del esperado. Tu cuenta se activará
                    automáticamente en los próximos minutos.
                </p>
                <button
                    onClick={() => router.push('/generator')}
                    className="bg-primary text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
                >
                    Ir al generador
                </button>
            </div>
        </div>
    );
}
