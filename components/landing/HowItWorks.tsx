/**
 * How It Works section - Proceso en 3 pasos
 */
export default function HowItWorks() {
    const steps = [
        {
            number: '1',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            ),
            title: 'Escribe tu tema',
            description: 'Solo escribe de qué quieres hablar. Por ejemplo: "5 estrategias de marketing digital" o "Cómo mejorar tu productividad". La IA hace el resto.',
        },
        {
            number: '2',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            title: 'La IA genera tu carrusel',
            description: 'En segundos, la IA crea el diseño, redacta el copy, y estructura todo el carrusel. Puedes personalizar colores y fuentes si quieres, pero no es necesario.',
        },
        {
            number: '3',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            ),
            title: 'Exporta y publica',
            description: 'Descarga tu carrusel optimizado en formato PNG. Está listo para publicar y empezar a conseguir engagement.',
        },
    ];

    return (
        <section id="how-it-works" className="bg-white dark:bg-background-dark py-24">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm">El proceso</h2>
                    <h3 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                        Tres simples pasos al éxito
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 max-w-[600px] mx-auto">
                        Nuestra IA se encarga del diseño técnico para que tú te concentres en la estrategia de contenido.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative group p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-accent-green/30 hover:shadow-xl hover:shadow-accent-green/5 transition-all duration-300"
                        >
                            {/* Step Number Badge */}
                            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-black shadow-lg">
                                {step.number}
                            </div>

                            <div className="w-14 h-14 rounded-xl bg-accent-green/10 text-accent-green flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {step.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
