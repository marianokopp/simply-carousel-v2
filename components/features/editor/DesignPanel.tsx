'use client';

import { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import BrandKitControls from './BrandKitControls';

/**
 * Panel de diseño con tabs
 * Por ahora solo tiene tab "Design", pero preparado para expandir
 */
export default function DesignPanel() {
    const [activeTab, setActiveTab] = useState<'design'>('design');

    return (
        <div className="h-full flex flex-col bg-white border-l border-gray-200">
            {/* Header con tabs */}
            <div className="border-b border-gray-200">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab('design')}
                        className={`
              flex-1 px-4 py-3 text-sm font-medium transition-colors
              ${activeTab === 'design'
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                            }
            `}
                    >
                        Diseño
                    </button>
                    {/* Espacio para más tabs en el futuro */}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {activeTab === 'design' && (
                    <>
                        {/* Template Selector */}
                        <div>
                            <TemplateSelector />
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100"></div>

                        {/* Brand Kit Controls */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                Kit de Marca
                            </h3>
                            <BrandKitControls />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
