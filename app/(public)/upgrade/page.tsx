import { Metadata } from 'next';
import UpgradeButton from '@/components/UpgradeButton';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Upgrade to Pro - Simply Carousel',
    description: 'Obtén acceso ilimitado a todos los templates y features profesionales',
};

export default function UpgradePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900 dark:text-white">
                        Desbloquea todo el potencial
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Crea hasta 30 carruseles profesionales cada mes
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Free Plan */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Free</h3>
                            <p className="text-gray-600 dark:text-gray-400">Para probar</p>
                            <div className="mt-4">
                                <span className="text-4xl font-black text-gray-900 dark:text-white">$0</span>
                                <span className="text-gray-600 dark:text-gray-400">/mes</span>
                            </div>
                        </div>

                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">3 carruseles por mes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">Templates básicos</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">Exportación en PNG</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-500 dark:text-gray-500">
                                    Con marca de agua
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative bg-gradient-to-br from-gray-900 to-black dark:from-gray-950 dark:to-gray-900 rounded-2xl p-8 border-2 border-purple-500">
                        {/* Badge */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            ⭐ Recomendado
                        </div>

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                            <p className="text-gray-300">Para creadores serios</p>
                            <div className="mt-4">
                                <span className="text-4xl font-black text-white">$5.99</span>
                                <span className="text-gray-300">/mes</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-100">30 carruseles por mes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-100">Todos los templates</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-100">Exportación en PNG</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-100 font-semibold">Sin marca de agua</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-100 font-semibold">Soporte prioritario</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-100 font-semibold">Nuevos features primero</span>
                            </li>
                        </ul>

                        <UpgradeButton
                            source="upgrade_page"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-all shadow-2xl"
                        >
                            Upgrade a Pro
                        </UpgradeButton>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>💳 Sin tarjeta de crédito requerida para Free</p>
                    <p className="mt-2">🔒 Pago seguro procesado por Systeme.io</p>
                    <p className="mt-2">✨ Cancela cuando quieras, sin preguntas</p>
                </div>
            </div>
        </div>
    );
}
