'use client';

import { usePathname } from 'next/navigation';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

type Messages = typeof esMessages;

/**
 * Hook simple para traducciones sin librerías externas
 * Detecta el idioma desde la URL (/en/...) o usa español por defecto
 */
export function useTranslations<T extends keyof Messages>(namespace: T) {
    const pathname = usePathname();

    // Detectar idioma desde URL
    const locale = pathname.startsWith('/en') ? 'en' : 'es';

    // Seleccionar mensajes según idioma
    const allMessages = locale === 'en' ? enMessages : esMessages;
    const messages = allMessages[namespace];

    // Función de traducción que soporta claves anidadas
    const t = (key: string): string => {
        // Soportar claves anidadas como 'aiGeneration.title'
        const keys = key.split('.');
        let value: any = messages;

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Fallback al key si no encuentra el valor
            }
        }

        return typeof value === 'string' ? value : key;
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
