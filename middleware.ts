import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware para proteger rutas autenticadas
 * 
 * Rutas públicas (no requieren auth):
 * - / (landing)
 * - /pricing
 * - /login
 * 
 * Rutas protegidas (requieren auth):
 * - /generator
 * - /editor
 * - /preview
 * - /auth/*
 */
export async function middleware(req: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: req.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return req.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: CookieOptions) {
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                },
            },
        }
    );

    // Obtener sesión del usuario
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Rutas protegidas que requieren autenticación
    const protectedRoutes = ['/generator', '/editor', '/preview', '/auth'];
    const isProtectedRoute = protectedRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
    );

    // Si el usuario no está autenticado y está intentando acceder a una ruta protegida
    if (!session && isProtectedRoute) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/login';
        return NextResponse.redirect(redirectUrl);
    }

    // Si el usuario está autenticado y está en /login o /, redirigir al generator
    if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/')) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/generator';
        return NextResponse.redirect(redirectUrl);
    }

    return response;
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
