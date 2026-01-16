'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations';

/**
 * CTA Section final con mensaje persuasivo
 */
export default function CTASection() {
    const t = useTranslations('cta');

    return (
        <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 rounded-[2rem] p-12 lg:p-24 relative overflow-hidden shadow-2xl border border-gray-800">
                {/* Orbes de color dopamina de fondo */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-8">
                    <h2 className="text-white text-4xl lg:text-6xl font-black tracking-tight max-w-[800px] mx-auto">
                        {t('title')}
                    </h2>
                    <p className="text-white text-lg lg:text-xl max-w-[600px] mx-auto font-medium">
                        {t('subtitle')}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <div className="relative">
                            {/* Glow effect para botón principal */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-50"></div>
                            <Link
                                href="/login"
                                className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold px-10 py-4 rounded-xl hover:scale-[1.05] transition-all shadow-2xl block text-center"
                            >
                                {t('button')}
                            </Link>
                        </div>
                        <Link
                            href="#pricing"
                            className="bg-white/10 border-2 border-white/20 text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm"
                        >
                            {t('learnMore')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
