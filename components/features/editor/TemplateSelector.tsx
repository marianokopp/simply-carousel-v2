'use client';

import { templates } from '@/templates';
import { useCarouselStore } from '@/store/useCarouselStore';
import type { Template } from '@/types';

/**
 * Selector de templates
 * Muestra grid de templates disponibles y permite seleccionar
 */
export default function TemplateSelector() {
    const templateId = useCarouselStore((state) => state.templateId);
    const setTemplate = useCarouselStore((state) => state.setTemplate);

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
                Plantilla
            </label>

            <div className="grid grid-cols-3 gap-2">
                {templates.map((template: Template) => (
                    <button
                        key={template.id}
                        onClick={() => setTemplate(template.id)}
                        className={`
              relative p-3 rounded-lg border-2 transition-all
              ${templateId === template.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                            }
            `}
                    >
                        {/* Template preview placeholder */}
                        <div
                            className={`
                w-full aspect-[4/5] rounded mb-2 flex items-center justify-center text-xs font-bold
                ${template.metadata.category === 'minimal'
                                    ? 'bg-gray-100 text-gray-600'
                                    : template.metadata.category === 'bold'
                                        ? 'bg-purple-100 text-purple-600'
                                        : 'bg-blue-100 text-blue-600'
                                }
              `}
                        >
                            {template.metadata.category.charAt(0).toUpperCase()}
                        </div>

                        {/* Template name */}
                        <div className="text-xs font-medium text-gray-700 text-center truncate">
                            {template.metadata.name}
                        </div>

                        {/* Active indicator */}
                        {templateId === template.id && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Category badge */}
            {templateId && (
                <div className="mt-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        {templates.find((t) => t.id === templateId)?.metadata.category}
                    </span>
                </div>
            )}
        </div>
    );
}
