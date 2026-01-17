import { generateCarousel } from '@/lib/anthropic';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { canCreateCarousel } from '@/lib/subscriptions';

/**
 * API Route para generar carruseles con IA
 * POST /api/generate
 * 
 * Body:
 * {
 *   "prompt": "tema del carrusel",
 *   "slideCount": 5 | 7 | 10
 * }
 * 
 * Los errores devuelven un errorCode que el cliente traduce
 */
export async function POST(request: Request) {
    try {
        // Parsear body
        const body = await request.json();
        const { prompt, slideCount } = body;

        // Validar inputs
        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json(
                { errorCode: 'PROMPT_REQUIRED' },
                { status: 400 }
            );
        }

        if (!slideCount || ![5, 7, 10].includes(slideCount)) {
            return NextResponse.json(
                { errorCode: 'INVALID_SLIDE_COUNT' },
                { status: 400 }
            );
        }

        // Validar que el prompt no esté vacío
        if (prompt.trim().length === 0) {
            return NextResponse.json(
                { errorCode: 'PROMPT_EMPTY' },
                { status: 400 }
            );
        }

        // Validar longitud del prompt
        if (prompt.length > 500) {
            return NextResponse.json(
                { errorCode: 'PROMPT_TOO_LONG' },
                { status: 400 }
            );
        }

        // Verificar que la API key esté configurada
        if (!process.env.ANTHROPIC_API_KEY) {
            return NextResponse.json(
                { errorCode: 'API_KEY_ERROR' },
                { status: 500 }
            );
        }

        // Obtener usuario actual
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { errorCode: 'AUTH_REQUIRED' },
                { status: 401 }
            );
        }

        // Verificar límites de la suscripción
        const limitCheck = await canCreateCarousel(user.id);

        if (!limitCheck.allowed) {
            return NextResponse.json(
                {
                    errorCode: 'LIMIT_REACHED',
                    limit: limitCheck.limit,
                    currentCount: limitCheck.currentCount,
                    requiresUpgrade: limitCheck.requiresUpgrade
                },
                { status: 403 }
            );
        }

        // Generar carrusel
        const slides = await generateCarousel(prompt, slideCount);

        // Guardar registro del carrusel creado
        const { error: insertError } = await supabase.from('carousels').insert({
            user_id: user.id,
            title: slides[0]?.title || prompt.substring(0, 100),
            slide_count: slideCount,
        });

        if (insertError) {
            console.error('Error saving carousel record:', insertError);
            // No bloqueamos la respuesta, solo logueamos el error
        }

        // Retornar slides
        return NextResponse.json({ slides }, { status: 200 });
    } catch (error: any) {
        console.error('Error en /api/generate:', error);

        // Detectar rate limit
        if (error.status === 429 || error.message?.includes('rate')) {
            return NextResponse.json(
                { errorCode: 'RATE_LIMIT' },
                { status: 429 }
            );
        }

        // Error genérico
        return NextResponse.json(
            { errorCode: 'GENERIC_ERROR' },
            { status: 500 }
        );
    }
}
