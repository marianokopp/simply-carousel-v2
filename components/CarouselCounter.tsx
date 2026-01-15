'use client';

import { useEffect, useState } from 'react';

/**
 * Muestra el contador de carruseles disponibles del usuario
 */
export default function CarouselCounter() {
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(3);
    const [plan, setPlan] = useState<'free' | 'pro'>('free');

    useEffect(() => {
        loadCounterData();
    }, []);

    async function loadCounterData() {
        try {
            const response = await fetch('/api/user/carousel-stats');

            if (!response.ok) {
                if (response.status === 401) {
                    // Usuario no autenticado, mostrar valores por defecto
                    setLoading(false);
                    return;
                }
                throw new Error('Error fetching stats');
            }

            const data = await response.json();

            setPlan(data.plan);
            setLimit(data.limit);
            setCount(data.count);
        } catch (error) {
            console.error('Error loading carousel counter:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="text-sm text-gray-500">
                Cargando...
            </div>
        );
    }

    const remaining = Math.max(0, limit - count);
    const percentage = (count / limit) * 100;

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                    Carruseles este mes
                </span>
                <span className={`font-semibold ${remaining === 0 ? 'text-red-600' :
                    remaining <= 2 ? 'text-yellow-600' :
                        'text-gray-900 dark:text-white'
                    }`}>
                    {count} / {limit}
                </span>
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${percentage >= 100 ? 'bg-red-500' :
                        percentage >= 80 ? 'bg-yellow-500' :
                            'bg-blue-600'
                        }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                />
            </div>

            {/* Mensaje según estado */}
            {remaining === 0 && plan === 'free' && (
                <p className="text-xs text-red-600 dark:text-red-400">
                    Límite alcanzado.{' '}
                    <a href="/upgrade" className="underline font-semibold">
                        Upgrade a Pro
                    </a>
                    {' '}para crear hasta 30/mes
                </p>
            )}
            {remaining === 0 && plan === 'pro' && (
                <p className="text-xs text-red-600 dark:text-red-400">
                    Límite alcanzado. Se reinicia el 1° del mes.
                </p>
            )}
            {remaining > 0 && remaining <= 2 && plan === 'free' && (
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                    Quedan solo {remaining} carruseles.{' '}
                    <a href="/upgrade" className="underline">
                        Upgrade a Pro
                    </a>
                </p>
            )}
        </div>
    );
}
