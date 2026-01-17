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

    const systemPrompt = `You are an expert at creating highly effective and viral Instagram carousels.
Your job is to generate content for a ${slideCount} slide carousel about the topic provided.

STRICT RULES:
1. The first slide (hook) must immediately capture attention
2. The middle slides (body) must develop the topic with specific points
3. The last slide (cta) must have a clear call to action
4. Use short and direct text - maximum 2-3 lines per slide
5. **USE EMPHASIS** with **keyword** to highlight the most important concepts (2-3 words per slide)
6. The hook can have an optional label (category in UPPERCASE, e.g., "MARKETING", "PRODUCTIVITY")
7. Each body slide must have a short title (3-5 words) and content with **emphasis**
8. The CTA should motivate action (follow, share, comment, save)

TONAL FORMAT:
- Conversational but professional
- Use "you" to connect with the audience
- Avoid unnecessary technical jargon

IMPACT KEYWORDS: transform, empower, scale, master, revolutionize, unlock, hack, secret, strategy

LANGUAGE RULE: 
- **RESPOND IN THE SAME LANGUAGE AS THE USER'S PROMPT**
- If the user writes in Spanish, respond in neutral Latin American Spanish
- If the user writes in English, respond in English
- If the user writes in any other language, respond in that same language

IMPORTANT:
- Use **emphasis** on the MOST IMPORTANT words of each slide
- Each body slide must be self-contained and understandable without prior context
- The body title should be concise (e.g., "Define your audience", "Create valuable content")

RESPOND ONLY WITH A VALID JSON with this exact structure:
{
  "hook": {
    "label": "OPTIONAL UPPERCASE CATEGORY",
    "title": "Impactful title with **emphasis** on keywords"
  },
  "body": [
    {
      "title": "Short point title",
      "content": "Brief content with **emphasis** on important concepts"
    }
    // ... ${bodySlideCount} points total
  ],
  "cta": {
    "title": "Call to action title",
    "action": "Specific action text (e.g., Follow for more, Share if helpful)"
  }
}`;

    const userPrompt = `Topic: ${prompt}

Generate relevant and valuable content for the audience interested in this topic.
Adapt the tone and style according to the topic provided.
REMEMBER: Respond in the SAME LANGUAGE as this prompt.`;

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
