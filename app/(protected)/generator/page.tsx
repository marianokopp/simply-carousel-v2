import GeneratorForm from '@/components/features/generator/GeneratorForm';
import CarouselCounter from '@/components/CarouselCounter';
import UserAvatar from '@/components/UserAvatar';
import InactivityLogout from '@/components/InactivityLogout';

/**
 * Página del generador de carruseles con IA
 * Ruta: /generator
 * 
 * Esta página está protegida por el middleware de autenticación
 */
export default function GeneratorPage() {
    return (
        <>
            {/* Auto-logout por inactividad */}
            <InactivityLogout />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
                {/* Header: Logo + Avatar + Counter en la misma línea */}
                <div className="max-w-3xl mx-auto mb-8">
                    <div className="flex items-center justify-between">
                        {/* Logo izquierda */}
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Simply Carousel
                        </h2>

                        {/* Avatar + Counter derecha */}
                        <div className="flex items-center gap-3">
                            {/* Contador compacto */}
                            <div className="max-w-[200px]">
                                <CarouselCounter />
                            </div>
                            <UserAvatar />
                        </div>
                    </div>
                </div>

                {/* Título centrado más cerca del cuadro */}
                <div className="max-w-3xl mx-auto mb-16">
                    <div className="text-center">
                        <p className="text-gray-600 text-lg">Paso 1: Genera contenido con IA</p>
                    </div>
                </div>

                {/* Generator Form */}
                <GeneratorForm />

                {/* Footer indicator */}
                <div className="max-w-3xl mx-auto mt-12">
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-3">
                        Paso 1: Genera contenido con IA de 3: Generación
                    </p>
                </div>
            </div>
        </>
    );
}
