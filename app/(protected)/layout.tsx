'use client';

import { LocaleProvider } from '@/lib/useTranslations';

/**
 * Layout para rutas protegidas (generator, editor, preview)
 * Requiere autenticación (manejado por middleware)
 * Incluye el LocaleProvider para traducciones
 */
export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LocaleProvider>
            {children}
        </LocaleProvider>
    );
}
