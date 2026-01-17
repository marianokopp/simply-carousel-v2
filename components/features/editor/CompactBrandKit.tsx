'use client';

import { useCarouselStore } from '@/store/useCarouselStore';

/**
 * Brand Kit compacto sin título para sidebar derecho  
 */
export default function CompactBrandKit() {
    const brandKit = useCarouselStore((state) => state.brandKit);
    const setBrandKit = useCarouselStore((state) => state.setBrandKit);

    return (
        <div className="flex-1 overflow-y-auto p-4 bg-white">
            <div className="space-y-4">
                {/* Author toggle */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">Autor</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={brandKit.show_author}
                            onChange={(e) => setBrandKit({ show_author: e.target.checked })}
                            className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {/* Author handle input */}
                {brandKit.show_author && (
                    <div>
                        <input
                            type="text"
                            value={brandKit.author_handle || ''}
                            onChange={(e) => setBrandKit({ author_handle: e.target.value })}
                            placeholder="@tuusuario"
                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                {/* Website toggle */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">Website</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={brandKit.show_website}
                            onChange={(e) => setBrandKit({ show_website: e.target.checked })}
                            className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {/* Website input */}
                {brandKit.show_website && (
                    <div>
                        <input
                            type="text"
                            value={brandKit.website || ''}
                            onChange={(e) => setBrandKit({ website: e.target.value })}
                            placeholder="tuweb.com"
                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                {/* Colors */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                        Colores
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {/* Primary color */}
                        <div>
                            <label className="block text-[10px] text-gray-500 mb-1">Primario</label>
                            <input
                                type="color"
                                value={brandKit.primary_color}
                                onChange={(e) => setBrandKit({ primary_color: e.target.value })}
                                className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                            />
                        </div>

                        {/* Secondary color */}
                        <div>
                            <label className="block text-[10px] text-gray-500 mb-1">Secundario</label>
                            <input
                                type="color"
                                value={brandKit.secondary_color}
                                onChange={(e) => setBrandKit({ secondary_color: e.target.value })}
                                className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
