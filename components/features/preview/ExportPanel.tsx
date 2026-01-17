'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCarouselStore } from '@/store/useCarouselStore';
import { getTemplateById } from '@/templates';
import { renderSlideToCanvas } from '@/lib/canvas/renderer';
import { useTranslations } from '@/lib/useTranslations';
import JSZip from 'jszip';

/**
 * Panel de exportación con botón de descarga
 */
export default function ExportPanel() {
    const t = useTranslations('preview');

    const router = useRouter();
    const slides = useCarouselStore((state) => state.slides);
    const templateId = useCarouselStore((state) => state.templateId);
    const brandKit = useCarouselStore((state) => state.brandKit);
    const reset = useCarouselStore((state) => state.reset);

    const [isExporting, setIsExporting] = useState(false);

    /**
     * Exporta todos los slides como ZIP
     */
    const handleDownloadZIP = async () => {
        setIsExporting(true);

        try {
            const template = getTemplateById(templateId);
            if (!template) throw new Error('Template not found');

            // Crear ZIP
            const zip = new JSZip();

            // Renderizar y agregar cada slide al ZIP
            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];

                // Renderizar slide (await async rendering)
                const canvas = await renderSlideToCanvas(
                    slide,
                    template,
                    brandKit,
                    i + 1,
                    slides.length
                );

                // Convertir a PNG blob
                const blob = await new Promise<Blob>((resolve) => {
                    canvas.toBlob((blob) => {
                        if (blob) resolve(blob);
                    }, 'image/png', 0.95);
                });

                // Agregar al ZIP con nombre carousel-slide-01.png, etc
                const fileName = `carousel-slide-${String(i + 1).padStart(2, '0')}.png`;
                zip.file(fileName, blob);
            }

            // Generar ZIP con MIME type explícito
            const zipBlob = await zip.generateAsync({
                type: 'blob',
                mimeType: 'application/zip'
            });

            // Descargar con extensión .zip garantizada
            let fileName = 'carousel-instagram.zip';
            if (!fileName.endsWith('.zip')) {
                fileName += '.zip';
            }

            // Crear blob URL con MIME type específico
            const url = URL.createObjectURL(new Blob([zipBlob], { type: 'application/zip' }));
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.setAttribute('type', 'application/zip');

            // Forzar descarga
            document.body.appendChild(link);
            link.click();

            // Cleanup con timeout para asegurar que la descarga comience
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 100);

        } catch (error) {
            console.error('Error exporting ZIP:', error);
            alert(t('exportError'));
        } finally {
            setIsExporting(false);
        }
    };

    /**
     * Descarga todas las imágenes PNG individualmente
     */
    const handleDownloadPNGs = async () => {
        setIsExporting(true);

        try {
            const template = getTemplateById(templateId);
            if (!template) throw new Error('Template not found');

            // Renderizar y descargar cada slide
            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];

                // Renderizar slide
                const canvas = await renderSlideToCanvas(
                    slide,
                    template,
                    brandKit,
                    i + 1,
                    slides.length
                );

                // Convertir a PNG blob
                const blob = await new Promise<Blob>((resolve) => {
                    canvas.toBlob((blob) => {
                        if (blob) resolve(blob);
                    }, 'image/png', 0.95);
                });

                // Descargar imagen individual
                const fileName = `carousel-slide-${String(i + 1).padStart(2, '0')}.png`;
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                // Pequeño delay entre descargas
                await new Promise(resolve => setTimeout(resolve, 300));
            }

        } catch (error) {
            console.error('Error exporting PNGs:', error);
            alert(t('exportPngsError'));
        } finally {
            setIsExporting(false);
        }
    };

    /**
     * Crear nuevo carrusel
     */
    const handleCreateAnother = () => {
        reset();
        router.push('/generator');
    };

    return (
        <div className="w-full h-full bg-white border-l border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    {t('title')}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                    {slides.length} {t('slides')} • 1080x1350px • PNG
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-6">
                {/* Download button */}
                <button
                    onClick={handleDownloadZIP}
                    disabled={isExporting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                    {isExporting ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            {t('exporting')}
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                            {t('downloadZip')}
                        </span>
                    )}
                </button>

                {/* Download PNGs button */}
                <button
                    onClick={handleDownloadPNGs}
                    disabled={isExporting}
                    className="w-full px-6 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {t('downloadPngs')}
                    </span>
                </button>

                {/* Info box */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">
                        {t('zipContents')}
                    </h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                        <li>• {slides.length} {t('files')}</li>
                        <li>• {t('resolution')}</li>
                        <li>• {t('naming')}</li>
                        <li>• {t('readyForInstagram')}</li>
                    </ul>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Secondary actions */}
                <div className="space-y-3">
                    <button
                        onClick={() => router.push('/editor')}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        {t('editCarousel')}
                    </button>

                    <button
                        onClick={handleCreateAnother}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        {t('createAnother')}
                    </button>
                </div>
            </div>
        </div>
    );
}
