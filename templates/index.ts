import type { Template } from '@/types';
import { minimalUnderline } from './minimal-underline';
import { arrowMinimal } from './arrow-minimal';
import { boldGeometric } from './bold-geometric';
import { modernGradient } from './modern-gradient';
import { youngMinimal } from './young-minimal';
import { exampleMinimal } from './example-minimal';

/**
 * Todos los templates disponibles
 */
export const templates: Template[] = [
    minimalUnderline,
    arrowMinimal,
    boldGeometric,
    modernGradient,
    youngMinimal,
    exampleMinimal,
];

/**
 * Obtener template por ID
 */
export function getTemplateById(id: string): Template | undefined {
    return templates.find((t) => t.id === id);
}

/**
 * Obtener templates por categoría
 */
export function getTemplatesByCategory(
    category: 'minimal' | 'bold' | 'modern' | 'swiss' | 'playful'
): Template[] {
    return templates.filter((t) => t.metadata.category === category);
}

/**
 * Template por defecto
 */
export const defaultTemplate = minimalUnderline;

// Re-exports
export { minimalUnderline } from './minimal-underline';
export { arrowMinimal } from './arrow-minimal';
export { boldGeometric } from './bold-geometric';
export { modernGradient } from './modern-gradient';
export { youngMinimal } from './young-minimal';
export { exampleMinimal } from './example-minimal';
