import type { Metadata } from "next";
import { Inter, Poppins, Young_Serif, Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700", "800"],
});

const youngSerif = Young_Serif({
    subsets: ["latin"],
    variable: "--font-young-serif",
    weight: ["400"],
});

const bricolageGrotesque = Bricolage_Grotesque({
    subsets: ["latin"],
    variable: "--font-bricolage-grotesque",
    weight: ["400", "600", "700"],
});

const instrumentSans = Instrument_Sans({
    subsets: ["latin"],
    variable: "--font-instrument-sans",
    weight: ["400"],
});

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params: { locale }
}: {
    params: { locale: string }
}): Promise<Metadata> {
    // Metadata específica por idioma
    const titles = {
        es: 'Simply Carousel - Crea carruseles virales con IA',
        en: 'Simply Carousel - Create viral carousels with AI'
    };

    const descriptions = {
        es: 'Genera carruseles profesionales para Instagram y LinkedIn en menos de 3 minutos usando Inteligencia Artificial',
        en: 'Generate professional carousels for Instagram and LinkedIn in less than 3 minutes using Artificial Intelligence'
    };

    return {
        title: titles[locale as keyof typeof titles] || titles.es,
        description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'es': '/es',
                'en': '/en',
            }
        }
    };
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Validar que el locale es válido
    if (!locales.includes(locale as any)) {
        notFound();
    }

    // Cargar mensajes para este locale
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${inter.variable} ${poppins.variable} ${youngSerif.variable} ${bricolageGrotesque.variable} ${instrumentSans.variable} font-sans antialiased`}
                suppressHydrationWarning
            >
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
