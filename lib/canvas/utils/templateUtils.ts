import type { Template } from '@/types';

/**
 * Gets the effective slide configuration merging base + variations
 */
export function getSlideConfig(template: Template, type: 'hook' | 'body' | 'cta') {
    const baseConfig = {
        background: template.background,
        design_elements: template.design_elements,
        text_slots: template.text_slots,
        global_slots: template.global_slots,
    };

    // Only hook and cta have variations
    if (type === 'body' || !template.variations || !template.variations[type]) {
        return baseConfig;
    }

    // Merge variation
    const variation = template.variations[type];

    return {
        background: variation.background || baseConfig.background,
        design_elements: variation.design_elements || baseConfig.design_elements,
        text_slots: { ...baseConfig.text_slots, ...variation.text_slots },
        global_slots: { ...baseConfig.global_slots, ...variation.global_slots },
    };
}

/**
 * Formats slide number according to template format
 */
export function formatSlideNumber(
    slideNumber: number,
    totalSlides: number,
    format: string
): string {
    if (format === '01') {
        return String(slideNumber).padStart(2, '0');
    }
    if (format === '1') {
        return String(slideNumber);
    }
    if (format === '1/10') {
        return `${slideNumber}/${totalSlides}`;
    }
    // Default
    return String(slideNumber).padStart(2, '0');
}
