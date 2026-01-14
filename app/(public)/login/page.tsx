import LoginForm from '@/components/features/auth/LoginForm';
import Logo from '@/components/ui/Logo';

/**
 * Página de login principal
 * Ruta: /login
 */
export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <Logo size={64} className="flex-col !gap-4" />
                    <p className="text-gray-600 mt-2">Crea carruseles increíbles con IA</p>
                </div>

                <LoginForm />

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Al continuar, aceptas nuestros términos y condiciones</p>
                </div>
            </div>
        </div>
    );
}
