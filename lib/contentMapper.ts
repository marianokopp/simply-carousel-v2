import type { SlideContent, GeneratedContent, BrandKit, UserIdentity, SlideData, Template } from '@/types';

/**
 * Converts SlideContent (UI format) to UserIdentity (renderer format)
 */
export function brandKitToUserIdentity(brandKit: BrandKit): UserIdentity {
    return {
        logo: brandKit.logo_url || null,
        author: brandKit.author_handle || '',
        website: brandKit.website || '',
        showLogo: brandKit.show_logo,
        showAuthor: brandKit.show_author,
        showWebsite: brandKit.show_website,
    };
}

/**
 * Converts SlideContent (UI format) to SlideData (renderer format)
 */
export function slideContentToSlideData(
    slide: SlideContent,
    index: number,
    totalSlides: number,
    template: Template,
    brandKit: BrandKit
): SlideData {
    const userIdentity = brandKitToUserIdentity(brandKit);

    return {
        type: slide.type,
        slideNumber: index + 1,
        totalSlides,
        content: {
            label: undefined,
            title: slide.title || '',
            tag: slide.tag,
            body: slide.body,
            action: slide.cta_text,
        },
        template,
        brandKit,
        userIdentity,
    };
}

/**
 * Converts GeneratedContent (AI format) to SlideContent[] (UI format)
 * This maintains backward compatibility with the current UI
 */
export function generatedContentToSlides(content: GeneratedContent): SlideContent[] {
    const slides: SlideContent[] = [];

    // Slide 1: Hook
    slides.push({
        type: 'hook',
        title: content.hook.title,
        tag: content.hook.label, // El label de IA se mapea a tag en UI
    });

    // Slides 2-N: Body
    content.body.forEach((point, index) => {
        slides.push({
            type: 'body',
            number: String(index + 1).padStart(2, '0'),
            title: point.title,
            body: point.content,
        });
    });

    // Last slide: CTA
    slides.push({
        type: 'cta',
        title: content.cta.title,
        body: content.cta.action, // El action del CTA ahora va en body
    });

    return slides;
}
