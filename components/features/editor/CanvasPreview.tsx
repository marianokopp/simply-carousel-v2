'use client';

import { useEffect, useRef } from 'react';
import { useCarouselStore } from '@/store/useCarouselStore';
import { getTemplateById } from '@/templates';
import { renderSlideToCanvas } from '@/lib/canvas/renderer';

/**
 * Preview grande del slide actual con navegación
 */
export default function CanvasPreview() {
    const slides = useCarouselStore((state) => state.slides);
    const currentSlideIndex = useCarouselStore((state) => state.currentSlideIndex);
    const setCurrentSlide = useCarouselStore((state) => state.setCurrentSlide);
    const templateId = useCarouselStore((state) => state.templateId);
    const brandKit = useCarouselStore((state) => state.brandKit);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const currentSlide = slides[currentSlideIndex];
    const totalSlides = slides.length;

    /**
     * Renderiza el slide actual
     */
    useEffect(() => {
        if (!canvasRef.current || !currentSlide) return;

        const template = getTemplateById(templateId);
        if (!template) return;

        // Render asíncrono
        const renderPreview = async () => {
            try {
                const canvas = await renderSlideToCanvas(
                    currentSlide,
                    template,
                    brandKit,
                    currentSlideIndex + 1, // slideNumber (1-indexed)
                    totalSlides
                );

                // Copiar a nuestro canvas de preview
                const ctx = canvasRef.current?.getContext('2d');
                if (ctx && canvasRef.current) {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.drawImage(canvas, 0, 0);
                }
            } catch (error) {
                console.error('Error rendering preview:', error);
            }
        };

        renderPreview();
    }, [currentSlide, slides, templateId, brandKit]); // Agregado 'slides' para detectar cambios en el contenido

    // Navegación
    const goToPrevious = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlide(currentSlideIndex - 1);
        }
    };

    const goToNext = () => {
        if (currentSlideIndex < totalSlides - 1) {
            setCurrentSlide(currentSlideIndex + 1);
        }
    };

    if (!currentSlide) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">No hay slides para mostrar</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-gray-50 p-6">
            {/* Canvas container */}
            <div className="flex-1 flex items-center justify-center">
                <div className="relative">
                    {/* Canvas */}
                    <canvas
                        ref={canvasRef}
                        width={1080}
                        height={1350}
                        className="max-w-full max-h-full shadow-2xl rounded-lg"
                        style={{
                            width: 'auto',
                            height: 'calc(100vh - 250px)',
                            maxHeight: '800px',
                        }}
                    />

                    {/* Type badge */}
                    <div className={`
            absolute top-4 right-4 px-3 py-1.5 text-sm font-semibold rounded-lg shadow-lg
            ${currentSlide.type === 'hook'
                            ? 'bg-purple-500 text-white'
                            : currentSlide.type === 'cta'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-700 text-white'
                        }
          `}>
                        {currentSlide.type.toUpperCase()}
                    </div>
                </div>
            </div>

            {/* Navigation controls */}
            <div className="mt-6 flex items-center justify-center gap-4">
                {/* Previous button */}
                <button
                    onClick={goToPrevious}
                    disabled={currentSlideIndex === 0}
                    className="p-3 rounded-lg bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white transition-all"
                >
                    <svg
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                {/* Counter */}
                <div className="px-6 py-3 bg-white rounded-lg border-2 border-gray-200 font-semibold text-gray-700">
                    <span className="text-blue-600">{currentSlideIndex + 1}</span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span>{totalSlides}</span>
                </div>

                {/* Next button */}
                <button
                    onClick={goToNext}
                    disabled={currentSlideIndex === totalSlides - 1}
                    className="p-3 rounded-lg bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white transition-all"
                >
                    <svg
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
