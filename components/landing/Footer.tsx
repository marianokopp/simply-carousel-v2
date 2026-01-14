import Link from 'next/link';
import Logo from '@/components/ui/Logo';

/**
 * Footer con links a Producto, Legal, y Social
 */
export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 py-16">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-2 space-y-6">
                        <Link href="/">
                            <Logo size={28} />
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                            La herramienta definitiva para profesionales que quieren crear carruseles profesionales sin saber diseñar.
                        </p>
                    </div>

                    {/* Producto */}
                    <div>
                        <h5 className="font-bold mb-6 text-gray-900 dark:text-white">Producto</h5>
                        <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm">
                            <li>
                                <a className="hover:text-primary transition-colors" href="#features">
                                    Características
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#how-it-works">
                                    Cómo funciona
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#pricing">
                                    Precios
                                </a>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h5 className="font-bold mb-6 text-gray-900 dark:text-white">Legal</h5>
                        <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm">
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    Privacidad
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    Términos
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    Cookies
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
                    <p>© 2026 Simply Carousel. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-primary transition-colors" href="#">
                            Twitter
                        </a>
                        <a className="hover:text-primary transition-colors" href="#">
                            LinkedIn
                        </a>
                        <a className="hover:text-primary transition-colors" href="#">
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
