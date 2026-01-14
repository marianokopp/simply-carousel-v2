import type { SlideData } from '@/types';
import { resolveColor } from '../utils/colorUtils';

/**
 * Renders design elements layer (Layer 1)
 */
export async function renderDesignElements(
    ctx: CanvasRenderingContext2D,
    slideData: SlideData
): Promise<void> {
    const { template, brandKit, type } = slideData;

    // Get config with variations
    const hasVariation = (type === 'hook' || type === 'cta') && template.variations && template.variations[type];
    const variation = hasVariation ? template.variations![type as 'hook' | 'cta'] : null;
    const elements = variation?.design_elements || template.design_elements;

    // Sort by zIndex
    const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

    for (const element of sortedElements) {
        ctx.save();
        ctx.globalAlpha = element.opacity ?? 1;

        switch (element.type) {
            case 'circle':
                renderCircle(ctx, element, brandKit);
                break;
            case 'rectangle':
                renderRectangle(ctx, element, brandKit);
                break;
            case 'line':
                renderLine(ctx, element, brandKit);
                break;
            case 'path':
                renderPath(ctx, element, brandKit);
                break;
            case 'svg':
                await renderSVG(ctx, element, brandKit);
                break;
        }

        ctx.restore();
    }
}

function renderCircle(ctx: CanvasRenderingContext2D, element: any, brandKit: any) {
    const fillColor = resolveColor(element.fill, brandKit);

    ctx.beginPath();
    ctx.arc(element.cx, element.cy, element.radius, 0, 2 * Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();

    if (element.stroke) {
        ctx.strokeStyle = resolveColor(element.stroke, brandKit);
        ctx.lineWidth = element.strokeWidth || 1;
        ctx.stroke();
    }
}

function renderRectangle(ctx: CanvasRenderingContext2D, element: any, brandKit: any) {
    const fillColor = resolveColor(element.fill, brandKit);

    ctx.fillStyle = fillColor;

    if (element.borderRadius) {
        // Rounded rectangle
        const { x, y, width, height, borderRadius } = element;
        ctx.beginPath();
        ctx.moveTo(x + borderRadius, y);
        ctx.lineTo(x + width - borderRadius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
        ctx.lineTo(x + width, y + height - borderRadius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
        ctx.lineTo(x + borderRadius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
        ctx.lineTo(x, y + borderRadius);
        ctx.quadraticCurveTo(x, y, x + borderRadius, y);
        ctx.closePath();
        ctx.fill();
    } else {
        ctx.fillRect(element.x, element.y, element.width, element.height);
    }
}

function renderLine(ctx: CanvasRenderingContext2D, element: any, brandKit: any) {
    const strokeColor = resolveColor(element.stroke, brandKit);

    ctx.beginPath();
    ctx.moveTo(element.x1, element.y1);
    ctx.lineTo(element.x2, element.y2);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = element.strokeWidth;
    ctx.stroke();
}

function renderPath(ctx: CanvasRenderingContext2D, element: any, brandKit: any) {
    const fillColor = resolveColor(element.fill, brandKit);

    const path = new Path2D(element.d);
    ctx.fillStyle = fillColor;
    ctx.fill(path);
}

async function renderSVG(ctx: CanvasRenderingContext2D, element: any, brandKit: any) {
    const { x, y, width, height, svgCode, tinted, rotation } = element;

    // Create image from SVG
    const img = await loadSVGImage(svgCode, tinted ? brandKit : null);

    ctx.save();

    // Apply rotation if needed
    if (rotation) {
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-(x + width / 2), -(y + height / 2));
    }

    ctx.drawImage(img, x, y, width, height);
    ctx.restore();
}

async function loadSVGImage(svgCode: string, brandKit: any): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        // If tinted, apply brand colors
        let finalSVG = svgCode;
        if (brandKit) {
            finalSVG = svgCode
                .replace(/class="brand-primary"/g, `fill="${brandKit.primary_color}"`)
                .replace(/class="brand-secondary"/g, `fill="${brandKit.secondary_color}"`);
        }

        const blob = new Blob([finalSVG], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = reject;
        img.src = url;
    });
}
