'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCarouselStore } from '@/store/useCarouselStore';
import SlideList from '@/components/features/editor/SlideList';
import CanvasPreview from '@/components/features/editor/CanvasPreview';
import DesignPanel from '@/components/features/editor/DesignPanel';
import UserAvatar from '@/components/UserAvatar';
import InactivityLogout from '@/components/InactivityLogout';
import { useBrandKitSync } from '@/hooks/useBrandKitSync';
import Logo from '@/components/ui/Logo';

/**
 * Página del Editor Desktop/Mobile
 * Ruta: /editor
 * 
 * Desktop (>= 768px): Layout de 3 columnas
 * Mobile (< 768px): Canvas + Tabs (Slides/Design)
 */
export default function EditorPage() {
    const router = useRouter();
    const slides = useCarouselStore((state) => state.slides);
    const [activeTab, setActiveTab] = useState<'slides' | 'design'>('design');

    // Sincronizar BrandKit con Supabase (load + auto-save)
    useBrandKitSync();

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
        <>
            {/* Auto-logout por inactividad (15 min) */}
            <InactivityLogout />

            <div className="h-screen flex flex-col bg-white">
                {/* Header */}
                <header className="h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
                    {/* Logo/Title */}
                    <div className="flex items-center gap-2">
                        <Logo size={28} />
                        <p className="text-xs text-gray-500 hidden sm:block mt-1">Paso 2: Edita tu carrusel</p>
                    </div>

                    {/* Right side: Avatar + Action buttons */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Avatar */}
                        <UserAvatar />

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <button
                                onClick={() => router.push('/generator')}
                                className="px-3 md:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                <span className="hidden sm:inline">← Volver</span>
                                <span className="sm:hidden">←</span>
                            </button>
                            <button
                                onClick={() => router.push('/preview')}
                                className="px-3 md:px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
                            >
                                <span className="hidden sm:inline">Finalizar →</span>
                                <span className="sm:hidden">✓</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main content - Desktop: 3 columns | Mobile: Stack */}
                <div className="flex-1 flex overflow-hidden">
                    {/* DESKTOP LAYOUT (>= 768px) - 3 columnas */}
                    <div className="hidden md:flex flex-1">
                        {/* Left column: Slide thumbnails */}
                        <div className="w-64 flex-shrink-0">
                            <SlideList />
                        </div>

                        {/* Center column: Canvas preview */}
                        <div className="flex-1">
                            <CanvasPreview />
                        </div>

                        {/* Right column: Design panel */}
                        <div className="w-96 flex-shrink-0">
                            <DesignPanel />
                        </div>
                    </div>

                    {/* MOBILE LAYOUT (< 768px) - Canvas + Tabs */}
                    <div className="flex md:hidden flex-col flex-1">
                        {/* Canvas preview - top half */}
                        <div className="flex-1 min-h-0">
                            <CanvasPreview />
                        </div>

                        {/* Tabs */}
                        <div className="border-t border-gray-200 bg-white">
                            <div className="flex border-b border-gray-200">
                                <button
                                    onClick={() => setActiveTab('slides')}
                                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'slides'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                        }`}
                                >
                                    Slides
                                </button>
                                <button
                                    onClick={() => setActiveTab('design')}
                                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'design'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                        }`}
                                >
                                    Diseño
                                </button>
                            </div>

                            {/* Tab content - bottom half */}
                            <div className="h-80 overflow-y-auto">
                                {activeTab === 'slides' ? (
                                    <div className="h-full">
                                        <SlideList />
                                    </div>
                                ) : (
                                    <div className="h-full">
                                        <DesignPanel />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer indicator */}
                <footer className="h-12 border-t border-gray-200 flex items-center justify-center flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                    </div>
                </footer>
            </div>
        </>
    );
}
