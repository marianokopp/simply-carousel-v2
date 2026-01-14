import type { Template } from '@/types';

/**
 * Template: Example Minimal
 * 
 * Diseño minimalista con bloques de color y tipografía Bricolage Grotesque
 */
export const exampleMinimal: Template = {
    id: 'example-minimal',

    metadata: {
        name: 'Example Minimal',
        category: 'minimal',
        colorSupport: 2,
        description: 'Plantilla de ejemplo',
        tags: ['minimal']
    },

    viewport: {
        width: 1080,
        height: 1350,
        safeMargin: 60
    },

    background: {
        type: 'solid',
        colorVar: '#212121'
    },

    design_elements: [
        {
            id: 'rectangle-1768227548190',
            type: 'rectangle',
            x: 40,
            y: 44,
            width: 1004,
            height: 702,
            fill: 'brand_primary',
            opacity: 1,
            zIndex: 1,
        },
        {
            id: 'rectangle-1768227617642',
            type: 'rectangle',
            x: 36,
            y: 773,
            width: 1008,
            height: 536,
            fill: 'brand_primary',
            opacity: 0.69,
            zIndex: 2,
        }
    ],

    text_slots: {
        slide_number: {
            enabled: false,
            x: 0, y: 0, width: 0, height: 0,
            fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
            textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
            letterSpacing: 0, textTransform: 'none', zIndex: 0
        },

        label: {
            enabled: false,
            x: 0, y: 0, width: 0, height: 0,
            fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
            textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
            letterSpacing: 0, textTransform: 'none', zIndex: 0
        },

        tag: {
            enabled: false,
            x: 0, y: 0, width: 0, height: 0,
            fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
            textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
            letterSpacing: 0, textTransform: 'none', zIndex: 0
        },

        title: {
            enabled: true,
            x: 58,
            y: 60,
            width: 960,
            height: 660,
            fontFamily: 'Bricolage Grotesque',
            fontSize: 130,
            fontWeight: 600,
            color: 'brand_secondary',
            textAlign: 'left',
            verticalAlign: 'middle',
            lineHeight: 1.05,
            letterSpacing: -2,
            textTransform: 'none',
            autoFit: true,
            minFontSize: 32,
            maxLines: 4,
            zIndex: 9,

            emphasisStyle: {
                fontWeight: 700,
                color: 'brand_secondary',
            },
        },

        body: {
            enabled: true,
            x: 76,
            y: 784,
            width: 930,
            height: 400,
            fontFamily: 'Instrument Sans',
            fontSize: 70,
            fontWeight: 400,
            color: 'brand_secondary',
            textAlign: 'left',
            verticalAlign: 'top',
            lineHeight: 1.4,
            letterSpacing: 0,
            textTransform: 'none',
            autoFit: true,
            minFontSize: 18,
            maxLines: 8,
            zIndex: 8,

            emphasisStyle: {
                fontWeight: 700,
                color: 'brand_secondary',
            },
        },

        cta_text: {
            enabled: false,
            x: 0, y: 0, width: 0, height: 0,
            fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
            textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
            letterSpacing: 0, textTransform: 'none', zIndex: 0
        }
    },

    global_slots: {
        logo: {
            enabled: false,
            x: 60,
            y: 1200,
            width: 80,
            height: 80,
            fit: 'contain',
            borderRadius: 0,
            opacity: 0,
            zIndex: 50
        },

        author: {
            enabled: true,
            x: 68,
            y: 1240,
            width: 400,
            height: 60,
            fontFamily: 'Inter',
            fontSize: 28,
            fontWeight: 500,
            color: '#FFFFFF',
            textAlign: 'left',
            verticalAlign: 'top',
            lineHeight: 1,
            letterSpacing: 0,
            textTransform: 'none',
            prefix: '@',
            zIndex: 50
        },

        website: {
            enabled: false,
            x: 160,
            y: 1260,
            width: 400,
            height: 50,
            fontFamily: 'Inter',
            fontSize: 24,
            fontWeight: 400,
            color: '#FFFFFF',
            textAlign: 'left',
            verticalAlign: 'top',
            lineHeight: 1,
            letterSpacing: 0,
            textTransform: 'none',
            zIndex: 50
        }
    },

    variations: {
        hook: {
            design_elements: [],

            text_slots: {
                slide_number: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                label: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                tag: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                title: {
                    enabled: true,
                    x: 60,
                    y: 60,
                    width: 958,
                    height: 1164,
                    fontFamily: 'Bricolage Grotesque',
                    fontSize: 220,
                    fontWeight: 600,
                    color: 'brand_primary',
                    textAlign: 'left',
                    verticalAlign: 'middle',
                    lineHeight: 1.05,
                    letterSpacing: -2,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 32,
                    maxLines: 4,
                    zIndex: 9,

                    emphasisStyle: {
                        fontWeight: 700,
                        color: 'brand_primary',
                    },
                },

                body: {
                    enabled: false,
                    x: 60,
                    y: 766,
                    width: 960,
                    height: 522,
                    fontFamily: 'Instrument Sans',
                    fontSize: 40,
                    fontWeight: 400,
                    color: '#FFFFFF',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    lineHeight: 1.4,
                    letterSpacing: 0,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 18,
                    maxLines: 8,
                    zIndex: 8
                },

                cta_text: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                }
            }
        },

        cta: {
            design_elements: [],

            text_slots: {
                slide_number: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                label: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                tag: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                title: {
                    enabled: true,
                    x: 108,
                    y: 234,
                    width: 864,
                    height: 538,
                    fontFamily: 'Bricolage Grotesque',
                    fontSize: 160,
                    fontWeight: 700,
                    color: 'brand_primary',
                    textAlign: 'center',
                    verticalAlign: 'top',
                    lineHeight: 1.05,
                    letterSpacing: -2,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 32,
                    maxLines: 4,
                    zIndex: 9,

                    emphasisStyle: {
                        fontWeight: 700,
                        color: 'brand_primary',
                    },
                },

                body: {
                    enabled: true,
                    x: 108,
                    y: 898,
                    width: 864,
                    height: 252,
                    fontFamily: 'Bricolage Grotesque',
                    fontSize: 60,
                    fontWeight: 400,
                    color: 'brand_primary',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 1.4,
                    letterSpacing: 0,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 18,
                    maxLines: 8,
                    zIndex: 8,

                    emphasisStyle: {
                        fontWeight: 700,
                        color: 'brand_primary',
                    },
                },

                cta_text: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                }
            }
        }
    }
};
