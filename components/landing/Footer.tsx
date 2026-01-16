'use client';

import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { useTranslations } from '@/lib/useTranslations';

/**
 * Footer con links a Producto, Legal, y Social
 */
export default function Footer() {
    const t = useTranslations('footer');

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
                            {t('tagline')}
                        </p>
                    </div>

                    {/* Producto */}
                    <div>
                        <h5 className="font-bold mb-6 text-gray-900 dark:text-white">{t('product')}</h5>
                        <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm">
                            <li>
                                <a className="hover:text-primary transition-colors" href="#features">
                                    {t('features')}
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#how-it-works">
                                    {t('howItWorks')}
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#pricing">
                                    {t('pricing')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h5 className="font-bold mb-6 text-gray-900 dark:text-white">{t('legal')}</h5>
                        <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm">
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    {t('privacy')}
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    {t('terms')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                    © {new Date().getFullYear()} Simply Carousel. {t('rights')}
                </div>
            </div>
        </footer>
    );
}
