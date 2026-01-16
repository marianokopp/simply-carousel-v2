import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Idiomas soportados
export const locales = ['en', 'es'] as const;
export const defaultLocale = 'es' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
    // Validar que el locale es soportado
    if (!locales.includes(locale as Locale)) notFound();

    return {
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
