import type { SlideData, TextSlot, WordWithStyle, BrandKit } from '@/types';
import { resolveColor, getContrastColor } from '../utils/colorUtils';
import { getSlideConfig, formatSlideNumber } from '../utils/templateUtils';
import { loadFont } from '../utils/fontLoader';
import { autoFitText, wrapText, calculateVerticalOffset } from '../utils/autoFitText';
import { parseEmphasis, hasEmphasis } from '../utils/emphasisParser';

/**
 * Renders all text slots (Layer 2)
 */
export async function renderTextSlots(
    ctx: CanvasRenderingContext2D,
    slideData: SlideData
): Promise<void> {
    const { template, brandKit, content, slideNumber, type, totalSlides } = slideData;
    const config = getSlideConfig(template, type);

    // Ensure fonts are loaded
    await document.fonts.ready;

    // Render each enabled slot
    for (const [slotName, slot] of Object.entries(config.text_slots)) {
        if (!slot || !slot.enabled) continue;

        let textContent = '';

        // Map content to slot
        switch (slotName) {
            case 'slide_number':
                if (type === 'body') {
                    // Usar el número generado por IA (editable) si existe,
                    // de lo contrario usar el índice formateado
                    textContent = content.number || formatSlideNumber(
                        slideNumber,
                        totalSlides,
                        slot.numberFormat || '01'
                    );
                }
                break;
            case 'label':
                textContent = content.label || '';
                break;
            case 'tag':
                textContent = content.tag || '';
                break;
            case 'title':
                textContent = content.title;
                break;
            case 'body':
                textContent = content.body || '';
                break;
            case 'cta_text':
                textContent = content.action || '';
                break;
        }

        if (!textContent) continue;

        await renderTextSlot(ctx, slot, textContent, brandKit);
    }
}

/**
 * Renders a single text slot
 */
