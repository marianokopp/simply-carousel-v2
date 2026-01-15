import type { SlideContent, Template, BrandKit, SlideData } from '@/types';
import { renderBackground } from './layers/background';
import { renderDesignElements } from './layers/designElements';
import { renderTextSlots } from './layers/textSlots';
import { renderGlobalIdentity } from './layers/identity';
import { preloadTemplateFonts } from './utils/fontLoader';
import { slideContentToSlideData } from '../contentMapper';

/**
 * Main rendering function - Renders a complete slide on a canvas (1080x1350px)
 * 
 * NOW ASYNC to properly wait for text rendering
 * 
 * @param slideData - Slide content (UI format)
 * @param template - Template configuration
 * @param brandKit - Brand kit configuration
 * @param slideNumber - Current slide number (1-indexed)
 * @param totalSlides - Total number of slides in carousel
 * @returns Promise<HTMLCanvasElement> with rendered slide
 */
export async function renderSlideToCanvas(
    slideData: SlideContent,
    template: Template,
    brandKit: BrandKit,
    slideNumber: number = 1,
    totalSlides: number = 1
): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Failed to get canvas 2D context');
    }

    // Set canvas dimensions
    canvas.width = 1080;
    canvas.height = 1350;

    // Convert SlideContent to SlideData
    const renderData: SlideData = slideContentToSlideData(
        slideData,
        slideNumber,
        totalSlides,
        template,
        brandKit
    );

    // Use async rendering to properly wait for text layers
    await renderSlideAsync(canvas, renderData);

    return canvas;
}

/**
 * Synchronous version of slide rendering
 * Used by renderSlideToCanvas for backward compatibility
 */
function renderSlideSync(
    ctx: CanvasRenderingContext2D,
    slideData: SlideData
): void {
    // Layer 0: Background
    renderBackground(ctx, slideData);

    // Layer 1: Design Elements (sync version - skip SVGs if they fail)
    const { template, brandKit, type } = slideData;
    const config = type !== 'body' && template.variations?.[type as 'hook' | 'cta']
        ? { ...template, ...template.variations[type as 'hook' | 'cta'] }
        : template;

    const elements = config.design_elements || [];
    const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

    sortedElements.forEach((element) => {
        ctx.save();
        ctx.globalAlpha = element.opacity ?? 1;

        // Render simple elements only (skip SVG for now in sync mode)
        if (element.type !== 'svg') {
            // Reuse the async renderer but don't await
            // This is a simplified sync version
            renderDesignElements(ctx, slideData).catch(console.error);
        }

        ctx.restore();
    });

    // Layer 2: Text Slots (sync version)
    renderTextSlots(ctx, slideData).catch(console.error);

    // Layer 3: Global Identity (sync version)
    renderGlobalIdentity(ctx, slideData).catch(console.error);
}

/**
 * Async version for rendering from SlideData directly
 * This is the new preferred API
 */
export async function renderSlideAsync(
    canvas: HTMLCanvasElement,
    slideData: SlideData
): Promise<HTMLCanvasElement> {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Failed to get canvas 2D context');
    }

    // Set canvas dimensions
    canvas.width = 1080;
    canvas.height = 1350;

    // Preload fonts
    await preloadTemplateFonts(slideData.template);

    // Render layers in order
    // Layer 0: Background
    renderBackground(ctx, slideData);

    // Layer 1: Design Elements
    await renderDesignElements(ctx, slideData);

    // Layer 2: Text Slots
    await renderTextSlots(ctx, slideData);

    // Layer 3: Global Identity
    await renderGlobalIdentity(ctx, slideData);

    return canvas;
}
