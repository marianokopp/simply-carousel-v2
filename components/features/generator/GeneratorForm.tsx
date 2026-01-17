'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCarouselStore } from '@/store/useCarouselStore';
import { useTranslations } from '@/lib/useTranslations';

/**
 * Componente de formulario para generar carruseles con IA
 */
export default function GeneratorForm() {
    const t = useTranslations('generator');

    const [prompt, setPrompt] = useState('');
    const [slideCount, setSlideCount] = useState<5 | 7 | 10>(7);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const setSlides = useCarouselStore((state) => state.setSlides);

    /**
     * Mapea códigos de error de la API a claves de traducción
     */
    const translateErrorCode = (errorCode: string): string => {
        const errorMap: Record<string, string> = {
            'AUTH_REQUIRED': t('errorAuth'),
            'PROMPT_REQUIRED': t('errorPromptRequired'),
            'PROMPT_EMPTY': t('errorPromptEmpty'),
            'PROMPT_TOO_LONG': t('errorPromptTooLong'),
            'INVALID_SLIDE_COUNT': t('errorSlideCount'),
            'API_KEY_ERROR': t('errorApiKey'),
            'LIMIT_REACHED': t('errorLimitReached'),
            'RATE_LIMIT': t('errorRateLimit'),
            'GENERIC_ERROR': t('errorGeneric'),
        };
        return errorMap[errorCode] || t('errorGeneric');
    };

    /**
     * Maneja el submit del formulario
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Validar prompt
            if (prompt.trim().length === 0) {
                throw new Error(t('errorEmpty'));
            }

            // Llamar a la API
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt.trim(),
                    slideCount,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Traducir código de error si existe
                const errorMessage = data.errorCode
                    ? translateErrorCode(data.errorCode)
                    : (data.error || t('errorGeneric'));
                throw new Error(errorMessage);
            }

            // Guardar slides en Zustand
            setSlides(data.slides);

            // Redirigir al editor
            router.push('/editor');
        } catch (err: any) {
            setError(err.message || t('errorGeneric'));
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Error message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Prompt textarea */}
                    <div>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={isLoading}
                            rows={4}
                            maxLength={500}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                            placeholder={t('promptPlaceholder')}
                        />
                        <div className="mt-2 flex justify-between items-center">
                            <p className="text-xs text-gray-500">
                                {t('promptHint')}
                            </p>
                            <p className="text-xs text-gray-400">
                                {prompt.length}/500
                            </p>
                        </div>
                    </div>

                    {/* Slide count selector */}
                    <div>
                        <div className="grid grid-cols-3 gap-3">
                            {([5, 7, 10] as const).map((count) => (
                                <button
                                    key={count}
                                    type="button"
                                    onClick={() => setSlideCount(count)}
                                    disabled={isLoading}
                                    className={`px-4 py-3 rounded-lg font-medium transition-all ${slideCount === count
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {count} slides
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isLoading || prompt.trim().length === 0}
                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-3">
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
                                {t('generating')}
                            </span>
                        ) : (
                            t('generate')
                        )}
                    </button>
                </form>

                {/* Tips */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        {t('tipsTitle')}
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>{t('tip1')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>{t('tip2')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>{t('tip3')}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
