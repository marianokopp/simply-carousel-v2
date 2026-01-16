'use client';

import { useTranslations } from '@/lib/useTranslations';

/**
 * How It Works section - Proceso en 3 pasos
 */
export default function HowItWorks() {
    const t = useTranslations('howItWorks');

    const steps = [
        {
            number: '1',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            ),
            title: t('step1.title'),
            description: t('step1.description'),
        },
        {
            number: '2',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            title: t('step2.title'),
            description: t('step2.description'),
        },
        {
            number: '3',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            ),
            title: t('step3.title'),
            description: t('step3.description'),
        },
    ];

    return (
        <section id="how-it-works" className="bg-white dark:bg-background-dark py-24">
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

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connection Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-accent-green/50 to-transparent"></div>
                            )}

                            {/* Step Card */}
                            <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-gray-100 dark:border-gray-800 hover:border-accent-green/30 hover:shadow-xl hover:shadow-accent-green/5 transition-all">
                                {/* Step Number */}
                                <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-accent-green to-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-lg">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-accent-green/10 text-accent-green flex items-center justify-center mb-6 mt-4">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
