/**
 * Loads a font and waits for it to be ready
 */
export async function loadFont(fontFamily: string): Promise<void> {
    // Check if already loaded
    if (document.fonts.check(`12px ${fontFamily}`)) {
        return;
    }

    try {
        await document.fonts.load(`12px ${fontFamily}`);
        await document.fonts.ready;
    } catch (error) {
        console.warn(`Failed to load font: ${fontFamily}`, error);
    }
}

/**
 * Preloads all fonts used in a template
 */
export async function preloadTemplateFonts(template: any): Promise<void> {
    const fonts = new Set<string>();

    // Collect fonts from text slots
    if (template.text_slots) {
        Object.values(template.text_slots).forEach((slot: any) => {
            if (slot?.fontFamily) {
                fonts.add(slot.fontFamily);
            }
        });
    }

    // Collect fonts from global slots
    if (template.global_slots) {
        if (template.global_slots.author?.fontFamily) {
            fonts.add(template.global_slots.author.fontFamily);
        }
        if (template.global_slots.website?.fontFamily) {
            fonts.add(template.global_slots.website.fontFamily);
        }
    }

    // Load all fonts
    await Promise.all(Array.from(fonts).map((font) => loadFont(font)));
}
