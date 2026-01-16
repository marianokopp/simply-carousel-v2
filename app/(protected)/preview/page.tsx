'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCarouselStore } from '@/store/useCarouselStore';
import SlideGallery from '@/components/features/preview/SlideGallery';
import ExportPanel from '@/components/features/preview/ExportPanel';
import UserAvatar from '@/components/UserAvatar';
import InactivityLogout from '@/components/InactivityLogout';

/**
 * Página de Preview Final
 * Ruta: /preview
 * 
 * Desktop: Galería + Panel lateral
 * Mobile: Galería + Botón flotante que abre panel
 */
export default function PreviewPage() {
    const router = useRouter();
    const slides = useCarouselStore((state) => state.slides);
    const [showExportPanel, setShowExportPanel] = useState(false);

    // Si no hay slides, redirigir al generator
    useEffect(() => {
        if (slides.length === 0) {
            router.push('/generator');
        }
    }, [slides, router]);

    // No renderizar si no hay slides
    if (slides.length === 0) {
        return null;
    }

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Header */}
            <header className="h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
                {/* Logo/Title */}
                <div>
                    <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Simply Carousel
                    </h1>
                    <p className="text-xs text-gray-500 hidden sm:block">Paso 3: Preview & Export</p>
                </div>

                {/* Back button - desktop */}
                <button
                    onClick={() => router.push('/editor')}
                    className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                    ← Volver al Editor
                </button>

                {/* Back button - mobile (icon only) */}
                <button
                    onClick={() => router.push('/editor')}
                    className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </header>

            {/* Main content */}
            <div className="flex-1 grid grid-cols-[1fr_400px] overflow-hidden relative">
                {/* Gallery - left column */}
                <div className="overflow-hidden">
                    <SlideGallery />
                </div>

                {/* Export Panel - right column, fixed on desktop */}
                <div className="hidden md:block">
                    <ExportPanel />
                </div>

                {/* Mobile: Export Panel as overlay */}
                {showExportPanel && (
                    <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowExportPanel(false)}>
                        <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white" onClick={(e) => e.stopPropagation()}>
                            <ExportPanel />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer - desktop: indicators | mobile: export button */}
            <footer className="border-t border-gray-200 flex items-center justify-center flex-shrink-0">
                {/* Desktop indicators */}
                <div className="hidden md:flex h-12 items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                </div>

                {/* Mobile export button */}
                <div className="md:hidden w-full p-4">
                    <button
                        onClick={() => setShowExportPanel(true)}
                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg"
                    >
                        Descargar Carrusel
                    </button>
                </div>
            </footer>
        </div>
    );
}
