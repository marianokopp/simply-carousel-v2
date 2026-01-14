import React from 'react';

interface LogoProps {
    className?: string;
    size?: number;
    showText?: boolean;
}

/**
 * Componente de Logo reutilizable
 */
export default function Logo({ className = "", size = 32, showText = true }: LogoProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div style={{ width: size, height: size }}>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15" />
                        </filter>
                    </defs>

                    {/* Círculo exterior azul */}
                    <circle cx="100" cy="100" r="90" fill="none" stroke="#3B82F6" strokeWidth="6" />

                    {/* Grupo de tarjetas con sombra */}
                    <g filter="url(#shadow)">
                        {/* Tarjeta trasera (insinuada) */}
                        <rect x="110" y="65" width="50" height="70" rx="6" fill="#DBEAFE" opacity="0.6" />

                        {/* Tarjeta frontal principal con borde oscuro */}
                        <rect x="40" y="55" width="70" height="90" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />

                        {/* Área de imagen dentro de la tarjeta */}
                        <rect x="48" y="63" width="54" height="40" rx="4" fill="#EFF6FF" />

                        {/* Montañas/imagen icon */}
                        <path d="M 60 93 L 70 83 L 80 93 Z" fill="#3B82F6" />
                        <path d="M 75 93 L 85 83 L 95 93 Z" fill="#60A5FA" />

                        {/* Sol/círculo decorativo */}
                        <circle cx="88" cy="72" r="4" fill="#F59E0B" />

                        {/* Líneas de texto en negro */}
                        <rect x="48" y="110" width="40" height="3" rx="1.5" fill="#1E293B" />
                        <rect x="48" y="118" width="54" height="3" rx="1.5" fill="#1E293B" />
                        <rect x="48" y="126" width="30" height="3" rx="1.5" fill="#1E293B" />
                    </g>

                    {/* Indicadores de carrusel (puntos) */}
                    <circle cx="85" cy="160" r="3" fill="#3B82F6" />
                    <circle cx="100" cy="160" r="3" fill="#DBEAFE" />
                    <circle cx="115" cy="160" r="3" fill="#DBEAFE" />

                    {/* Flecha de deslizamiento */}
                    <path d="M 120 100 L 130 100 L 125 95 M 130 100 L 125 105"
                        stroke="#3B82F6"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.8" />
                </svg>
            </div>
            {showText && (
                <span className="text-xl font-black tracking-tight text-primary">
                    Simply Carousel
                </span>
            )}
        </div>
    );
}
