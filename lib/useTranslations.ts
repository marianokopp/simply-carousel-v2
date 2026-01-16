'use client';

import { usePathname } from 'next/navigation';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

type Messages = typeof esMessages;
type MessageKey = keyof Messages;
type NestedKey<T> = T extends object ? keyof T : never;

/**
 * Hook simple para traducciones sin librerías externas
 * Detecta el idioma desde la URL (/en/...) o usa español por defecto
 */
export function useTranslations<T extends MessageKey>(namespace: T) {
    const pathname = usePathname();

    // Detectar idioma desde URL
    const locale = pathname.startsWith('/en') ? 'en' : 'es';

    // Seleccionar mensajes según idioma
    const allMessages = locale === 'en' ? enMessages : esMessages;
    const messages = allMessages[namespace] as Messages[T];

    // Función de traducción
    const t = (key: NestedKey<Messages[T]>): string => {
        const value = (messages as any)[key];
        return value || key as string;
    };

    return t;
}

/**
 * Hook para obtener el locale actual
 */
export function useLocale() {
    const pathname = usePathname();
    return pathname.startsWith('/en') ? 'en' : 'es';
}
