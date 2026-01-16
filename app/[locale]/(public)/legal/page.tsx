import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Términos y Condiciones - Simply Carousel',
    description: 'Términos y condiciones de uso de Simply Carousel',
};

export default function LegalPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="text-primary hover:underline mb-4 inline-block"
                    >
                        ← Volver al inicio
                    </Link>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                        Términos y Condiciones
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Última actualización: Enero 13, 2026
                    </p>
                </div>

                {/* Content - Renderizado desde Markdown */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="lead">
                        Al usar Simply Carousel, aceptas estos términos. Si no estás de acuerdo, no uses el servicio.
                    </p>

                    <hr />

                    <h2 id="1-descripcion-del-servicio">1. Descripción del Servicio</h2>
                    <p>
                        Simply Carousel es una herramienta de generación de carruseles para redes sociales impulsada por inteligencia artificial. Ofrecemos un plan gratuito limitado y un plan de suscripción mensual paga (Pro).
                    </p>

                    <p><strong>Planes disponibles:</strong></p>
                    <ul>
                        <li><strong>Free</strong>: 3 carruseles por mes, templates básicos, marca de agua incluida</li>
                        <li><strong>Pro</strong>: $5.99 USD/mes, 30 carruseles por mes, todos los templates, sin marca de agua</li>
                    </ul>

                    <hr />

                    <h2 id="2-aceptacion-de-terminos">2. Aceptación de Términos</h2>
                    <p>Al crear una cuenta, suscribirte al plan Pro, o usar cualquier funcionalidad del servicio, confirmas que:</p>
                    <ol>
                        <li>Tienes al menos 18 años de edad</li>
                        <li>Proporcionas información verdadera y precisa</li>
                        <li>Aceptas estos términos en su totalidad</li>
                        <li>Cumplirás con todas las leyes aplicables</li>
                    </ol>

                    <hr />

                    <h2 id="3-cuenta-de-usuario">3. Cuenta de Usuario</h2>

                    <h3>Tu responsabilidad:</h3>
                    <ul>
                        <li>Mantener tu contraseña segura</li>
                        <li>No compartir tu cuenta con terceros</li>
                        <li>Notificar inmediatamente cualquier uso no autorizado</li>
                    </ul>

                    <h3>Nos reservamos el derecho de:</h3>
                    <ul>
                        <li>Suspender o eliminar tu cuenta si violas estos términos</li>
                        <li>Modificar o discontinuar el servicio en cualquier momento</li>
                    </ul>

                    <hr />

                    <h2 id="4-pagos-y-facturacion">4. Pagos y Facturación (Plan Pro)</h2>

                    <h3>4.1 Suscripción Mensual</h3>
                    <ul>
                        <li>La suscripción Pro cuesta <strong>$5.99 USD por mes</strong></li>
                        <li>Los pagos se procesan automáticamente cada mes vía Systeme.io</li>
                        <li>No hay contratos a largo plazo - puedes cancelar en cualquier momento</li>
                        <li>Los cargos son <strong>NO REEMBOLSABLES</strong> (ver sección 4.3)</li>
                    </ul>

                    <h3>4.2 Cancelación</h3>
                    <ul>
                        <li>Puedes cancelar tu suscripción en cualquier momento desde tu panel de Systeme.io</li>
                        <li>La cancelación es <strong>efectiva al final del período de facturación actual</strong></li>
                        <li>Después de cancelar, seguirás teniendo acceso Pro hasta el fin del mes pagado</li>
                        <li>No habrá cargos adicionales después de la cancelación</li>
                    </ul>

                    <h3>4.3 Política de NO REEMBOLSO</h3>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-4">
                        <p className="font-bold">IMPORTANTE: No ofrecemos reembolsos bajo ninguna circunstancia.</p>
                    </div>

                    <p>Razones:</p>
                    <ul>
                        <li>El costo mensual es mínimo ($5.99 USD)</li>
                        <li>Puedes cancelar en cualquier momento sin penalización</li>
                        <li>El servicio se proporciona de forma inmediata tras el pago</li>
                        <li>Ofrecemos un plan gratuito para probar antes de suscribirte</li>
                    </ul>

                    <p className="font-semibold">
                        Al suscribirte, reconoces y aceptas que todos los pagos son finales y no reembolsables.
                    </p>

                    <hr />

                    <h2 id="5-limites-de-uso">5. Límites de Uso</h2>

                    <h3>Plan Free:</h3>
                    <ul>
                        <li>Máximo 3 carruseles por mes calendario</li>
                        <li>Acceso a templates básicos únicamente</li>
                        <li>Marca de agua "Simply Carousel" en exportaciones</li>
                    </ul>

                    <h3>Plan Pro:</h3>
                    <ul>
                        <li>Máximo 30 carruseles por mes calendario</li>
                        <li>Acceso a todos los templates</li>
                        <li>Sin marca de agua</li>
                    </ul>

                    <h3>Importante:</h3>
                    <ul>
                        <li>Los límites se reinician el día 1 de cada mes</li>
                        <li>Los carruseles no utilizados NO se acumulan</li>
                        <li>Está prohibido crear múltiples cuentas para evadir límites</li>
                    </ul>

                    <hr />

                    <h2 id="contacto">Contacto</h2>
                    <p>Si tienes preguntas sobre estos términos:</p>
                    <p>
                        <strong>Email:</strong> soporte@simplycarousel.com<br />
                        <strong>Sitio web:</strong> https://simplycarousel.com
                    </p>

                    <hr />

                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 my-8">
                        <h3 className="text-xl font-bold mb-4">Resumen Ejecutivo</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            (no es legal, solo para claridad)
                        </p>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">✅ Lo que puedes hacer:</h4>
                                <ul className="text-sm space-y-1">
                                    <li>Usar Simply Carousel para crear carruseles</li>
                                    <li>Cancelar tu suscripción en cualquier momento</li>
                                    <li>Usar el contenido generado comercialmente</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">❌ Lo que NO puedes hacer:</h4>
                                <ul className="text-sm space-y-1">
                                    <li>Pedir reembolsos (todos los pagos son finales)</li>
                                    <li>Crear contenido ilegal o que viole derechos de terceros</li>
                                    <li>Revender o copiar nuestro servicio</li>
                                    <li>Remover la marca de agua del plan Free</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">⚠️ Importante recordar:</h4>
                                <ul className="text-sm space-y-1">
                                    <li>El servicio se proporciona "tal cual" sin garantías absolutas</li>
                                    <li>Nuestra responsabilidad máxima es de $17.97 USD (3 meses de Pro)</li>
                                    <li>Puedes eliminar tu cuenta y datos en cualquier momento</li>
                                    <li>Los precios pueden cambiar con aviso de 30 días</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <p className="text-center font-semibold">
                        Al usar Simply Carousel, confirmas que has leído, entendido y aceptado estos términos en su totalidad.
                    </p>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        <em>Versión 1.0 - Enero 2026</em>
                    </p>
                </div>
            </div>
        </div>
    );
}
