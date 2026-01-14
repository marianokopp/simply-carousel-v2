import type { Template } from '@/types';

/**
 * Template: Young Minimal
 * 
 * Diseño minimalista con tipografía Young Serif
 */
export const youngMinimal: Template = {
    id: 'young-minimal',

    metadata: {
        name: 'Young Minimal',
        category: 'minimal',
        colorSupport: 2,
        description: 'Minimal - title',
        tags: ['minimal']
    },

    viewport: {
        width: 1080,
        height: 1350,
        safeMargin: 60
    },

    background: {
        type: 'solid',
        colorVar: '#dedede'
    },

    design_elements: [],

    text_slots: {
        slide_number: {
            enabled: true,
            x: 108,
            y: 106,
            width: 120,
            height: 110,
            fontFamily: 'Young Serif',
            fontSize: 80,
            fontWeight: 400,
            color: '#303030',
            textAlign: 'left',
            verticalAlign: 'top',
            lineHeight: 1.2,
            letterSpacing: 0,
            textTransform: 'none',
            autoFit: false,
            zIndex: 10
        },

        label: {
            enabled: false,
            x: 0, y: 0, width: 0, height: 0,
            fontFamily: 'Young Serif', fontSize: 16, fontWeight: 400, color: '#000',
            textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
            letterSpacing: 0, textTransform: 'none', zIndex: 0
        },

        tag: {
            enabled: false,
            x: 0, y: 0, width: 0, height: 0,
            fontFamily: 'Young Serif', fontSize: 16, fontWeight: 400, color: '#000',
            textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
            letterSpacing: 0, textTransform: 'none', zIndex: 0
        },

        title: {
            enabled: true,
            x: 108,
            y: 300,
            width: 864,
            height: 400,
            fontFamily: 'Young Serif',
            fontSize: 110,
            fontWeight: 700,
            color: '#303030',
            textAlign: 'left',
            verticalAlign: 'middle',
            lineHeight: 1.05,
            letterSpacing: -2,
            textTransform: 'none',
            autoFit: true,
            minFontSize: 48,
            maxLines: 4,
            zIndex: 9,

            emphasisStyle: {
                fontWeight: 700,
                color: '#303030',
            },
        },

        body: {
            enabled: true,
            x: 108,
            y: 750,
            width: 864,
            height: 400,
            fontFamily: 'Young Serif',
            fontSize: 60,
            fontWeight: 400,
            color: '#303030',
            textAlign: 'left',
            verticalAlign: 'middle',
            lineHeight: 1.4,
            letterSpacing: 0,
            textTransform: 'none',
            autoFit: true,
            minFontSize: 24,
            maxLines: 8,
            zIndex: 8,

            emphasisStyle: {
                fontWeight: 700,
                color: '#303030',
            },
        },

        cta_text: {
            enabled: false,
            x: 0, y: 0, width: 0, height: 0,
            fontFamily: 'Young Serif', fontSize: 16, fontWeight: 400, color: '#000',
            textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
            letterSpacing: 0, textTransform: 'none', zIndex: 0
        }
    },

    global_slots: {
        logo: {
            enabled: true,
            x: 866,
            y: 118,
            width: 100,
            height: 100,
            fit: 'contain',
            borderRadius: 0,
            opacity: 1,
            zIndex: 50
        },

        author: {
            enabled: true,
            x: 116,
            y: 1288,
            width: 400,
            height: 60,
            fontFamily: 'Young Serif',
            fontSize: 22,
            fontWeight: 500,
            color: 'brand_primary',
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
            background: {
                type: 'solid',
                colorVar: '#303030'
            },

            text_slots: {
                slide_number: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Young Serif', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                label: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Young Serif', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                tag: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Young Serif', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                title: {
                    enabled: true,
                    x: 108,
                    y: 356,
                    width: 864,
                    height: 600,
                    fontFamily: 'Young Serif',
                    fontSize: 120,
                    fontWeight: 700,
                    color: '#dedede',
                    textAlign: 'left',
                    verticalAlign: 'middle',
                    lineHeight: 1.05,
                    letterSpacing: -2,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 48,
                    maxLines: 4,
                    zIndex: 9,

                    emphasisStyle: {
                        fontWeight: 700,
                        color: '#dedede',
                    },
                },

                body: {
                    enabled: false,
                    x: 108,
                    y: 750,
                    width: 864,
                    height: 400,
                    fontFamily: 'Inter',
                    fontSize: 40,
                    fontWeight: 400,
                    color: '#FFFFFF',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    lineHeight: 1.4,
                    letterSpacing: 0,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 24,
                    maxLines: 8,
                    zIndex: 8
                },

                cta_text: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Young Serif', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                }
            }
        },

        cta: {
            background: {
                type: 'solid',
                colorVar: '#303030'
            },

            text_slots: {
                slide_number: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Young Serif', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                label: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Young Serif', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                tag: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Young Serif', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                },

                title: {
                    enabled: true,
                    x: 108,
                    y: 344,
                    width: 864,
                    height: 400,
                    fontFamily: 'Young Serif',
                    fontSize: 100,
                    fontWeight: 700,
                    color: '#dedede',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 1.05,
                    letterSpacing: -2,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 48,
                    maxLines: 4,
                    zIndex: 9,

                    emphasisStyle: {
                        fontWeight: 700,
                        color: '#dedede',
                    },
                },

                body: {
                    enabled: true,
                    x: 108,
                    y: 814,
                    width: 864,
                    height: 300,
                    fontFamily: 'Young Serif',
                    fontSize: 50,
                    fontWeight: 400,
                    color: '#dedede',
                    textAlign: 'center',
                    verticalAlign: 'top',
                    lineHeight: 1.4,
                    letterSpacing: 0,
                    textTransform: 'none',
                    autoFit: true,
                    minFontSize: 24,
                    maxLines: 8,
                    zIndex: 8,

                    emphasisStyle: {
                        fontWeight: 700,
                        color: '#dedede',
                    },
                },

                cta_text: {
                    enabled: false,
                    x: 0, y: 0, width: 0, height: 0,
                    fontFamily: 'Young Serif', fontSize: 16, fontWeight: 400, color: '#000',
                    textAlign: 'left', verticalAlign: 'top', lineHeight: 1,
                    letterSpacing: 0, textTransform: 'none', zIndex: 0
                }
            }
        }
    }
};
