'use client';

import { useEffect, useState } from 'react';
import { useCarouselStore } from '@/store/useCarouselStore';
import { getTemplateById } from '@/templates';
import { renderSlideToCanvas } from '@/lib/canvas/renderer';
import type { SlideContent } from '@/types';

/**
 * Galería horizontal scrollable de slides
 * Muestra todos los slides renderizados como imágenes
 */
export default function SlideGallery() {
    const slides = useCarouselStore((state) => state.slides);
    const templateId = useCarouselStore((state) => state.templateId);
    const brandKit = useCarouselStore((state) => state.brandKit);

    const [slideImages, setSlideImages] = useState<string[]>([]);
    const [isRendering, setIsRendering] = useState(true);

    /**
     * Renderiza todos los slides a PNG
     */
    useEffect(() => {
        const renderAllSlides = async () => {
            setIsRendering(true);

            const template = getTemplateById(templateId);
            if (!template) return;

            const images: string[] = [];

            for (const slide of slides) {
                try {
                    // Renderizar slide (await async rendering)
                    const canvas = await renderSlideToCanvas(slide, template, brandKit);

                    // Convertir a PNG de alta calidad
                    const pngDataUrl = canvas.toDataURL('image/png', 0.95);
                    images.push(pngDataUrl);
                } catch (error) {
                    console.error('Error rendering slide:', error);
                    // Agregar placeholder en caso de error
                    images.push('');
                }
            }

            setSlideImages(images);
            setIsRendering(false);
        };

        renderAllSlides();
    }, [slides, templateId, brandKit]);

    if (isRendering) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Renderizando tus slides...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Title */}
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                    ¡Tu carrusel está listo! 🎉
                </h2>
                <p className="text-gray-600 mt-1">
                    {slideImages.length} slides listos para descargar
                </p>
            </div>

            {/* Gallery */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
                <div className="inline-flex gap-4 h-full">
                    {slideImages.map((imageDataUrl, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                            style={{
                                height: 'calc(100% - 2rem)',
                                maxWidth: '432px',
                                aspectRatio: '1080 / 1350'
                            }}
                        >
                            {imageDataUrl ? (
                                <img
                                    src={imageDataUrl}
                                    alt={`Slide ${index + 1}`}
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                                    <p className="text-gray-500 text-sm">Error rendering slide</p>
                                </div>
                            )}

                            {/* Slide number */}
                            <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 text-white text-sm font-bold rounded">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll hint */}
            <div className="p-4 text-center border-t border-gray-200">
                <p className="text-sm text-gray-500">
                    ← Desliza para ver todos los slides →
                </p>
            </div>
        </div>
    );
}
