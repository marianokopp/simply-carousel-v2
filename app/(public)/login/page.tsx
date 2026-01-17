'use client';

import LoginForm from '@/components/features/auth/LoginForm';
import Logo from '@/components/ui/Logo';
import LanguageSwitch from '@/components/LanguageSwitch';
import { useTranslations } from '@/lib/useTranslations';

/**
 * Página de login principal
 * Ruta: /login
 */
export default function LoginPage() {
    const t = useTranslations('auth');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
            {/* Language switch in corner */}
            <div className="absolute top-4 right-4">
                <LanguageSwitch />
            </div>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <Logo size={64} className="flex-col !gap-4" />
                    <p className="text-gray-600 mt-2">{t('tagline')}</p>
                </div>

                <LoginForm />

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>{t('termsPrefix')} <a href="/legal" className="underline">{t('termsLink')}</a></p>
                </div>
            </div>
        </div>
    );
}
