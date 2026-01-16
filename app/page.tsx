import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootPage() {
    // Detectar idioma del navegador
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language') || '';

    // Detectar si el navegador prefiere español
    const preferES = acceptLanguage.toLowerCase().includes('es');

    // Redirigir al idioma detectado
    redirect(preferES ? '/es' : '/en');
}
