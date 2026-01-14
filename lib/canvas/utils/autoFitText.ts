import type { TextSlot, AutoFitResult } from '@/types';

/**
 * Auto-fits text to a text slot, reducing font size if needed
 */
export function autoFitText(
    text: string,
    slot: TextSlot,
    ctx: CanvasRenderingContext2D
): AutoFitResult {
    const { width, height, fontSize, fontWeight, fontFamily, lineHeight, minFontSize = 16, maxLines = 10 } = slot;

    let currentFontSize = fontSize;
    const minSize = minFontSize;

    while (currentFontSize >= minSize) {
        ctx.font = `${fontWeight} ${currentFontSize}px ${fontFamily}`;
        const lines = wrapText(ctx, text, width);

        // Check if fits
        const totalHeight = lines.length * currentFontSize * lineHeight;

        if (totalHeight <= height && lines.length <= maxLines) {
            return {
                fontSize: currentFontSize,
                text,
                truncated: false,
            };
        }

        // Reduce font size
        currentFontSize -= 1;
    }

    // If still doesn't fit, truncate
    ctx.font = `${fontWeight} ${minSize}px ${fontFamily}`;
    const lines = wrapText(ctx, text, width);

    // Calcular cuántas líneas realmente caben en el height disponible
    const lineHeightPx = minSize * lineHeight;
    const maxAllowedLines = Math.min(
        maxLines,
        Math.floor(height / lineHeightPx)
    );

    if (lines.length > maxAllowedLines) {
        // Truncar el texto para que quepa exactamente
        const truncatedLines = lines.slice(0, maxAllowedLines);
        const lastLine = truncatedLines[truncatedLines.length - 1];

        // Asegurar que los "..." quepan en el ancho disponible
        let truncatedLastLine = lastLine;
        ctx.font = `${fontWeight} ${minSize}px ${fontFamily}`;
        while (ctx.measureText(truncatedLastLine + '...').width > width && truncatedLastLine.length > 0) {
            truncatedLastLine = truncatedLastLine.slice(0, -1);
        }

        truncatedLines[truncatedLines.length - 1] = truncatedLastLine + '...';

        return {
            fontSize: minSize,
            text: truncatedLines.join(' '),
            truncated: true,
        };
    }

    return {
        fontSize: minSize,
        text,
        truncated: false,
    };
}

/**
 * Wraps text into multiple lines based on width
 * Handles long words by breaking them mid-word if necessary
 */
export function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word) => {
        // Check if the word itself is too long
        const wordWidth = ctx.measureText(word).width;

        // Solo dividir palabra si es REALMENTE más ancha que maxWidth
        // Agregamos un margen de 5px para compensar diferencias de medición entre navegadores
        if (wordWidth > maxWidth + 5) {
            // Word is too long, need to break it
            if (currentLine) {
                lines.push(currentLine);
                currentLine = '';
            }

            // Break the word into chunks that fit
            let remainingWord = word;
            while (remainingWord.length > 0) {
                let chunk = '';
                for (let i = 0; i < remainingWord.length; i++) {
                    const testChunk = chunk + remainingWord[i];
                    if (ctx.measureText(testChunk).width <= maxWidth) {
                        chunk = testChunk;
                    } else {
                        break;
                    }
                }

                if (chunk.length === 0) {
                    // Even a single character doesn't fit, force it
                    chunk = remainingWord[0];
                }

                lines.push(chunk);
                remainingWord = remainingWord.substring(chunk.length);
            }
        } else {
            // Normal word processing
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const metrics = ctx.measureText(testLine);

            if (metrics.width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
    });

    if (currentLine) {
        lines.push(currentLine);
    }

    return lines;
}

/**
 * Calculates vertical offset for text alignment
 */
export function calculateVerticalOffset(
    lines: string[],
    fontSize: number,
    lineHeight: number,
    containerHeight: number,
    verticalAlign: 'top' | 'middle' | 'bottom'
): number {
    const totalTextHeight = lines.length * fontSize * lineHeight;

    if (verticalAlign === 'middle') {
        return (containerHeight - totalTextHeight) / 2;
    }
    if (verticalAlign === 'bottom') {
        return containerHeight - totalTextHeight;
    }
    return 0; // top
}
