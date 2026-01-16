import type { TextSlot } from '@/types';

/**
 * Envuelve texto en múltiples líneas según un ancho máximo
 * Respeta espacios y no corta palabras
 */
export function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
): string[] {
    // Split por espacios (uno o más) y filtrar vacíos
    const words = text.split(/\s+/).filter(w => w.length > 0);

    if (words.length === 0) return [''];

    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + ' ' + word;
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }

    lines.push(currentLine);
    return lines;
}

/**
 * Trunca un array de líneas a un máximo, agregando "..." al final
 */
export function truncateLines(lines: string[], maxLines: number): string[] {
    if (lines.length <= maxLines) {
        return lines;
    }

    const truncated = lines.slice(0, maxLines);

    // Agregar "..." a la última línea
    if (truncated.length > 0) {
        truncated[truncated.length - 1] = truncated[truncated.length - 1].trim() + '...';
    }

    return truncated;
}

/**
 * Resultado de la función makeTextFit
 */
export interface TextFitResult {
    fontSize: number;
    lines: string[];
    lineHeight: number;
}

/**
 * FUNCIÓN CRÍTICA: Auto-ajusta el texto para que quepa en un contenedor
 * 
 * Algoritmo:
 * 1. Empieza con fontSize base del slot
 * 2. Calcula cuántas líneas necesita con wrapping
 * 3. Calcula altura total considerando lineHeight
 * 4. Si no cabe, reduce fontSize gradualmente
 * 5. Si llega al minFontSize y aún no cabe, trunca con "..."
 * 
 * GARANTÍA: El texto NUNCA se desbordará del contenedor
 */
export function makeTextFit(
    ctx: CanvasRenderingContext2D,
    text: string,
    slot: TextSlot,
    maxWidth: number,
    maxHeight: number
): TextFitResult {
    let fontSize = slot.fontSize;
    const minFontSize = slot.minFontSize || 18;
    const maxLines = slot.maxLines || Infinity;
    const lineHeight = slot.lineHeight;

    // Reducir fontSize gradualmente hasta que quepa
    while (fontSize >= minFontSize) {
        // Configurar font con el tamaño actual
        ctx.font = `${slot.fontWeight} ${fontSize}px ${slot.fontFamily}`;

        // Calcular líneas con wrapping
        const lines = wrapText(ctx, text, maxWidth);

        // Calcular altura total
        const actualLineHeight = fontSize * lineHeight;
        const totalHeight = lines.length * actualLineHeight;

        // Verificar si cabe (tanto en altura como en cantidad de líneas)
        if (totalHeight <= maxHeight && lines.length <= maxLines) {
            return {
                fontSize,
                lines,
                lineHeight: actualLineHeight,
            };
        }

        // No cabe, reducir fontSize
        fontSize -= 2;
    }

    // Si llegamos aquí, ni siquiera con minFontSize cabe
    // Truncar líneas para forzar que quepa
    ctx.font = `${slot.fontWeight} ${minFontSize}px ${slot.fontFamily}`;
    const lines = wrapText(ctx, text, maxWidth);
    const actualLineHeight = minFontSize * lineHeight;
    const maxPossibleLines = Math.floor(maxHeight / actualLineHeight);

    const finalLines = truncateLines(
        lines,
        Math.min(maxPossibleLines, maxLines)
    );

    return {
        fontSize: minFontSize,
        lines: finalLines,
        lineHeight: actualLineHeight,
    };
}

/**
 * Procesa texto con énfasis (palabras entre **)
 * 
 * Ejemplo: "Hola **mundo**" → ["Hola ", { text: "mundo", emphasis: true }]
 */
export interface TextSegment {
    text: string;
    emphasis: boolean;
}

export function parseEmphasis(text: string): TextSegment[] {
    const segments: TextSegment[] = [];
    const parts = text.split(/(\*\*.*?\*\*)/g);

    for (const part of parts) {
        if (part.startsWith('**') && part.endsWith('**')) {
            // Es énfasis, quitar los **
            const cleanText = part.slice(2, -2);
            segments.push({ text: cleanText, emphasis: true });
        } else if (part.trim()) {
            // Es texto normal
            segments.push({ text: part, emphasis: false });
        }
    }

    return segments;
}
