'use client';

import { useCarouselStore } from '@/store/useCarouselStore';
import { useTranslations } from '@/lib/useTranslations';

/**
 * Editor de texto para el slide actual
 * Solo muestra el texto editable del slide seleccionado
 */
export default function SlideTextEditor() {
    const t = useTranslations('editor');

    const currentSlideIndex = useCarouselStore((state) => state.currentSlideIndex);
    const slides = useCarouselStore((state) => state.slides);
    const updateSlideContent = useCarouselStore((state) => state.updateSlideContent);

    const currentSlide = slides[currentSlideIndex];

    if (!currentSlide) {
        return (
            <div className="h-full flex items-center justify-center p-4 text-gray-400">
                <p>{t('noSlide')}</p>
            </div>
        );
    }

    // Función para actualizar el contenido del slide
    const handleContentChange = (field: string, value: string) => {
        updateSlideContent(currentSlideIndex, {
            [field]: value,
        });
    };

    return (
        <div className="h-full overflow-y-auto p-6 border-r border-gray-200 bg-gray-50">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        Slide {currentSlideIndex + 1}
                    </h3>
                    <p className="text-xs text-gray-500">
                        {t('editSlide')}
                    </p>
                </div>

                {/* Title */}
                {currentSlide.title !== undefined && (
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            {t('slideTitle')}
                        </label>
                        <textarea
                            value={currentSlide.title}
                            onChange={(e) => handleContentChange('title', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder={t('slideTitle')}
                        />
                    </div>
                )}

                {/* Body */}
                {currentSlide.body !== undefined && (
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            {t('slideBody')}
                        </label>
                        <textarea
                            value={currentSlide.body}
                            onChange={(e) => handleContentChange('body', e.target.value)}
                            rows={6}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder={t('slideBody')}
                        />
                    </div>
                )}

                {/* Label (si existe) */}
                {currentSlide.label !== undefined && (
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            {t('slideLabel')}
                        </label>
                        <input
                            type="text"
                            value={currentSlide.label}
                            onChange={(e) => handleContentChange('label', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={t('slideLabel')}
                        />
                    </div>
                )}

                {/* CTA Text (si existe) */}
                {currentSlide.cta_text !== undefined && (
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            {t('slideCta')}
                        </label>
                        <input
                            type="text"
                            value={currentSlide.cta_text}
                            onChange={(e) => handleContentChange('cta_text', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={t('slideCta')}
                        />
                    </div>
                )}

                {/* Slide Number (si existe) */}
                {currentSlide.number !== undefined && (
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            {t('slideNumber')}
                        </label>
                        <input
                            type="text"
                            value={currentSlide.number}
                            onChange={(e) => handleContentChange('number', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={t('slideNumber')}
                        />
                    </div>
                )}

                {/* Tag (si existe) */}
                {currentSlide.tag !== undefined && (
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            {t('slideTag')}
                        </label>
                        <input
                            type="text"
                            value={currentSlide.tag}
                            onChange={(e) => handleContentChange('tag', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={t('slideTag')}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
