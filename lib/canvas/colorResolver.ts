import type { BrandKit } from '@/types';

/**
 * Convierte hex a RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : { r: 0, g: 0, b: 0 };
}

/**
 * Calcula el color de contraste (blanco o negro) según WCAG AAA
 * para asegurar legibilidad sobre un fondo dado
 */
export function getContrastColor(bgColor: string): string {
    const rgb = hexToRgb(bgColor);

    // Fórmula de luminosidad relativa (WCAG)
    const luminance = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;

    // Si la luminosidad es alta (fondo claro) → texto negro
    // Si la luminosidad es baja (fondo oscuro) → texto blanco
    return luminance > 128 ? '#000000' : '#FFFFFF';
}

/**
 * Resuelve una variable de color a su valor hex real
 * 
 * Soporta:
 * - 'brand_primary' → brandKit.primary_color
 * - 'brand_secondary' → brandKit.secondary_color
 * - 'auto-contrast' → calcula blanco/negro según backgroundColor
 * - '#FF5733' → retorna el hex directo
 */
export function resolveColor(
    colorVar: string,
    brandKit: BrandKit,
    backgroundColor?: string
): string {
    // Caso 1: Color de marca primario
    if (colorVar === 'brand_primary') {
        return brandKit.primary_color;
    }

    // Caso 2: Color de marca secundario
    if (colorVar === 'brand_secondary') {
        return brandKit.secondary_color;
    }

    // Caso 3: Auto-contraste (calcula blanco o negro según el fondo)
    if (colorVar === 'auto-contrast') {
        if (!backgroundColor) {
            console.warn('auto-contrast usado sin backgroundColor, usando negro por defecto');
            return '#000000';
        }
        const resolvedBg = resolveColor(backgroundColor, brandKit);
        return getContrastColor(resolvedBg);
    }

    // Caso 4: Hex directo (fijo, no editable por usuario)
    return colorVar;
}

/**
 * Aplica tinte de color de marca a un SVG
 * Reemplaza 'currentColor' con el color especificado
 */
export function tintSVG(svgCode: string, color: string): string {
    return svgCode.replace(/currentColor/g, color);
}

/**
 * Procesa clases CSS de un SVG para aplicar colores de marca
 * Soporta:
 * - class="brand-primary" → color primary
 * - class="brand-secondary" → color secondary
 */
export function processSVGClasses(
    svgCode: string,
    brandKit: BrandKit
): string {
    let processed = svgCode;

    // Reemplazar brand-primary
    processed = processed.replace(
        /class="brand-primary"/g,
        `fill="${brandKit.primary_color}"`
    );

    // Reemplazar brand-secondary
    processed = processed.replace(
        /class="brand-secondary"/g,
        `fill="${brandKit.secondary_color}"`
    );

    return processed;
}
