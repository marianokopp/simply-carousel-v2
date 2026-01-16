'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations';

/**
 * Pricing section con planes Free y Pro
 * Free: 3 carruseles/mes
 * Pro: $5.99/mes - 30 carruseles/mes
 */
export default function Pricing() {
    const t = useTranslations('pricing');

    const plans = [
        {
            name: t('free.name'),
            price: t('free.price'),
            period: t('monthly'),
            description: t('free.description'),
            features: [
                t('free.feature1'),
                t('free.feature2'),
                t('free.feature3'),
                t('free.feature4'),
            ],
            cta: t('startFree'),
            ctaLink: '/login',
            highlighted: false,
        },
        {
            name: t('pro.name'),
            price: t('pro.price'),
            period: t('monthly'),
            description: t('pro.description'),
            features: [
                t('pro.feature1'),
                t('pro.feature2'),
                t('pro.feature3'),
                t('pro.feature4'),
                t('pro.feature5'),
            ],
            cta: t('upgradeToPro'),
            ctaLink: '/login',
            highlighted: true,
        },
    ];

    return (
        <section id="pricing" className="bg-gray-50 dark:bg-gray-900/50 py-24 border-y border-gray-100 dark:border-gray-800">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                        {t('title')}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 max-w-[600px] mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative p-8 rounded-2xl border-2 ${plan.highlighted
                                    ? 'border-accent-green bg-white dark:bg-gray-900 shadow-2xl shadow-accent-green/20 scale-105'
                                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
                                } transition-all hover:shadow-xl`}
                        >
                            {/* Badge */}
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-accent-green to-emerald-600 text-white text-xs font-bold uppercase tracking-wider">
                                    {t('recommended')}
                                </div>
                            )}

                            {/* Header */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{plan.description}</p>

                                <div className="flex items-end justify-center gap-1">
                                    <span className="text-5xl font-black text-gray-900 dark:text-white">{plan.price}</span>
                                    {plan.price !== '$0' && (
                                        <span className="text-gray-600 dark:text-gray-400 mb-2">{plan.period}</span>
                                    )}
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                href={plan.ctaLink}
                                className={`block text-center py-4 rounded-xl font-bold transition-all ${plan.highlighted
                                        ? 'bg-gradient-to-r from-accent-green to-emerald-600 text-white hover:shadow-lg hover:shadow-accent-green/50 hover:scale-105'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Note */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-12">
                    {t('limitNote')}
                </p>
            </div>
        </section>
    );
}
