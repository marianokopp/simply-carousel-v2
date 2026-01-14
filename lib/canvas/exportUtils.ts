import JSZip from 'jszip';

/**
 * Exporta un canvas a PNG como Data URL
 * 
 * @param canvas - Canvas a exportar
 * @param quality - Calidad de la imagen (0-1), default 0.95
 * @returns Data URL del PNG
 */
export function exportCanvasToPNG(
    canvas: HTMLCanvasElement,
    quality: number = 0.95
): string {
    return canvas.toDataURL('image/png', quality);
}

/**
 * Convierte un Data URL a Blob
 */
export function dataURLtoBlob(dataURL: string): Blob {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}

/**
 * Crea un archivo ZIP con múltiples PNGs
 * 
 * @param canvases - Array de canvases a exportar
 * @param filename - Nombre base del archivo (default: "carousel")
 * @returns Blob del archivo ZIP
 */
export async function createZIPFromCanvases(
    canvases: HTMLCanvasElement[],
    filename: string = 'carousel'
): Promise<Blob> {
    const zip = new JSZip();

    // Agregar cada canvas al ZIP
    canvases.forEach((canvas, index) => {
        const slideNumber = (index + 1).toString().padStart(2, '0');
        const pngDataURL = exportCanvasToPNG(canvas);
        const pngBlob = dataURLtoBlob(pngDataURL);

        zip.file(`${filename}-slide-${slideNumber}.png`, pngBlob);
    });

    // Generar ZIP
    return await zip.generateAsync({ type: 'blob' });
}

/**
 * Descarga un Blob como archivo
 * 
 * @param blob - Blob a descargar
 * @param filename - Nombre del archivo
 */
export function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Liberar URL
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Descarga múltiples canvases como ZIP
 * 
 * @param canvases - Array de canvases
 * @param filename - Nombre base del archivo
 */
export async function downloadCanvasesAsZIP(
    canvases: HTMLCanvasElement[],
    filename: string = 'carousel'
): Promise<void> {
    const zipBlob = await createZIPFromCanvases(canvases, filename);
    downloadBlob(zipBlob, `${filename}.zip`);
}

/**
 * Descarga un solo canvas como PNG
 * 
 * @param canvas - Canvas a descargar
 * @param filename - Nombre del archivo
 */
export function downloadCanvasAsPNG(
    canvas: HTMLCanvasElement,
    filename: string = 'slide'
): void {
    const pngDataURL = exportCanvasToPNG(canvas);
    const link = document.createElement('a');
    link.href = pngDataURL;
    link.download = `${filename}.png`;
    link.click();
}
