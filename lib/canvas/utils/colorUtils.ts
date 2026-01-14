import type { BrandKit } from '@/types';

/**
 * Resolves a color value from the brand kit or returns the value directly
 * Supports: brand variables, hex colors, named colors (white/black)
 */
export function resolveColor(colorValue: string, brandKit: BrandKit): string {
    // Brand variables
    if (colorValue === 'brand_primary') return brandKit.primary_color;
    if (colorValue === 'brand_secondary') return brandKit.secondary_color;

    // Named colors
    if (colorValue === 'white') return '#FFFFFF';
    if (colorValue === 'black') return '#000000';

    // Auto-contrast special case
    if (colorValue === 'auto-contrast') {
        const bgColor = resolveColor('brand_primary', brandKit);
        return getContrastColor(bgColor);
    }

    // Return hex colors or any other value as-is (including currentColor for SVG)
    return colorValue;
}

/**
 * Gets contrast color (black or white) based on background color
 * Uses WCAG contrast ratio calculation
 */
export function getContrastColor(bgColor: string): string {
    // Convert hex to RGB
    const rgb = hexToRgb(bgColor);
    if (!rgb) return '#000000';

    // Calculate relative luminance
    const luminance = getRelativeLuminance(rgb);

    // Return black or white based on luminance
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Converts hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    // Remove # if present
    hex = hex.replace(/^#/, '');

    // Parse hex
    if (hex.length === 3) {
        hex = hex
            .split('')
            .map((c) => c + c)
            .join('');
    }

    if (hex.length !== 6) {
        return null;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}

/**
 * Calculates relative luminance for WCAG contrast
 */
function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
    // Normalize RGB values
    const rsRGB = rgb.r / 255;
    const gsRGB = rgb.g / 255;
    const bsRGB = rgb.b / 255;

    // Apply gamma correction
    const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

    // Calculate luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
