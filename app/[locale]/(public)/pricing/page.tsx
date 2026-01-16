import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Pricing from '@/components/landing/Pricing';

/**
 * Página de Pricing dedicada
 * Muestra planes Free y Pro con más detalle
 */
export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-24">
                <Pricing />
                <Footer />
            </div>
        </main>
    );
}
