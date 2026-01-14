'use client';

import { useEffect, useRef } from 'react';
import { useCarouselStore } from '@/store/useCarouselStore';
import type { BrandKit } from '@/types';

/**
 * Hook para sincronizar BrandKit con Supabase
 * - Load automático al montar
 * - Auto-save con debounce al cambiar
 */
export function useBrandKitSync() {
    const brandKit = useCarouselStore((state) => state.brandKit);
    const setBrandKit = useCarouselStore((state) => state.setBrandKit);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hasLoadedRef = useRef(false);

    /**
     * Load brand kit from Supabase
     */
    useEffect(() => {
        const loadBrandKit = async () => {
            try {
                const response = await fetch('/api/brand-kit');
                if (response.ok) {
                    const data = await response.json();
                    setBrandKit(data);
                    hasLoadedRef.current = true;
                }
            } catch (error) {
                console.error('Error loading brand kit:', error);
            }
        };

        // Solo cargar una vez al montar
        if (!hasLoadedRef.current) {
            loadBrandKit();
        }
    }, [setBrandKit]);

    /**
     * Auto-save brand kit to Supabase (debounced)
     */
    useEffect(() => {
        // No guardar si aún no se ha cargado
        if (!hasLoadedRef.current) return;

        // Limpiar timeout anterior
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        // Crear nuevo timeout para guardar después de 2 segundos de inactividad
        saveTimeoutRef.current = setTimeout(async () => {
            try {
                await fetch('/api/brand-kit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(brandKit),
                });
            } catch (error) {
                console.error('Error saving brand kit:', error);
            }
        }, 2000); // 2 segundos de debounce

        // Cleanup
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [brandKit]);
}
