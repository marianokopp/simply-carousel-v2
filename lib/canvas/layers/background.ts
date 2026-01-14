import type { SlideData } from '@/types';
import { resolveColor } from '../utils/colorUtils';

/**
 * Renders the background layer (Layer 0)
 */
export function renderBackground(
    ctx: CanvasRenderingContext2D,
    slideData: SlideData
): void {
    const { template, brandKit, type } = slideData;

    // Get config (with variations if applicable - only hook and cta have variations)
    const hasVariation = (type === 'hook' || type === 'cta') && template.variations && template.variations[type];
    const variation = hasVariation ? template.variations![type as 'hook' | 'cta'] : null;
    const config = variation
        ? { ...template, ...variation }
        : template;

    const { background } = config;
    const { width, height } = template.viewport;

    // Solid color background
    if (background.type === 'solid') {
        const color = resolveColor(background.colorVar, brandKit);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
    }

    // Gradient background
    else if (background.type === 'gradient' && background.gradient) {
        const { gradient } = background;
        let gradientFill;

        if (gradient.type === 'linear') {
            const angle = gradient.angle || 0;
            const angleRad = (angle * Math.PI) / 180;

            // Calculate gradient endpoints based on angle
            const x1 = width / 2 - (Math.cos(angleRad) * width) / 2;
            const y1 = height / 2 - (Math.sin(angleRad) * height) / 2;
            const x2 = width / 2 + (Math.cos(angleRad) * width) / 2;
            const y2 = height / 2 + (Math.sin(angleRad) * height) / 2;

            gradientFill = ctx.createLinearGradient(x1, y1, x2, y2);
        } else {
            // Radial gradient
            gradientFill = ctx.createRadialGradient(
                width / 2,
                height / 2,
                0,
                width / 2,
                height / 2,
                Math.max(width, height) / 2
            );
        }

        // Add color stops
        gradient.stops.forEach((stop) => {
            const color = resolveColor(stop.color, brandKit);
            gradientFill.addColorStop(stop.offset, color);
        });

        ctx.fillStyle = gradientFill;
        ctx.fillRect(0, 0, width, height);
    }
}
