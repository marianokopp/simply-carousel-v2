'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Selector de idioma que permite cambiar entre es/en
 */
export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLanguage = (newLocale: string) => {
        // Reemplazar el locale en el pathname
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <button
                onClick={() => switchLanguage('es')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${locale === 'es'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                aria-label="Cambiar a español"
            >
                🇪🇸 ES
            </button>
            <button
                onClick={() => switchLanguage('en')}
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
