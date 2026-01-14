import type { Template } from '@/types';

/**
 * Template: Bold Geometric
 * 
 * Diseño bold con formas geométricas grandes y colores sólidos.
 * Alto impacto visual, perfecto para mensajes directos.
 * Usa formas circulares grandes como elemento decorativo.
 */
export const boldGeometric: Template = {
    id: 'bold-geometric',

    metadata: {
        name: 'Bold Geometric',
        category: 'bold',
        colorSupport: 2, // Usa primary y secondary
        description: 'Diseño bold con formas geométricas y colores sólidos de alto impacto',
        tags: ['bold', 'geometric', 'shapes', 'impact'],
    },

    viewport: {
        width: 1080,
        height: 1350,
        safeMargin: 60,
    },

    // Fondo con color secundario
    background: {
        type: 'solid',
        colorVar: 'brand_secondary',
    },

    // Elemento decorativo: Círculo grande en la esquina
    design_elements: [
        {
            id: 'circle-1',
            type: 'circle',
            cx: -100,
            cy: 200,
            radius: 300,
            fill: 'brand_primary',
            opacity: 0.15,
            zIndex: 1,
        },
        {
            id: 'circle-2',
            type: 'circle',
            cx: 1180,
            cy: 1150,
            radius: 250,
            fill: 'brand_primary',
            opacity: 0.15,
            zIndex: 1,
        },
    ],

    // Text slots para slide body  
    text_slots: {
        // Número de slide esquina superior izquierda - grande y bold
        slide_number: {
            enabled: true,
            x: 60,
            y: 60,
            width: 100,
            height: 80,
            fontFamily: 'Inter',
            fontSize: 72,
            fontWeight: 900,
            color: 'brand_primary',
            textAlign: 'left',
            verticalAlign: 'top',
            lineHeight: 1,
            letterSpacing: 0,
            textTransform: 'none',
            zIndex: 8,
            numberFormat: '01', // Muestra como "01", "02"
        },

        // Body text centrado, bold
        body: {
            enabled: true,
            x: 60,
            y: 300,
            width: 960,
            height: 900,
            fontFamily: 'Inter',
            fontSize: 72,
            fontWeight: 800,
            color: 'auto-contrast',
            textAlign: 'center',
            verticalAlign: 'middle',
            lineHeight: 1.2,
            letterSpacing: -1,
            textTransform: 'none',
            autoFit: true,
            minFontSize: 40,
            maxLines: 8,
            zIndex: 9,

            // Énfasis con color primario
            emphasisStyle: {
                fontWeight: 900,
                color: 'brand_primary',
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

    // Global slots
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
            fontWeight: 700,
            color: 'auto-contrast',
            textAlign: 'left',
            verticalAlign: 'middle',
            lineHeight: 1,
            letterSpacing: 0,
            prefix: '@',
            opacity: 0.9,
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
        // Primer slide (Hook) - Título gigante
        hook: {
            // Fondo con color primario para diferenciarse
            background: {
                type: 'solid',
                colorVar: 'brand_primary',
            },

            // Círculos en posiciones diferentes
            design_elements: [
                {
                    id: 'circle-hook',
                    type: 'circle',
                    cx: 900,
                    cy: 300,
                    radius: 350,
                    fill: 'brand_secondary',
                    opacity: 0.2,
                    zIndex: 1,
                },
            ],

            text_slots: {
                title: {
                    enabled: true,
                    x: 60,
                    y: 250,
                    width: 960,
                    height: 850,
                    fontFamily: 'Inter',
                    fontSize: 120,
                    fontWeight: 900,
                    color: 'auto-contrast',
                    textAlign: 'left',
                    verticalAlign: 'middle',
                    lineHeight: 1.05,
                    letterSpacing: -4,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 64,
                    maxLines: 5,
                    zIndex: 9,

                    emphasisStyle: {
                        fontWeight: 900,
                        color: 'brand_secondary',
                    },
                },
            },
        },

        // Último slide (CTA)
        cta: {
            // Fondo primario
            background: {
                type: 'solid',
                colorVar: 'brand_primary',
            },

            // Formas decorativas multiple
            design_elements: [
                {
                    id: 'circle-cta-1',
                    type: 'circle',
                    cx: 100,
                    cy: 100,
                    radius: 180,
                    fill: 'brand_secondary',
                    opacity: 0.2,
                    zIndex: 1,
                },
                {
                    id: 'circle-cta-2',
                    type: 'circle',
                    cx: 980,
                    cy: 1250,
                    radius: 200,
                    fill: 'brand_secondary',
                    opacity: 0.2,
                    zIndex: 1,
                },
            ],

            text_slots: {
                title: {
                    enabled: true,
                    x: 60,
                    y: 300,
                    width: 960,
                    height: 700,
                    fontFamily: 'Inter',
                    fontSize: 100,
                    fontWeight: 900,
                    color: 'auto-contrast',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 1.1,
                    letterSpacing: -3,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 60,
                    maxLines: 4,
                    zIndex: 9,

                    emphasisStyle: {
                        fontWeight: 900,
                        color: 'brand_secondary',
                    },
                },

                body: {
                    enabled: true,
                    x: 60,
                    y: 1050,
                    width: 960,
                    height: 150,
                    fontFamily: 'Inter',
                    fontSize: 32,
                    fontWeight: 700,
                    color: 'auto-contrast',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 1.3,
                    letterSpacing: 0,
                    textTransform: 'uppercase',
                    autoFit: true,
                    minFontSize: 20,
                    maxLines: 3,
                    zIndex: 9,
                },

                cta_text: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },
            },
        },
    },
};
