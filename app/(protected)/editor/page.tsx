'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCarouselStore } from '@/store/useCarouselStore';
import SlideList from '@/components/features/editor/SlideList';
import CanvasPreview from '@/components/features/editor/CanvasPreview';
import DesignPanel from '@/components/features/editor/DesignPanel';
import SlideTextEditor from '@/components/features/editor/SlideTextEditor';
import TemplateSelector from '@/components/features/editor/TemplateSelector';
import CompactBrandKit from '@/components/features/editor/CompactBrandKit';
import UserAvatar from '@/components/UserAvatar';
import InactivityLogout from '@/components/InactivityLogout';
import { useBrandKitSync } from '@/hooks/useBrandKitSync';
import Logo from '@/components/ui/Logo';

/**
 * Página del Editor Desktop/Mobile
 * Ruta: /editor
 * 
 * Desktop (>= 768px): Layout de 3 columnas
 * - Izquierda: Editor de texto del slide
 * - Centro: Canvas Preview (grande)
 * - Derecha: Templates (scroll) + Brand Kit (compacto)
 * 
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
                    <div>
                        <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Simply Carousel
                        </h1>
                        <p className="text-xs text-gray-500 hidden sm:block">Paso 2: Edita tu carrusel</p>
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

                {/* Main content - NUEVO LAYOUT */}
                <div className="flex-1 flex overflow-hidden">
                    {/* DESKTOP LAYOUT (>= 768px) - 3 columnas */}
                    <div className="hidden md:flex flex-1">
                        {/* Left column: Slide Text Editor */}
                        <div className="w-80 flex-shrink-0">
                            <SlideTextEditor />
                        </div>

                        {/* Center column: Canvas preview (GRANDE) */}
                        <div className="flex-1">
                            <CanvasPreview />
                        </div>

                        {/* Right column: Templates + Brand Kit */}
                        <div className="w-80 flex-shrink-0 flex flex-col border-l border-gray-200">
                            {/* Templates - scrolleable */}
                            <TemplateSelector />

                            {/* Brand Kit - compacto */}
                            <CompactBrandKit />
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

                            {/* Tab content */}
                            <div className="h-64 overflow-y-auto">
                                {activeTab === 'slides' && <SlideList />}
                                {activeTab === 'design' && <DesignPanel />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
