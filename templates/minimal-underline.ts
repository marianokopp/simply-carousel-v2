import type { Template } from '@/types';

/**
 * Template: Minimal Underline
 * 
 * Estilo minimalista con énfasis en subrayado de palabras clave.
 * Usa mucho espacio en blanco, tipografía grande y limpia.
 * El énfasis se logra con background color bajo las palabras entre **.
 */
export const minimalUnderline: Template = {
    id: 'minimal-underline',

    metadata: {
        name: 'Minimal Underline',
        category: 'minimal',
        colorSupport: 2, // Usa primary y secondary
        description: 'Diseño minimalista con énfasis en subrayado de palabras clave',
        tags: ['minimal', 'text-heavy', 'underline', 'clean'],
    },

    viewport: {
        width: 1080,
        height: 1350,
        safeMargin: 60,
    },

    // Fondo sólido con color primario
    background: {
        type: 'solid',
        colorVar: 'brand_primary',
    },

    // Sin elementos decorativos en body (minimalista puro)
    design_elements: [],

    // Text slots para slide body  
    text_slots: {
        // Número de slide en esquina superior derecha
        slide_number: {
            enabled: true,
            x: 920,
            y: 60,
            width: 100,
            height: 40,
            fontFamily: 'Inter',
            fontSize: 20,
            fontWeight: 500,
            color: 'auto-contrast',
            textAlign: 'right',
            verticalAlign: 'top',
            lineHeight: 1,
            letterSpacing: 0,
            textTransform: 'none',
            zIndex: 8,
            numberFormat: '/7', // Muestra como "1/7"
        },

        // Body text grande centrado
        body: {
            enabled: true,
            x: 60,
            y: 200,
            width: 960,
            height: 1000,
            fontFamily: 'Inter',
            fontSize: 64,
            fontWeight: 400,
            color: 'auto-contrast',
            textAlign: 'left',
            verticalAlign: 'middle',
            lineHeight: 1.3,
            letterSpacing: -0.5,
            textTransform: 'none',
            autoFit: true,
            minFontSize: 36,
            maxLines: 12,
            zIndex: 9,

            // Énfasis con subrayado de color
            emphasisStyle: {
                fontWeight: 700,
                color: 'auto-contrast',
                backgroundColor: 'brand_secondary',
                backgroundOpacity: 1,
            },
        },

        // Slots no usados en body
        label: {
            enabled: false, x: 0, y: 0, width: 0, height: 0,
            fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
            textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
            letterSpacing: 0, textTransform: 'none', zIndex: 0
        },
        tag: {
            enabled: false, x: 0, y: 0, width: 0, height: 0,
            fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
            textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
            letterSpacing: 0, textTransform: 'none', zIndex: 0
        },
        title: {
            enabled: false, x: 0, y: 0, width: 0, height: 0,
            fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
            textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
            letterSpacing: 0, textTransform: 'none', zIndex: 0
        },
        cta_text: {
            enabled: false, x: 0, y: 0, width: 0, height: 0,
            fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
            textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
            letterSpacing: 0, textTransform: 'none', zIndex: 0
        },
    },

    // Global slots (logo, author, website)
    global_slots: {
        logo: {
            enabled: false,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            fit: 'contain',
            borderRadius: 0,
            opacity: 0,
            zIndex: 10,
        },

        author: {
            enabled: true,
            x: 60,
            y: 1280,
            width: 300,
            height: 30,
            fontFamily: 'Inter',
            fontSize: 18,
            fontWeight: 500,
            color: 'auto-contrast',
            textAlign: 'left',
            verticalAlign: 'middle',
            lineHeight: 1,
            letterSpacing: 0,
            prefix: '@',
            opacity: 0.8,
            zIndex: 10,
        },

        website: {
            enabled: false,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            fontFamily: 'Inter',
            fontSize: 16,
            fontWeight: 400,
            color: 'auto-contrast',
            textAlign: 'left',
            verticalAlign: 'middle',
            lineHeight: 1,
            letterSpacing: 0,
            opacity: 0,
            zIndex: 10,
        },
    },

    // Variations para hook y cta
    variations: {
        // Primer slide (Hook) - Título grande
        hook: {
            text_slots: {
                // TODOS los slots deben estar definidos en variations
                slide_number: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400,
                    color: 'auto-contrast',
                    textAlign: 'left', verticalAlign: 'top',
                    lineHeight: 1, letterSpacing: 0, textTransform: 'none',
                    zIndex: 0,
                },
                label: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400,
                    color: 'auto-contrast',
                    textAlign: 'left', verticalAlign: 'top',
                    lineHeight: 1, letterSpacing: 0, textTransform: 'none',
                    zIndex: 0,
                },
                tag: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400,
                    color: 'auto-contrast',
                    textAlign: 'left', verticalAlign: 'top',
                    lineHeight: 1, letterSpacing: 0, textTransform: 'none',
                    zIndex: 0,
                },
                title: {
                    enabled: true,
                    x: 60,
                    y: 300,
                    width: 960,
                    height: 750,
                    fontFamily: 'Inter',
                    fontSize: 110,
                    fontWeight: 800,
                    color: 'auto-contrast',
                    textAlign: 'left',
                    verticalAlign: 'middle',
                    lineHeight: 1.1,
                    letterSpacing: -3,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 60,
                    maxLines: 6,
                    zIndex: 9,

                    emphasisStyle: {
                        fontWeight: 800,
                        color: 'auto-contrast',
                        backgroundColor: 'brand_secondary',
                        backgroundOpacity: 1,
                    },
                },
                body: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400,
                    color: 'auto-contrast',
                    textAlign: 'left', verticalAlign: 'top',
                    lineHeight: 1, letterSpacing: 0, textTransform: 'none',
                    zIndex: 0,
                },
                cta_text: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400,
                    color: 'auto-contrast',
                    textAlign: 'left', verticalAlign: 'top',
                    lineHeight: 1, letterSpacing: 0, textTransform: 'none',
                    zIndex: 0,
                },
            },
        },


        // Último slide (CTA) - Call to action centrado
        cta: {
            text_slots: {
                // TODOS los slots deben estar definidos
                slide_number: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400,
                    color: 'auto-contrast',
                    textAlign: 'left', verticalAlign: 'top',
                    lineHeight: 1, letterSpacing: 0, textTransform: 'none',
                    zIndex: 0,
                },
                label: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400,
                    color: 'auto-contrast',
                    textAlign: 'left', verticalAlign: 'top',
                    lineHeight: 1, letterSpacing: 0, textTransform: 'none',
                    zIndex: 0,
                },
                tag: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400,
                    color: 'auto-contrast',
                    textAlign: 'left', verticalAlign: 'top',
                    lineHeight: 1, letterSpacing: 0, textTransform: 'none',
                    zIndex: 0,
                },
                title: {
                    enabled: true,
                    x: 60,
                    y: 350,
                    width: 960,
                    height: 600,
                    fontFamily: 'Inter',
                    fontSize: 96,
                    fontWeight: 800,
                    color: 'auto-contrast',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 1.1,
                    letterSpacing: -2,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 56,
                    maxLines: 5,
                    zIndex: 9,

                    emphasisStyle: {
                        fontWeight: 800,
                        color: 'auto-contrast',
                        backgroundColor: 'brand_secondary',
                        backgroundOpacity: 1,
                    },
                },
                body: {
                    enabled: true,
                    x: 60,
                    y: 1000,
                    width: 960,
                    height: 120,
                    fontFamily: 'Inter',
                    fontSize: 36,
                    fontWeight: 600,
                    color: 'auto-contrast',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 1.3,
                    letterSpacing: 0,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 24,
                    maxLines: 3,
                    zIndex: 9,
                },
                cta_text: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400,
                    color: 'auto-contrast',
                    textAlign: 'left', verticalAlign: 'top',
                    lineHeight: 1, letterSpacing: 0, textTransform: 'none',
                    zIndex: 0,
                },
            },
        },
    },
};
