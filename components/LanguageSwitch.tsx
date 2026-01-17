'use client';

import { useLocale } from '@/lib/useTranslations';

/**
 * Selector de idioma compacto
 */
export default function LanguageSwitch() {
    const { locale, setLocale } = useLocale();

    return (
        <button
            onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
            <span className="text-base">{locale === 'es' ? '🇪🇸' : '🇺🇸'}</span>
            <span className="uppercase">{locale}</span>
        </button>
    );
}
