'use client';

import { TEMPLATES } from '@/lib/templates';
import { useCarouselStore } from '@/store/useCarouselStore';

/**
 * Selector de templates en lista scrolleable compacta
 */
export default function TemplateSelector() {
    const templateId = useCarouselStore((state) => state.templateId);
    const setTemplateId = useCarouselStore((state) => state.setTemplateId);

    return (
        <div className="h-64 overflow-y-auto border-b border-gray-200 p-4 bg-white">
            <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Plantilla
            </h3>

            <div className="grid grid-cols-3 gap-2">
                {TEMPLATES.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => setTemplateId(template.id)}
                        className={`
                            relative aspect-[4/5] rounded-lg border-2 transition-all overflow-hidden
                            ${templateId === template.id
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }
                        `}
                    >
                        {/* Thumbnail preview */}
                        <div
                            className="w-full h-full flex items-center justify-center text-xs font-bold bg-gradient-to-br"
                            style={{
                                background: `linear-gradient(135deg, ${template.colors.primary}20, ${template.colors.secondary}20)`,
                            }}
                        >
                            <span className="opacity-50">{template.name.charAt(0)}</span>
                        </div>

                        {/* Selected indicator */}
                        {templateId === template.id && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}

                        {/* Template name */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                            <p className="text-[10px] text-white font-medium truncate">
                                {template.name}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
