'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Componente para cerrar sesión automáticamente por inactividad
 * Cierra sesión después de 15 minutos sin actividad
 */
export default function InactivityLogout() {
    const router = useRouter();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutos en milisegundos

    useEffect(() => {
        /**
         * Cierra sesión automáticamente
         */
        const logout = async () => {
            try {
                // Llamar a API de logout
                await fetch('/api/auth/logout', { method: 'POST' });
                // Redirigir a login
                router.push('/login');
            } catch (error) {
                console.error('Error auto-logout:', error);
                // Intentar redirigir de todas formas
                router.push('/login');
            }
        };

        /**
         * Resetea el timer de inactividad
         */
        const resetTimer = () => {
            // Limpiar timer anterior si existe
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Crear nuevo timer
            timeoutRef.current = setTimeout(() => {
                logout();
            }, INACTIVITY_TIMEOUT);
        };

        // Eventos que indican actividad del usuario
        const events = [
            'mousedown',
            'mousemove',
            'keypress',
            'scroll',
            'touchstart',
            'click',
        ];

        // Agregar listeners para todos los eventos
        events.forEach((event) => {
            document.addEventListener(event, resetTimer);
        });

        // Iniciar el timer al montar
        resetTimer();

        // Cleanup al desmontar
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            events.forEach((event) => {
                document.removeEventListener(event, resetTimer);
            });
        };
    }, [router, INACTIVITY_TIMEOUT]);

    // Este componente no renderiza nada
    return null;
}
