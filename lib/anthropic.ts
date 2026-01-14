import Anthropic from '@anthropic-ai/sdk';
import type { SlideContent, GeneratedContent } from '@/types';
import { generatedContentToSlides } from './contentMapper';

/**
 * Cliente configurado de Anthropic
 */
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Genera un carrusel completo usando Claude API
 * 
 * @param prompt - Tema o descripción del carrusel
 * @param slideCount - Cantidad de slides (5, 7 o 10)
 * @returns Array de slides generados
 */
export async function generateCarousel(
    prompt: string,
    slideCount: number
): Promise<SlideContent[]> {
    // Validar slideCount
    if (![5, 7, 10].includes(slideCount)) {
        throw new Error('slideCount debe ser 5, 7 o 10');
    }

    // Generar contenido estructurado
    const generatedContent = await generateContent(prompt, slideCount);

    // Convertir a formato de UI (backward compatibility)
    return generatedContentToSlides(generatedContent);
}

/**
 * Genera contenido estructurado usando Claude API
 * Esta es la nueva función core que genera GeneratedContent
 */
async function generateContent(
    prompt: string,
    slideCount: number
): Promise<GeneratedContent> {
    // Calcular cantidad de slides body (sin contar hook y cta)
    const bodySlideCount = slideCount - 2;

    const systemPrompt = `Eres un experto en crear carruseles de Instagram altamente efectivos y virales.
Tu trabajo es generar el contenido para un carrusel de ${slideCount} slides sobre el tema que te proporcionen.

REGLAS ESTRICTAS:
1. El primer slide (hook) debe captar la atención inmediatamente
2. Los slides intermedios (body) deben desarrollar el tema con puntos específicos
3. El último slide (cta) debe tener una llamada a la acción clara
4. Usa texto corto y directo - máximo 2-3 líneas por slide
5. **USA ÉNFASIS** con **palabra clave** para resaltar los conceptos más importantes (2-3 palabras por slide)
6. El hook puede tener un label opcional (categoría en MAYÚSCULAS, ej: "MARKETING", "PRODUCTIVIDAD")
7. Cada body slide debe tener un título corto (3-5 palabras) y contenido con **énfasis**
8. El CTA debe motivar a la acción (seguir, compartir, comentar, guardar)

FORMATO TONAL:
- Conversacional pero profesional
- Usa "tú" para conectar con la audiencia
- Evita jerga técnica innecesaria

PALABRAS CLAVE DE IMPACTO: transformar, potenciar, escalar, dominar, revolucionar, desbloquear, hack, secreto, estrategia

RESPONDE EXCLUSIVAMENTE EN ESPAÑOL LATINOAMERICANO NEUTRO.

IMPORTANTE: 
- Usa **énfasis** en las palabras MÁS IMPORTANTES de cada slide
- Cada slide body debe ser autocontenido y entendible sin contexto previo
- El título del body debe ser conciso (ej: "Define tu audiencia", "Crea contenido valioso")

RESPONDE ÚNICAMENTE CON UN JSON VÁLIDO con esta estructura exacta:
{
  "hook": {
    "label": "CATEGORÍA OPCIONAL EN MAYÚSCULAS",
    "title": "Título impactante con **énfasis** en palabras clave"
  },
  "body": [
    {
      "title": "Título corto del punto",
      "content": "Contenido breve con **énfasis** en conceptos importantes"
    }
    // ... ${bodySlideCount} puntos en total
  ],
  "cta": {
    "title": "Título del llamado a la acción",
    "action": "Texto específico de acción (ej: Sígueme para más, Comparte si te sirvió)"
  }
}`;

    const userPrompt = `Tema: ${prompt}

Genera contenido relevante y valioso para la audiencia interesada en este tema.
Adapta el tono y estilo según corresponda al tema proporcionado.`;

    try {
        // Llamar a Claude API
        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 1500,
            temperature: 0.7,
            system: systemPrompt,
            messages: [
                {
                    role: 'user',
                    content: userPrompt,
                },
            ],
        });

        // Extraer el texto de la respuesta
        const responseText = message.content[0].type === 'text'
            ? message.content[0].text
            : '';

        // Parsear JSON (puede venir con markdown code blocks)
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No se encontró JSON válido en la respuesta');
        }

        const parsed = JSON.parse(jsonMatch[0]);

        // Validar estructura
        if (!parsed.hook || !parsed.body || !parsed.cta) {
            throw new Error('Respuesta no tiene estructura válida (falta hook, body o cta)');
        }

        if (!Array.isArray(parsed.body)) {
            throw new Error('Body debe ser un array');
        }

        // Validar cantidad de body slides
        if (parsed.body.length !== bodySlideCount) {
            throw new Error(`Se esperaban ${bodySlideCount} slides body, se recibieron ${parsed.body.length}`);
        }

        // Validar estructura de cada parte
        if (!parsed.hook.title) {
            throw new Error('Hook debe tener title');
        }

        if (!parsed.cta.title || !parsed.cta.action) {
            throw new Error('CTA debe tener title y action');
        }

        for (const bodySlide of parsed.body) {
            if (!bodySlide.title || !bodySlide.content) {
                throw new Error('Cada body slide debe tener title y content');
            }
        }

        return parsed as GeneratedContent;
    } catch (error: any) {
        // Mejorar mensajes de error
        if (error.status === 401) {
            throw new Error('API key de Anthropic inválida o faltante');
        }
        if (error.status === 429) {
            throw new Error('Límite de rate alcanzado. Intenta de nuevo en unos minutos.');
        }
        if (error.message?.includes('JSON')) {
            throw new Error('Error al parsear la respuesta de IA. Intenta de nuevo.');
        }

        throw error;
    }
}
