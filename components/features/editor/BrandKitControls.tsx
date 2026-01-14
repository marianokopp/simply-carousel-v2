'use client';

import { useCarouselStore } from '@/store/useCarouselStore';

/**
 * Controles del Brand Kit
 * Permite configurar autor y colores del carrusel
 */
export default function BrandKitControls() {
    const brandKit = useCarouselStore((state) => state.brandKit);
    const setBrandKit = useCarouselStore((state) => state.setBrandKit);

    return (
        <div className="space-y-6">
            {/* Author Handle */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-700">
                        Autor
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={brandKit.show_author}
                            onChange={(e) => setBrandKit({ show_author: e.target.checked })}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {brandKit.show_author && (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">@</span>
                        <input
                            type="text"
                            value={brandKit.author_handle || ''}
                            onChange={(e) => setBrandKit({ author_handle: e.target.value })}
                            placeholder="tu_usuario"
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Website */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-700">
                        Sitio Web
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={brandKit.show_website}
                            onChange={(e) => setBrandKit({ show_website: e.target.checked })}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {brandKit.show_website && (
                    <input
                        type="text"
                        value={brandKit.website || ''}
                        onChange={(e) => setBrandKit({ website: e.target.value })}
                        placeholder="tuempresa.com"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Colors */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Colores
                </label>

                <div className="space-y-3">
                    {/* Primary Color */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Color principal</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={brandKit.primary_color}
                                onChange={(e) => setBrandKit({ primary_color: e.target.value })}
                                className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={brandKit.primary_color}
                                onChange={(e) => {
                                    // Validar que sea un hex válido
                                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                                        setBrandKit({ primary_color: e.target.value });
                                    }
                                }}
                                className="w-24 px-2 py-1 border border-gray-200 rounded text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength={7}
                            />
                        </div>
                    </div>

                    {/* Secondary Color */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Color secundario</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={brandKit.secondary_color}
                                onChange={(e) => setBrandKit({ secondary_color: e.target.value })}
                                className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={brandKit.secondary_color}
                                onChange={(e) => {
                                    // Validar que sea un hex válido
                                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                                        setBrandKit({ secondary_color: e.target.value });
                                    }
                                }}
                                className="w-24 px-2 py-1 border border-gray-200 rounded text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength={7}
                            />
                        </div>
                    </div>
                </div>

                {/* Color tip */}
                <p className="mt-3 text-xs text-gray-500">
                    Los colores se aplican según el template seleccionado
                </p>
            </div>
        </div>
    );
}
