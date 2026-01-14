import type { TextSegment } from '@/types';

/**
 * Parses text with **emphasis** markers
 * "Hello **world**" -> [{ text: "Hello ", emphasized: false }, { text: "world", emphasized: true }]
 */
export function parseEmphasis(text: string): TextSegment[] {
    const segments: TextSegment[] = [];
    const regex = /\*\*(.+?)\*\*/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Add text before emphasis
        if (match.index > lastIndex) {
            segments.push({
                text: text.substring(lastIndex, match.index),
                emphasized: false,
            });
        }

        // Add emphasized text
        segments.push({
            text: match[1],
            emphasized: true,
        });

        lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        segments.push({
            text: text.substring(lastIndex),
            emphasized: false,
        });
    }

    return segments;
}

/**
 * Checks if text has emphasis markers
 */
export function hasEmphasis(text: string): boolean {
    return /\*\*(.+?)\*\*/.test(text);
}
