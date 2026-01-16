'use client';

import { useTranslations } from '@/lib/useTranslations';

/**
 * Features section destacando los beneficios principales
 * Enfocado en pain points de profesionales no-diseñadores
 */
export default function Features() {
    const t = useTranslations('features');

    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            title: t('aiGeneration.title'),
            description: t('aiGeneration.description'),
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: t('professionalDesigns.title'),
            description: t('professionalDesigns.description'),
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            title: t('brandCustomization.title'),
            description: t('brandCustomization.description'),
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            ),
            title: t('instantExport.title'),
            description: t('instantExport.description'),
        },
    ];

    return (
        <section id="features" className="bg-white dark:bg-background-dark py-24 border-y border-gray-100 dark:border-gray-800">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm">{t('title')}</h2>
                    <h3 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                        {t('subtitle')}
                    </h3>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-accent-green/30 hover:shadow-xl hover:shadow-accent-green/5 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-xl bg-accent-green/10 text-accent-green flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
