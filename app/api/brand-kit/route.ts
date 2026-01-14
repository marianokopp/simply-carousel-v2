import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * GET /api/brand-kit
 * Obtiene el brand kit del usuario actual
 */
export async function GET() {
    try {
        const supabase = await createClient();

        // Obtener usuario actual
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'No autorizado' },
                { status: 401 }
            );
        }

        // Buscar brand kit del usuario
        const { data: brandKit, error: dbError } = await supabase
            .from('brand_kits')
            .select('*')
            .eq('user_id', user.id)
            .single();

        // Si no existe, devolver valores por defecto
        if (dbError && dbError.code === 'PGRST116') {
            return NextResponse.json({
                show_logo: false,
                show_author: false,
                show_website: false,
                primary_color: '#607AFB',
                secondary_color: '#10B981',
            });
        }

        if (dbError) {
            console.error('Error fetching brand kit:', dbError);
            return NextResponse.json(
                { error: 'Error al obtener brand kit' },
                { status: 500 }
            );
        }

        // Devolver brand kit (sin id, user_id, created_at, updated_at)
        return NextResponse.json({
            logo_url: brandKit.logo_url,
            show_logo: brandKit.show_logo,
            author_handle: brandKit.author_handle,
            show_author: brandKit.show_author,
            website: brandKit.website,
            show_website: brandKit.show_website,
            primary_color: brandKit.primary_color,
            secondary_color: brandKit.secondary_color,
        });
    } catch (error) {
        console.error('Error en GET /api/brand-kit:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/brand-kit
 * Guarda o actualiza el brand kit del usuario
 * Sobreescribe siempre (último usado)
 */
export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        // Obtener usuario actual
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'No autorizado' },
                { status: 401 }
            );
        }

        // Parsear body
        const body = await request.json();

        // Preparar datos para guardar
        const brandKitData = {
            user_id: user.id,
            logo_url: body.logo_url || null,
            show_logo: body.show_logo || false,
            author_handle: body.author_handle || null,
            show_author: body.show_author || false,
            website: body.website || null,
            show_website: body.show_website || false,
            primary_color: body.primary_color || '#607AFB',
            secondary_color: body.secondary_color || '#10B981',
            updated_at: new Date().toISOString(),
        };

        // Intentar actualizar primero (upsert)
        const { data, error } = await supabase
            .from('brand_kits')
            .upsert(brandKitData, {
                onConflict: 'user_id',
                ignoreDuplicates: false,
            })
            .select()
            .single();

        if (error) {
            console.error('Error saving brand kit:', error);
            return NextResponse.json(
                { error: 'Error al guardar brand kit' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error en POST /api/brand-kit:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
