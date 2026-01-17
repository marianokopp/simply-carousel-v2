'use client';

import { useLocale } from '@/lib/useTranslations';

/**
 * Selector de idioma con botones ES/EN
 * Usa el sistema de localStorage para cambiar idioma
 */
export function LanguageSwitcher() {
    const { locale, setLocale } = useLocale();

    return (
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <button
                onClick={() => setLocale('es')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${locale === 'es'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                aria-label="Cambiar a español"
            >
                🇪🇸 ES
            </button>
            <button
                onClick={() => setLocale('en')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${locale === 'en'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                aria-label="Switch to English"
            >
                🇬🇧 EN
            </button>
        </div>
    );
}
