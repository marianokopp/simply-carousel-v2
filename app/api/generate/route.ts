import { generateCarousel } from '@/lib/anthropic';
import { NextResponse } from 'next/server';

/**
 * API Route para generar carruseles con IA
 * POST /api/generate
 * 
 * Body:
 * {
 *   "prompt": "tema del carrusel",
 *   "slideCount": 5 | 7 | 10
 * }
 */
export async function POST(request: Request) {
    try {
        // Parsear body
        const body = await request.json();
        const { prompt, slideCount } = body;

        // Validar inputs
        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json(
                { error: 'El campo "prompt" es requerido y debe ser texto' },
                { status: 400 }
            );
        }

        if (!slideCount || ![5, 7, 10].includes(slideCount)) {
            return NextResponse.json(
                { error: 'El campo "slideCount" debe ser 5, 7 o 10' },
                { status: 400 }
            );
        }

        // Validar que el prompt no esté vacío
        if (prompt.trim().length === 0) {
            return NextResponse.json(
                { error: 'El prompt no puede estar vacío' },
                { status: 400 }
            );
        }

        // Validar longitud del prompt
        if (prompt.length > 500) {
            return NextResponse.json(
                { error: 'El prompt no puede exceder 500 caracteres' },
                { status: 400 }
            );
        }

        // Verificar que la API key esté configurada
        if (!process.env.ANTHROPIC_API_KEY) {
            return NextResponse.json(
                { error: 'API key de Anthropic no configurada en el servidor' },
                { status: 500 }
            );
        }

        // Generar carrusel
        const slides = await generateCarousel(prompt, slideCount);

        // Retornar slides
        return NextResponse.json({ slides }, { status: 200 });
    } catch (error: any) {
        console.error('Error en /api/generate:', error);

        // Retornar error con mensaje apropiado
        return NextResponse.json(
            {
                error: error.message || 'Error al generar el carrusel. Intenta de nuevo.'
            },
            { status: 500 }
        );
    }
}
