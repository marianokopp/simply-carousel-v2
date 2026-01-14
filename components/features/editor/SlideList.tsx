'use client';

import { useEffect, useRef, useState } from 'react';
import { useCarouselStore } from '@/store/useCarouselStore';
import { getTemplateById } from '@/templates';
import { renderSlideToCanvas } from '@/lib/canvas/renderer';
import SlideEditor from './SlideEditor';
import type { SlideContent } from '@/types';

/**
 * Lista de slides con thumbnails renderizados en canvas
 */
export default function SlideList() {
    const slides = useCarouselStore((state) => state.slides);
    const currentSlideIndex = useCarouselStore((state) => state.currentSlideIndex);
    const setCurrentSlide = useCarouselStore((state) => state.setCurrentSlide);
    const templateId = useCarouselStore((state) => state.templateId);
    const brandKit = useCarouselStore((state) => state.brandKit);

    const [editingSlideIndex, setEditingSlideIndex] = useState<number | null>(null);

    /**
     * Renderiza un thumbnail del slide (async)
     */
    const renderThumbnail = async (slide: SlideContent, canvasRef: HTMLCanvasElement | null) => {
        if (!canvasRef) return;

        const template = getTemplateById(templateId);
        if (!template) return;

        try {
            // Renderizar slide en canvas pequeño (await async rendering)
            const canvas = await renderSlideToCanvas(slide, template, brandKit);

            // Copiar a nuestro canvas thumbnail
            const ctx = canvasRef.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
                ctx.drawImage(canvas, 0, 0, canvasRef.width, canvasRef.height);
            }
        } catch (error) {
            console.error('Error rendering thumbnail:', error);
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-50 border-r border-gray-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700">
                    Slides ({slides.length})
                </h2>
            </div>

            {/* Slides list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {slides.map((slide, index) => (
                    <ThumbnailCard
                        key={index}
                        slide={slide}
                        index={index}
                        isActive={currentSlideIndex === index}
                        onClick={() => setCurrentSlide(index)}
                        onEdit={() => setEditingSlideIndex(index)}
                        onRender={renderThumbnail}
                        templateId={templateId}
                        brandKit={brandKit}
                    />
                ))}
            </div>

            {/* Modal de edición */}
            {editingSlideIndex !== null && (
                <SlideEditor
                    slideIndex={editingSlideIndex}
                    onClose={() => setEditingSlideIndex(null)}
                />
            )}
        </div>
    );
}

/**
 * Card individual de thumbnail
 */
function ThumbnailCard({
    slide,
    index,
    isActive,
    onClick,
    onEdit,
    onRender,
    templateId,
    brandKit,
}: {
    slide: SlideContent;
    index: number;
    isActive: boolean;
    onClick: () => void;
    onEdit: () => void;
    onRender: (slide: SlideContent, canvas: HTMLCanvasElement | null) => Promise<void>;
    templateId: string;
    brandKit: any;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Re-renderizar cuando cambie template o brandKit
    useEffect(() => {
        onRender(slide, canvasRef.current);
    }, [slide, templateId, brandKit, onRender]);

    // Obtener título para mostrar
    const getTitle = () => {
        if (slide.type === 'hook' && slide.title) return slide.title;
        if (slide.type === 'body' && slide.body) return slide.body;
        if (slide.type === 'cta' && slide.title) return slide.title;
        return 'Untitled slide';
    };

    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            className={`
        w-full p-3 rounded-lg border-2 transition-all text-left cursor-pointer
        ${isActive
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }
      `}
        >
            {/* Canvas thumbnail */}
            <div className="relative mb-2 bg-gray-100 rounded overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={200}
                    height={250}
                    className="w-full h-auto"
                />

                {/* Slide number badge */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs font-bold rounded">
                    {String(index + 1).padStart(2, '0')}
                </div>

                {/* Type badge */}
                <div className={`
          absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded
          ${slide.type === 'hook'
                        ? 'bg-purple-500 text-white'
                        : slide.type === 'cta'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-white'
                    }
        `}>
                    {slide.type.toUpperCase()}
                </div>
            </div>

            {/* Title + Edit button */}
            <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-gray-700 line-clamp-2 flex-1">
                    {getTitle().substring(0, 60)}...
                </p>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                    className="flex-shrink-0 p-1.5 hover:bg-blue-100 rounded transition-colors"
                    title="Editar slide"
                >
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
