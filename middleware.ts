import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

// Crear middleware de i18n
const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always' // Siempre incluir el locale en la URL
});

/**
 * Middleware combinado para:
 * 1. Internacionalización (i18n)
 * 2. Protección de rutas autenticadas
 * 
 * Rutas públicas (no requieren auth):
 * - /[locale] (landing)
 * - /[locale]/pricing
 * - /[locale]/login
 * 
 * Rutas protegidas (requieren auth):
 * - /[locale]/generator
 * - /[locale]/editor
 * - /[locale]/preview
 * - /[locale]/auth/*
 */
export async function middleware(req: NextRequest) {
    // PASO 1: Aplicar i18n middleware primero
    const intlResponse = intlMiddleware(req);

    // Si i18n middleware quiere redirigir (ej: /login -> /es/login), hacerlo
    if (intlResponse && intlResponse.status !== 200) {
        return intlResponse;
    }

    // PASO 2: Crear response con headers de i18n
    let response = intlResponse || NextResponse.next({
        request: {
            headers: req.headers,
        },
    });

    // PASO 3: Verificar autenticación
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

    // Extraer locale del pathname (formato: /es/generator)
    const pathnameLocale = req.nextUrl.pathname.split('/')[1];
    const pathnameWithoutLocale = req.nextUrl.pathname.replace(`/${pathnameLocale}`, '') || '/';

    // Rutas protegidas que requieren autenticación (sin el locale)
    const protectedRoutes = ['/generator', '/editor', '/preview', '/auth'];
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathnameWithoutLocale.startsWith(route)
    );

    // Si el usuario no está autenticado y está intentando acceder a una ruta protegida
    if (!session && isProtectedRoute) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = `/${pathnameLocale}/login`;
        return NextResponse.redirect(redirectUrl);
    }

    // Si el usuario está autenticado y está en /login o /[locale], redirigir al generator
    if (session && (pathnameWithoutLocale === '/login' || pathnameWithoutLocale === '/')) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = `/${pathnameLocale}/generator`;
        return NextResponse.redirect(redirectUrl);
    }

    return response;
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder (images, etc.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
