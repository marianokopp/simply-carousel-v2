import type { Template } from '@/types';

/**
 * Template: Modern Gradient
 * 
 * Diseño moderno con degradados sutiles y elegantes.
 * Tipografía limpia con espaciado generoso.
 * Perfecto para contenido profesional y sofisticado.
 */
export const modernGradient: Template = {
    id: 'modern-gradient',

    metadata: {
        name: 'Modern Gradient',
        category: 'modern',
        colorSupport: 2, // Usa primary y secondary
        description: 'Diseño moderno con degradados sutiles y tipografía elegante',
        tags: ['modern', 'gradient', 'elegant', 'professional'],
    },

    viewport: {
        width: 1080,
        height: 1350,
        safeMargin: 60,
    },

    // Fondo con gradiente lineal
    background: {
        type: 'gradient',
        colorVar: 'brand_primary',
        gradient: {
            type: 'linear',
            angle: 135, // Diagonal de arriba-izquierda a abajo-derecha
            stops: [
                { offset: 0, color: 'brand_primary' },
                { offset: 1, color: 'brand_secondary' },
            ],
        },
    },

    // Elementos decorativos sutiles
    design_elements: [
        // Rectángulo translúcido superior
        {
            id: 'rect-top',
            type: 'rectangle',
            x: 0,
            y: 0,
            width: 1080,
            height: 400,
            fill: '#FFFFFF',
            opacity: 0.05,
            borderRadius: 0,
            zIndex: 1,
        },
        // Línea decorativa
        {
            id: 'line-accent',
            type: 'line',
            x1: 60,
            y1: 180,
            x2: 300,
            y2: 180,
            stroke: '#FFFFFF',
            strokeWidth: 4,
            opacity: 0.6,
            zIndex: 2,
        },
    ],

    // Text slots para slide body  
    text_slots: {
        // Label pequeño superior
        label: {
            enabled: true,
            x: 60,
            y: 80,
            width: 400,
            height: 40,
            fontFamily: 'Lato',
            fontSize: 14,
            fontWeight: 400,
            color: '#FFFFFF',
            textAlign: 'left',
            verticalAlign: 'top',
            lineHeight: 1,
            letterSpacing: 2,
            textTransform: 'uppercase',
            opacity: 0.8,
            zIndex: 8,
        },

        // Número de slide pequeño
        slide_number: {
            enabled: true,
            x: 60,
            y: 120,
            width: 100,
            height: 40,
            fontFamily: 'Inter',
            fontSize: 24,
            fontWeight: 300,
            color: '#FFFFFF',
            textAlign: 'left',
            verticalAlign: 'top',
            lineHeight: 1,
            letterSpacing: 0,
            textTransform: 'none',
            opacity: 0.7,
            zIndex: 8,
            numberFormat: '01', // "01", "02"
        },

        // Body text centrado
        body: {
            enabled: true,
            x: 60,
            y: 350,
            width: 960,
            height: 850,
            fontFamily: 'Inter',
            fontSize: 56,
            fontWeight: 500,
            color: '#FFFFFF',
            textAlign: 'left',
            verticalAlign: 'middle',
            lineHeight: 1.4,
            letterSpacing: -0.5,
            textTransform: 'none',
            autoFit: true,
            minFontSize: 32,
            maxLines: 10,
            zIndex: 9,

            // Énfasis con negrita
            emphasisStyle: {
                fontWeight: 700,
                color: '#FFFFFF',
            },
        },

        // Slots no usados
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
            y: 1270,
            width: 400,
            height: 40,
            fontFamily: 'Inter',
            fontSize: 16,
            fontWeight: 500,
            color: '#FFFFFF',
            textAlign: 'left',
            verticalAlign: 'middle',
            lineHeight: 1,
            letterSpacing: 0.5,
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
            color: '#FFFFFF',
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
        // Primer slide (Hook)
        hook: {
            // Gradiente invertido
            background: {
                type: 'gradient',
                colorVar: 'brand_secondary',
                gradient: {
                    type: 'linear',
                    angle: 315, // Diagonal invertida
                    stops: [
                        { offset: 0, color: 'brand_secondary' },
                        { offset: 1, color: 'brand_primary' },
                    ],
                },
            },

            design_elements: [
                // Rectángulo decorativo más grande
                {
                    id: 'rect-hook',
                    type: 'rectangle',
                    x: 0,
                    y: 0,
                    width: 1080,
                    height: 600,
                    fill: '#FFFFFF',
                    opacity: 0.08,
                    borderRadius: 0,
                    zIndex: 1,
                },
            ],

            text_slots: {
                label: {
                    enabled: true,
                    x: 60,
                    y: 120,
                    width: 600,
                    height: 40,
                    fontFamily: 'poppins',
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#FFFFFF',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    lineHeight: 1,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    opacity: 0.7,
                    zIndex: 8,
                },

                title: {
                    enabled: true,
                    x: 60,
                    y: 250,
                    width: 960,
                    height: 900,
                    fontFamily: 'Poppins',
                    fontSize: 96,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    textAlign: 'left',
                    verticalAlign: 'middle',
                    lineHeight: 1.15,
                    letterSpacing: -2,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 56,
                    maxLines: 6,
                    zIndex: 9,

                    emphasisStyle: {
                        fontWeight: 800,
                        color: '#FFFFFF',
                    },
                },
            },
        },

        // Último slide (CTA)
        cta: {
            // Gradiente radial desde el centro
            background: {
                type: 'gradient',
                colorVar: 'brand_primary',
                gradient: {
                    type: 'radial',
                    stops: [
                        { offset: 0, color: 'brand_secondary' },
                        { offset: 1, color: 'brand_primary' },
                    ],
                },
            },

            design_elements: [],

            text_slots: {
                title: {
                    enabled: true,
                    x: 60,
                    y: 400,
                    width: 960,
                    height: 600,
                    fontFamily: 'Inter',
                    fontSize: 84,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 1.2,
                    letterSpacing: -1.5,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 48,
                    maxLines: 5,
                    zIndex: 9,

                    emphasisStyle: {
                        fontWeight: 800,
                        color: '#FFFFFF',
                    },
                },

                body: {
                    enabled: true,
                    x: 60,
                    y: 1050,
                    width: 960,
                    height: 100,
                    fontFamily: 'Inter',
                    fontSize: 28,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 1.3,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    autoFit: true,
                    minFontSize: 18,
                    maxLines: 2,
                    opacity: 0.9,
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
