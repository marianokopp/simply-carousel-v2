'use client';

import Link from 'next/link';

/**
 * Pricing section con planes Free y Pro
 * Free: 3 carruseles/mes
 * Pro: $5.99/mes - 30 carruseles/mes
 */
export default function Pricing() {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            period: 'siempre',
            description: 'Perfecto para probar',
            features: [
                '3 carruseles por mes',
                'Templates básicos',
                'Export PNG',
                'Con marca de agua',
            ],
            cta: 'Empezar gratis',
            ctaLink: '/login',
            highlighted: false,
        },
        {
            name: 'Pro',
            price: '$5.99',
            period: 'por mes',
            description: 'Para creadores serios',
            features: [
                '30 carruseles por mes',
                'Todos los templates',
                'Exportación en PNG',
                'Sin marca de agua',
                'Soporte prioritario',
                'Nuevas features primero',
            ],
            cta: 'Upgrade a Pro',
            ctaLink: '/login',
            highlighted: true,
        },
    ];

    return (
        <section id="pricing" className="bg-gray-50 dark:bg-gray-900/50 py-24 border-y border-gray-100 dark:border-gray-800">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Precios</h2>
                    <h3 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                        Empieza gratis, escala cuando quieras
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-[600px] mx-auto">
                        Sin trucos, sin cargos ocultos. Cancela cuando quieras.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative p-8 rounded-2xl transition-all duration-300 ${plan.highlighted
                                ? 'bg-gray-900 dark:bg-gray-950 border-2 border-purple-500 shadow-2xl shadow-purple-500/20 scale-105'
                                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                    ⭐ Más Popular
                                </div>
                            )}

                            {/* Plan Name */}
                            <h4 className={`text-2xl font-black mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                                }`}>
                                {plan.name}
                            </h4>
                            <p className={`text-sm mb-6 font-medium ${plan.highlighted ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-5xl font-black ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                                        }`}>
                                        {plan.price}
                                    </span>
                                    <span className={`text-lg font-semibold ${plan.highlighted ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'
                                        }`}>
                                        {plan.period}
                                    </span>
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg
                                            className={`w-6 h-6 flex-shrink-0 ${plan.highlighted ? 'text-purple-400' : 'text-accent-green'
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className={`font-medium ${plan.highlighted ? 'text-gray-100' : 'text-gray-800 dark:text-gray-100'
                                            }`}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                href={plan.ctaLink}
                                className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${plan.highlighted
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-[1.02] shadow-2xl shadow-purple-500/30'
                                    : 'bg-white border-3 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <p className="text-center text-gray-800 dark:text-gray-200 font-bold text-sm mt-12">
                    💳 No se requiere tarjeta de crédito para la versión Free
                </p>
            </div>
        </section>
    );
}