async function renderTextSlot(
    ctx: CanvasRenderingContext2D,
    slot: TextSlot,
    textContent: string,
    brandKit: BrandKit
): Promise<void> {
    const { x, y, width, height, fontFamily, textAlign, verticalAlign } = slot;

    // Load font
    await loadFont(fontFamily);

    // Apply text transform
    if (slot.textTransform) {
        switch (slot.textTransform) {
            case 'uppercase':
                textContent = textContent.toUpperCase();
                break;
            case 'lowercase':
                textContent = textContent.toLowerCase();
                break;
            case 'capitalize':
                textContent = textContent.replace(/\b\w/g, (c) => c.toUpperCase());
                break;
        }
    }

    // Auto-fit if enabled
    let finalFontSize = slot.fontSize;
    let finalText = textContent;

    if (slot.autoFit) {
        const fitted = autoFitText(textContent, slot, ctx);
        finalFontSize = fitted.fontSize;
        finalText = fitted.text;
    }

    // Resolve color with auto-contrast support
    let color: string;
    if (slot.color === 'auto-contrast') {
        const bgColor = resolveColor('brand_primary', brandKit);
        color = getContrastColor(bgColor);
    } else {
        color = resolveColor(slot.color, brandKit);
    }

    // Set base style
    ctx.font = `${slot.fontWeight} ${finalFontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';
    ctx.globalAlpha = slot.opacity || 1;

    // Check for emphasis
    const hasEmph = hasEmphasis(finalText);

    if (hasEmph && slot.emphasisStyle) {
        // Render with emphasis
        const segments = parseEmphasis(finalText);
        renderTextWithEmphasis(ctx, segments, slot, finalFontSize, brandKit);
    } else {
        // Simple render without emphasis
        const lines = wrapText(ctx, finalText, width);
        const verticalOffset = calculateVerticalOffset(
            lines,
            finalFontSize,
            slot.lineHeight,
            height,
            verticalAlign
        );

        lines.forEach((line, index) => {
            const lineY = y + verticalOffset + index * finalFontSize * slot.lineHeight;

            let lineX = x;
            if (textAlign === 'center') {
                lineX = x + (width - ctx.measureText(line).width) / 2;
            } else if (textAlign === 'right') {
                lineX = x + width - ctx.measureText(line).width;
            }

            ctx.fillText(line, lineX, lineY);
        });
    }

    ctx.globalAlpha = 1; // Reset
}

/**
 * Renders text with emphasis markers across multiple lines
 */
function renderTextWithEmphasis(
    ctx: CanvasRenderingContext2D,
    segments: any[],
    slot: TextSlot,
    fontSize: number,
    brandKit: BrandKit
): void {
    const { x, y, width, height, lineHeight, textAlign, fontFamily } = slot;

    // Resolve base color
    let baseColor: string;
    if (slot.color === 'auto-contrast') {
        const bgColor = resolveColor('brand_primary', brandKit);
        baseColor = getContrastColor(bgColor);
    } else {
        baseColor = resolveColor(slot.color, brandKit);
    }

    // Resolve emphasis color
    const emphasisColor = slot.emphasisStyle
        ? resolveColor(slot.emphasisStyle.color, brandKit)
        : baseColor;

    // Convert segments to words with styles
    const words: WordWithStyle[] = [];
    segments.forEach((seg: any) => {
        // Split por espacios (uno o más) y filtrar vacíos
        const segWords = seg.text.split(/\s+/).filter((w: string) => w.length > 0);
        segWords.forEach((word: string) => {
            words.push({
                text: word,
                emphasized: seg.emphasized,
            });
        });
    });

    // Build lines respecting width
    const lines: WordWithStyle[][] = [];
    let currentLine: WordWithStyle[] = [];
    let currentWidth = 0;

    words.forEach((word) => {
        const style = word.emphasized && slot.emphasisStyle ? slot.emphasisStyle : slot;
        ctx.font = `${style.fontWeight} ${fontSize}px ${fontFamily}`;
        const wordWidth = ctx.measureText(word.text + ' ').width;

        if (currentWidth + wordWidth > width && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = [word];
            currentWidth = wordWidth;
        } else {
            currentLine.push(word);
            currentWidth += wordWidth;
        }
    });

    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    // Calculate vertical offset
    const totalHeight = lines.length * (fontSize * lineHeight);
    let verticalOffset = 0;

    if (slot.verticalAlign === 'middle') {
        verticalOffset = (height - totalHeight) / 2;
    } else if (slot.verticalAlign === 'bottom') {
        verticalOffset = height - totalHeight;
    }

    // Render each line
    lines.forEach((line, lineIndex) => {
        const lineY = y + verticalOffset + lineIndex * fontSize * lineHeight;
        let currentX = x;

        // Calculate line width for alignment
        let totalLineWidth = 0;
        line.forEach((word) => {
            const style = word.emphasized && slot.emphasisStyle ? slot.emphasisStyle : slot;
            ctx.font = `${style.fontWeight} ${fontSize}px ${fontFamily}`;
            totalLineWidth += ctx.measureText(word.text + ' ').width;
        });

        if (textAlign === 'center') {
            currentX = x + (width - totalLineWidth) / 2;
        } else if (textAlign === 'right') {
            currentX = x + width - totalLineWidth;
        }

        // Render words in the line
        line.forEach((word, wordIndex) => {
            const wordStyle = word.emphasized && slot.emphasisStyle ? slot.emphasisStyle : slot;
            ctx.font = `${wordStyle.fontWeight} ${fontSize}px ${fontFamily}`;

            const wordWidth = ctx.measureText(word.text).width;

            // Draw emphasis underline if needed
            if (word.emphasized && slot.emphasisStyle?.backgroundColor) {
                const bgColor = resolveColor(slot.emphasisStyle.backgroundColor, brandKit);
                const opacity = slot.emphasisStyle.backgroundOpacity ?? 0.4;

                const startX = currentX - fontSize * 0.05;
                const endX = currentX + wordWidth + fontSize * 0.05;
                const baseY = lineY + fontSize * 0.9;

                ctx.globalAlpha = opacity;
                ctx.strokeStyle = bgColor;
                ctx.lineWidth = fontSize * 0.02;
                ctx.lineCap = 'round';

                // Simple underline
                ctx.beginPath();
                ctx.moveTo(startX, baseY);
                ctx.lineTo(endX, baseY);
                ctx.stroke();

                ctx.globalAlpha = 1;
            }

            // Draw text
            if (word.emphasized && slot.emphasisStyle) {
                ctx.fillStyle = emphasisColor;
            } else {
                ctx.fillStyle = baseColor;
            }

            ctx.fillText(word.text, currentX, lineY);

            // Solo agregar espacio si NO es la última palabra de la línea
            if (wordIndex < line.length - 1) {
                currentX += wordWidth + ctx.measureText(' ').width;
            } else {
                currentX += wordWidth;
            }
        });
    });
}
