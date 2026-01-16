import { create } from 'zustand';
import type { CarouselState, SlideContent, BrandKit } from '@/types';

// Brand Kit por defecto
const defaultBrandKit: BrandKit = {
    show_logo: false,
    show_author: false,
    show_website: false,
    primary_color: '#607AFB',
    secondary_color: '#10B981',
};

// Store global del carrusel
export const useCarouselStore = create<CarouselState>((set) => ({
    // Estado inicial
    slides: [],
    currentSlideIndex: 0,
    templateId: 'minimal-underline', // Template por defecto
    brandKit: defaultBrandKit,

    // Actions
    setSlides: (slides: SlideContent[]) =>
        set({ slides, currentSlideIndex: 0 }),

    setCurrentSlide: (index: number) =>
        set({ currentSlideIndex: index }),

    setTemplate: (templateId: string) =>
        set({ templateId }),

    setBrandKit: (brandKitPartial: Partial<BrandKit>) =>
        set((state) => ({
            brandKit: { ...state.brandKit, ...brandKitPartial },
        })),

    updateSlideContent: (index: number, updatedSlide: Partial<SlideContent>) =>
        set((state) => ({
            slides: state.slides.map((slide, i) =>
                i === index ? { ...slide, ...updatedSlide } : slide
            ),
        })),

    reset: () =>
        set({
            slides: [],
            currentSlideIndex: 0,
            templateId: 'minimal-underline',
            brandKit: defaultBrandKit,
        }),
}));
