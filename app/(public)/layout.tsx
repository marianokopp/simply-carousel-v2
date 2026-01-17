'use client';

import { LocaleProvider } from '@/lib/useTranslations';

/**
 * Layout para rutas públicas (landing, pricing, login)
 * No requiere autenticación
 * Incluye el LocaleProvider para traducciones
 */
export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LocaleProvider>
            <div className="min-h-screen bg-background-light dark:bg-background-dark">
                {children}
            </div>
        </LocaleProvider>
    );
}
