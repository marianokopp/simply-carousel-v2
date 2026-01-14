'use client';

import { useState, useMemo } from 'react';
import { useCarouselStore } from '@/store/useCarouselStore';
import { getTemplateById } from '@/templates';
import { getSlideConfig } from '@/lib/canvas/utils/templateUtils';
import type { SlideContent } from '@/types';

interface SlideEditorProps {
    slideIndex: number;
    onClose: () => void;
}

/**
 * Modal para editar el contenido de un slide
 * Muestra dinámicamente los campos según los text_slots enabled del template
 */
export default function SlideEditor({ slideIndex, onClose }: SlideEditorProps) {
    const slides = useCarouselStore((state) => state.slides);
    const setSlides = useCarouselStore((state) => state.setSlides);
    const templateId = useCarouselStore((state) => state.templateId);

    const slide = slides[slideIndex];
    const [editedSlide, setEditedSlide] = useState<SlideContent>({ ...slide });

    // Obtener configuración del template para este tipo de slide
    const templateConfig = useMemo(() => {
        const template = getTemplateById(templateId);
        if (!template) return null;
        return getSlideConfig(template, slide.type);
    }, [templateId, slide.type]);

    if (!slide || !templateConfig) return null;

    const { text_slots } = templateConfig;

    /**
     * Guardar cambios
     */
    const handleSave = () => {
        const newSlides = [...slides];
        newSlides[slideIndex] = editedSlide;
        setSlides(newSlides);
        onClose();
    };

    /**
     * Mapeo de slot names a campos de SlideContent
     */
    const getSlotValue = (slotName: string): string => {
        switch (slotName) {
            case 'title':
                return editedSlide.title || '';
            case 'tag':
                return editedSlide.tag || '';
            case 'label':
                return editedSlide.label || '';
            case 'body':
                return editedSlide.body || '';
            case 'cta_text':
                return editedSlide.cta_text || '';
            case 'slide_number':
                return editedSlide.number || '';
            default:
                return '';
        }
    };

    const setSlotValue = (slotName: string, value: string) => {
        switch (slotName) {
            case 'title':
                setEditedSlide({ ...editedSlide, title: value });
                break;
            case 'tag':
                setEditedSlide({ ...editedSlide, tag: value });
                break;
            case 'label':
                setEditedSlide({ ...editedSlide, label: value });
                break;
            case 'body':
                setEditedSlide({ ...editedSlide, body: value });
                break;
            case 'cta_text':
                setEditedSlide({ ...editedSlide, cta_text: value });
                break;
            case 'slide_number':
                // Solo permitir números o vacío
                if (value === '' || /^\d+$/.test(value)) {
                    setEditedSlide({ ...editedSlide, number: value || undefined });
                }
                break;
        }
    };

    /**
     * Labels amigables para cada slot
     */
    const getSlotLabel = (slotName: string): string => {
        const labels: Record<string, string> = {
            title: 'Título',
            tag: 'TAG', // Changed from subtitle
            label: 'Etiqueta', // Changed from 'Etiqueta/Categoría'
            body: 'Contenido',
            cta_text: 'Texto del Botón',
            slide_number: 'Número',
        };
        return labels[slotName] || slotName;
    };

    /**
     * Placeholder para cada slot
     */
    const getSlotPlaceholder = (slotName: string): string => {
        const placeholders: Record<string, string> = {
            title: 'Ingresa el título',
            tag: 'Tu tag aquí', // Changed from subtitle
            label: 'CATEGORÍA', // Changed from 'Ej: Tutorial, Consejo, etc.'
            body: 'Ingresa el contenido principal',
            cta_text: 'Ej: Descarga Ahora, Saber Más',
            slide_number: '01',
        };
        return placeholders[slotName] || '';
    };

    /**
     * ¿Este slot usa textarea?
     */
    const isTextArea = (slotName: string): boolean => {
        return slotName === 'body';
    };

    // Obtener solo los slots enabled del template
    const enabledSlots = Object.entries(text_slots || {})
        .filter(([_, slot]) => slot.enabled)
        .map(([name]) => name);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Editar Slide {slideIndex + 1}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Tipo: <span className="font-medium capitalize">{slide.type}</span>
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content - Dinámico según template */}
                <div className="p-6 space-y-4">
                    {enabledSlots.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">
                            No hay campos editables para este tipo de slide
                        </p>
                    ) : (
                        enabledSlots.map((slotName) => (
                            <div key={slotName}>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {getSlotLabel(slotName)}
                                    {slotName !== 'title' && slotName !== 'body' && (
                                        <span className="text-gray-400 font-normal ml-1">(opcional)</span>
                                    )}
                                </label>

                                {isTextArea(slotName) ? (
                                    <>
                                        <textarea
                                            value={getSlotValue(slotName)}
                                            onChange={(e) => setSlotValue(slotName, e.target.value)}
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            placeholder={getSlotPlaceholder(slotName)}
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            Usa **palabra** para resaltar texto
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            value={getSlotValue(slotName)}
                                            onChange={(e) => setSlotValue(slotName, e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder={getSlotPlaceholder(slotName)}
                                            maxLength={slotName === 'slide_number' ? 2 : undefined}
                                        />
                                        {slotName === 'slide_number' && (
                                            <p className="text-xs text-gray-500 mt-2">
                                                Solo números. Dejar vacío para ocultar.
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}
