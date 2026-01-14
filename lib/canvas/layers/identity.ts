import type { SlideData } from '@/types';
import { resolveColor, getContrastColor } from '../utils/colorUtils';
import { getSlideConfig } from '../utils/templateUtils';
import { loadFont } from '../utils/fontLoader';

/**
 * Renders global identity elements (Layer 3: logo, author, website)
 */
export async function renderGlobalIdentity(
    ctx: CanvasRenderingContext2D,
    slideData: SlideData
): Promise<void> {
    const { template, brandKit, userIdentity, type } = slideData;
    const config = getSlideConfig(template, type);
    const { global_slots } = config;

    // Render logo
    if (global_slots.logo?.enabled && userIdentity.showLogo && userIdentity.logo) {
        const slot = global_slots.logo;
        const logo = await loadImage(userIdentity.logo);

        ctx.save();
        ctx.globalAlpha = slot.opacity || 1;

        // Apply border radius if needed
        if (slot.borderRadius > 0) {
            ctx.beginPath();
            ctx.arc(
                slot.x + slot.width / 2,
                slot.y + slot.height / 2,
                slot.width / 2,
                0,
                2 * Math.PI
            );
            ctx.clip();
        }

        // Draw logo
        if (slot.fit === 'contain') {
            drawImageContain(ctx, logo, slot.x, slot.y, slot.width, slot.height);
        } else {
            ctx.drawImage(logo, slot.x, slot.y, slot.width, slot.height);
        }

        ctx.restore();
    }

    // Render author
    if (global_slots.author?.enabled && userIdentity.showAuthor && userIdentity.author) {
        const slot = global_slots.author;
        const text = (slot.prefix || '') + userIdentity.author;

        await loadFont(slot.fontFamily);
        ctx.font = `${slot.fontWeight} ${slot.fontSize}px ${slot.fontFamily}`;

        // Resolve color with auto-contrast support
        let color: string;
        if (slot.color === 'auto-contrast') {
            const bgColor = resolveColor('brand_primary', brandKit);
            color = getContrastColor(bgColor);
        } else {
            color = resolveColor(slot.color, brandKit);
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = slot.opacity || 1;
        ctx.textBaseline = 'top';

        // Apply text alignment
        let xPosition = slot.x;
        if (slot.textAlign === 'center') {
            xPosition = slot.x + slot.width / 2;
            ctx.textAlign = 'center';
        } else if (slot.textAlign === 'right') {
            xPosition = slot.x + slot.width;
            ctx.textAlign = 'right';
        } else {
            ctx.textAlign = 'left';
        }

        ctx.fillText(text, xPosition, slot.y);
    }

    // Render website
    if (global_slots.website?.enabled && userIdentity.showWebsite && userIdentity.website) {
        const slot = global_slots.website;

        await loadFont(slot.fontFamily);
        ctx.font = `${slot.fontWeight} ${slot.fontSize}px ${slot.fontFamily}`;

        // Resolve color with auto-contrast support
        let color: string;
        if (slot.color === 'auto-contrast') {
            const bgColor = resolveColor('brand_primary', brandKit);
            color = getContrastColor(bgColor);
        } else {
            color = resolveColor(slot.color, brandKit);
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = slot.opacity || 1;
        ctx.textBaseline = 'top';

        // Apply text alignment
        let xPosition = slot.x;
        if (slot.textAlign === 'center') {
            xPosition = slot.x + slot.width / 2;
            ctx.textAlign = 'center';
        } else if (slot.textAlign === 'right') {
            xPosition = slot.x + slot.width;
            ctx.textAlign = 'right';
        } else {
            ctx.textAlign = 'left';
        }

        ctx.fillText(userIdentity.website, xPosition, slot.y);
    }
}

/**
 * Loads an image from URL or base64
 */
async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

/**
 * Draws image with contain fit (maintains aspect ratio)
 */
function drawImageContain(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
) {
    const imgRatio = img.width / img.height;
    const containerRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let drawX = x;
    let drawY = y;

    if (imgRatio > containerRatio) {
        // Image is wider
        drawHeight = width / imgRatio;
        drawY = y + (height - drawHeight) / 2;
    } else {
        // Image is taller
        drawWidth = height * imgRatio;
        drawX = x + (width - drawWidth) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}
