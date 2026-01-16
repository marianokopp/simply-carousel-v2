'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from '@/components/ui/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslations } from '@/lib/useTranslations';

/**
 * Header para la landing page
 * Fixed top con navegación y CTAs
 */
export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const t = useTranslations('nav');

    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <Logo size={32} />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    <a className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-primary transition-colors" href="#features">
                        {t('features')}
                    </a>
                    <a className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-primary transition-colors" href="#how-it-works">
                        {t('howItWorks')}
                    </a>
                    <a className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-primary transition-colors" href="#pricing">
                        {t('pricing')}
                    </a>
                </nav>

                {/* CTAs */}
                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <LanguageSwitcher />

                    <Link
                        href="/login"
                        className="text-sm font-bold text-gray-700 dark:text-gray-200 px-4 py-2 hover:text-primary transition-colors hidden sm:block"
                    >
                        {t('login')}
                    </Link>
                    <Link
                        href="/login"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:scale-105 transition-all shadow-lg shadow-purple-500/30"
                    >
                        {t('getStarted')}
                    </Link>
                </div>
            </div>
        </header>
    );
}
