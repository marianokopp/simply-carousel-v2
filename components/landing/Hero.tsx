'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations';

/**
 * Hero section con headline enfocado en "3 minutos"
 * y pain points de profesionales no-diseñadores
 */
export default function Hero() {
    const t = useTranslations('hero');

    return (
        <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Copy */}
                <div className="space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
                        <span className="relative flex h-2 w-2">
                            <spanClassName="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-600 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                    </span>
                    {t('badge')}
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-[-0.04em] text-gray-900 dark:text-white">
                    {t('title')}{' '}
                    <span className="text-primary">{t('subtitle')}</span>
                </h1>

                {/* Sub-headline - Pain Points */}
                <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-[540px]">
                    <strong className="text-gray-900 dark:text-white">{t('painPoint')}</strong>
                    {' '}{t('description')}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        {/* Orbes de color dopamina */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur-lg opacity-30 animate-pulse"></div>
                        <Link
                            href="/login"
                            className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-bold px-10 py-4 rounded-xl hover:scale-[1.05] transition-all shadow-2xl shadow-purple-500/50 text-center block"
                        >
                            {t('cta')}
                        </Link>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-6 pt-4">
                    <div className="flex items-center">
                        <div className="flex -space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white ring-2 ring-purple-100"></div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white ring-2 ring-blue-100"></div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-red-400 border-2 border-white ring-2 ring-pink-100"></div>
                        </div>
                        <p className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-bold text-gray-900 dark:text-white">+1,200</span> creadores activos
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
                {/* Gradient Orbs Background */}
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20"></div>

                {/* Phone Mockup */}
                <div className="relative z-10 mx-auto max-w-[320px]">
                    {/* Phone Frame */}
                    <div className="bg-gray-900 dark:bg-white rounded-[2.5rem] p-3 shadow-2xl">
                        {/* Top Bar */}
                        <div className="flex items-center justify-between mb-2 px-2">
                            <div className="flex items-center gap-1 text-white dark:text-gray-900 text-xs">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-600"></div>
                                <span className="font-bold">simplycarousel</span>
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="mx-auto bg-white dark:bg-gray-700 px-4 py-1 rounded text-[10px] text-gray-400 w-1/2 text-center">
                                12:34
                            </div>
                        </div>

                        {/* Carousel Preview */}
                        <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 rounded-2xl aspect-[4/5] p-6 flex flex-col items-center justify-center relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-40"></div>
                            <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-40"></div>

                            {/* Mock Content */}
                            <div className="relative z-10 text-center space-y-4">
                                <div className="p-2 rounded-lg text-gray-300">
                                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <div className="p-2 rounded-lg text-gray-300">
                                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                    </svg>
                                </div>

                                {/* Placeholder for text */}
                                <div className="h-32 w-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-300">
                                    <span className="text-xs font-semibold opacity-60">{t('benefit1')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Icons */}
                        <div className="flex items-center justify-between mt-3 px-2">
                            <div className="flex gap-4">
                                <svg className="w-6 h-6 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                                <svg className="w-6 h-6 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                </svg>
                                <svg className="w-6 h-6 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </div>
                            <svg className="w-6 h-6 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section >
    );
}
