# Implementación de Internacionalización (i18n)

## ✅ Completado:

### 1. Instalación
- ✅ Instalado `next-intl@3.x`

### 2. Archivos de traducción
- ✅ `/messages/es.json` - Traducciones en español
- ✅ `/messages/en.json` - Traducciones en inglés

## 📋 Pendiente (Próximos pasos):

### 3. Configuración de next-intl

**Crear `/i18n.ts`:**
```typescript
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'es'];

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
```

### 4. Actualizar estructura de carpetas

**Mover `/app/*` a `/app/[locale]/*`:**
```
/app
  /[locale]            ← Nueva carpeta dinámica
    /(public)
      /page.tsx        ← Landing
      /login/
    /(protected)
      /generator/
      /editor/
      /preview/
    /layout.tsx
```

### 5. Actualizar middleware.ts

**Agregar detección de idioma:**
``typescript
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'es'
});

export async function middleware(request: NextRequest) {
  // Primero manejar i18n
  const intlResponse = intlMiddleware(request);
  
  // Luego aplicar lógica de auth (existente)
  // ... código actual de auth ...
  
  return intlResponse;
}
```

### 6. Actualizar componentes para usar traducciones

**En Client Components:**
```typescript
'use client';
import {useTranslations} from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');
  
  return (
    <h1>{t('title')}</h1>
    <p>{t('description')}</p>
  );
}
```

**En Server Components:**
```typescript
import {useTranslations} from 'next-intl';

export default function Page() {
  const t = useTranslations('hero');
  
  return <h1>{t('title')}</h1>;
}
```

### 7. Agregar selector de idioma

**Crear `/components/LanguageSwitcher.tsx`:**
```typescript
'use client';
import {useLocale} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div>
      <button onClick={() => switchLanguage('es')}>🇪🇸 ES</button>
      <button onClick={() => switchLanguage('en')}>🇬🇧 EN</button>
    </div>
  );
}
```

### 8. Configuración de Systeme.io

**Variables de entorno adicionales:**
```env
# Checkout en español
NEXT_PUBLIC_SYSTEME_CHECKOUT_URL_ES=https://simplycarousel.systeme.io/checkout-es

# Checkout en inglés  
NEXT_PUBLIC_SYSTEME_CHECKOUT_URL_EN=https://simplycarousel.systeme.io/checkout-en
```

**Lógica de redirección:**
```typescript
const locale = useLocale();
const checkoutUrl = locale === 'es' 
  ? process.env.NEXT_PUBLIC_SYSTEME_CHECKOUT_URL_ES
  : process.env.NEXT_PUBLIC_SYSTEME_CHECKOUT_URL_EN;
```

### 9. SEO Multi-idioma

**Actualizar metadata en layout.tsx:**
```typescript
export async function generateMetadata({params: {locale}}) {
  const t = await getTranslations({locale, namespace: 'metadata'});
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': '/es',
        'en': '/en'
      }
    }
  };
}
```

### 10. Sitemap multi-idioma

Generar rutas para ambos idiomas en `sitemap.ts`.

## 🎯 Orden de implementación recomendado:

1. ✅ Crear archivos de traducción (HECHO)
2. Crear `/i18n.ts`
3. Mover `/app` a `/app/[locale]`
4. Actualizar middleware
5. Convertir componentes uno por uno
6. Agregar selector de idioma
7. Configurar Systeme.io con dos checkouts
8. Testing completo
9. SEO y sitemap

## ⚠️ Consideraciones:

- **Breaking change:** Todas las URLs cambiarán (de `/login` a `/es/login`)
- **Redirects:** Agregar redirects de URLs antiguas a `/es/...` por defecto
- **Systeme.io:** Necesitarás crear productos/checkouts duplicados
- **Testing:** Probar ambos idiomas en todas las rutas

## 📝 Notas para desarrollo:

- El idioma se detecta automáticamente del navegador
- Los usuarios pueden cambiar manualmente con el selector
- La preferencia se guarda en cookie
- URLs son SEO-friendly: `/es/pricing` `/en/pricing`

---

**Siguiente paso:** ¿Quieres que continue con la implementación completa o prefieres hacerlo en fases?
