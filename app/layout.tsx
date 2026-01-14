import type { Metadata } from "next";
import { Inter, Poppins, Young_Serif, Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Simply Carousel - Crea carruseles virales con IA",
  description: "Genera carruseles profesionales para Instagram y LinkedIn en menos de 3 minutos usando Inteligencia Artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${youngSerif.variable} ${bricolageGrotesque.variable} ${instrumentSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
