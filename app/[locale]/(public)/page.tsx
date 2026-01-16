import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Pricing from '@/components/landing/Pricing';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

/**
 * Landing Page Principal
 * 
 * Mensaje central: "Crea carruseles profesionales en menos de 3 minutos"
 * Enfocado en pain points de profesionales que no saben diseñar
 */
export default function LandingPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-16">
                <Hero />
                <Features />
                <HowItWorks />
                <Pricing />
                <CTASection />
                <Footer />
            </div>
        </main>
    );
}
