'use client';

import Link from 'next/link';

/**
 * Hero section con headline enfocado en "3 minutos"
 * y pain points de profesionales no-diseñadores
 */
export default function Hero() {
    return (
        <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Copy */}
                <div className="space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-600 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                        </span>
                        Con IA Generativa
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-[-0.04em] text-gray-900 dark:text-white">
                        Crea carruseles profesionales en{' '}
                        <span className="text-primary">menos de 3 minutos</span>
                    </h1>

                    {/* Sub-headline - Pain Points */}
                    <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-[540px]">
                        <strong className="text-gray-900 dark:text-white">No necesitas saber diseñar.</strong>
                        {' '}No más horas perdidas en Canva o Figma. Enfócate en tu contenido, nosotros nos encargamos del diseño.
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
                                Empieza gratis
                            </Link>
                        </div>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                        <div className="flex -space-x-2">
                            {/* Avatar placeholders */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-background-dark"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white dark:border-background-dark"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white dark:border-background-dark"></div>
                        </div>
                        <span>+2,000 profesionales ahorrando tiempo</span>
                    </div>
                </div>

                {/* Right Column - Browser Mockup */}
                <div className="relative">
                    {/* Orbes de color dopamina de fondo */}
                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-20"></div>
                    <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20"></div>
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full"></div>

                    {/* Browser Container */}
                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
                        {/* Browser Header */}
                        <div className="h-10 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="mx-auto bg-white dark:bg-gray-700 px-4 py-1 rounded text-[10px] text-gray-400 w-1/2 text-center">
                                simplycarousel.app/generator
                            </div>
                        </div>

                        {/* UI Simulation */}
                        <div className="flex h-full min-h-[400px]">
                            {/* Left Sidebar */}
                            <div className="w-20 lg:w-24 border-r border-gray-100 dark:border-gray-800 flex flex-col items-center py-6 gap-8 bg-gray-50/50 dark:bg-gray-900/50">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div className="p-2 rounded-lg text-gray-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                </div>
                                <div className="p-2 rounded-lg text-gray-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 p-6 space-y-4">
                                <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                <div className="h-32 w-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-300">
                                    <div className="text-center">
                                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        <p className="text-xs">Escribe tu idea aquí...</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="aspect-square bg-primary/5 rounded-lg border border-primary/20 flex flex-col p-2">
                                        <div className="h-2 w-full bg-primary/20 rounded mb-1"></div>
                                        <div className="h-2 w-2/3 bg-primary/10 rounded"></div>
                                    </div>
                                    <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col p-2">
                                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                                        <div className="h-2 w-2/3 bg-gray-100 dark:bg-gray-600 rounded"></div>
                                    </div>
                                    <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col p-2">
                                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                                        <div className="h-2 w-2/3 bg-gray-100 dark:bg-gray-600 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
