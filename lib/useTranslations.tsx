'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

type Messages = typeof esMessages;
type Locale = 'es' | 'en';

// Context para el idioma
const LocaleContext = createContext<{
    locale: Locale;
    setLocale: (locale: Locale) => void;
}>({
    locale: 'en',
    setLocale: () => { },
});

/**
 * Provider para manejar el idioma globalmente
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Leer de localStorage o detectar del navegador
        const saved = localStorage.getItem('locale') as Locale | null;
        if (saved && (saved === 'es' || saved === 'en')) {
            setLocaleState(saved);
        } else {
            // Detectar idioma del navegador
            const browserLang = navigator.language.toLowerCase();
            const detectedLocale = browserLang.startsWith('es') ? 'es' : 'en';
            setLocaleState(detectedLocale);
        }
        setMounted(true);
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    // Evitar flash de contenido incorrecto durante hydration
    if (!mounted) {
        return <>{ children } </>;
    }

    return (
        <LocaleContext.Provider value= {{ locale, setLocale }
}>
    { children }
    </LocaleContext.Provider>
    );
}

/**
 * Hook para cambiar el idioma
 */
export function useLocale() {
    return useContext(LocaleContext);
}

/**
 * Hook simple para traducciones
 * Detecta el idioma desde el contexto global
 */
export function useTranslations<T extends keyof Messages>(namespace: T) {
    const { locale } = useLocale();

    // Seleccionar mensajes según idioma
    const allMessages = locale === 'en' ? enMessages : esMessages;
    const messages = allMessages[namespace];

    // Función de traducción que soporta claves anidadas
    const t = (key: string): string => {
        // Soportar claves anidadas como 'aiGeneration.title'
        const keys = key.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
