# ✅ Lista de Tareas - Simply Carousel v2

## 📊 Estado Actual

- [x] Archivos HTML analizados (7/7)
- [x] Documentación técnica revisada
- [x] Plan de implementación creado
- [ ] Iniciar desarrollo

---

## 🎯 Fase 0: Setup del Proyecto (3h)

- [ ] Crear proyecto Next.js 15 con TypeScript
  ```bash
  npx -y create-next-app@latest simply-carousel-v2 --typescript --tailwind --app --no-src
  ```
- [ ] Instalar dependencias
  ```bash
  npm install zustand @supabase/auth-helpers-nextjs @supabase/supabase-js
  npm install @anthropic-ai/sdk jszip
  npm install @headlessui/react
  ```
- [ ] Configurar Supabase
  - Crear proyecto en Supabase Dashboard
  - Configurar Auth providers (Google OAuth)
  - Crear tabla `brand_kits`
- [ ] Configurar `.env.local`
  ```env
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  ANTHROPIC_API_KEY=
  ```
- [ ] Estructura de carpetas según plan

---

## 🎨 Fase 1: Auth & Login (4h)

- [ ] Crear utilidades Supabase (`lib/supabase/`)
- [ ] Implementar página `/login`
- [ ] Form de login con email/password
- [ ] Botón Google OAuth
- [ ] Middleware de autenticación
- [ ] Redirect logic (login → /generator)

---

## 🖼️ Fase 2: Sistema de Templates (12h)

### Tipos TypeScript
- [ ] Crear `types/index.ts` con interfaces:
  - `Template`
  - `SlideContent`
  - `BrandKit`
  - `TextSlot`
  - `DesignElement`

### Templates (crear 5)
- [ ] `minimal-underline.ts` (adaptar ejemplo)
- [ ] `bold-geometric.ts`
- [ ] `modern-gradient.ts`
- [ ] `swiss-minimal.ts`
- [ ] `playful-shapes.ts`

### Canvas Renderer
- [ ] `lib/canvas/renderer.ts`
  - [ ] `renderSlideToCanvas(slideData, template, brandKit)`
  - [ ] `renderBackground(ctx, background, brandKit)`
  - [ ] `renderDesignElement(ctx, element, brandKit)`
  - [ ] `renderTextSlots(ctx, slots, slideData, brandKit)`
  - [ ] `renderGlobalSlots(ctx, slots, brandKit)`

- [ ] `lib/canvas/textFit.ts`
  - [ ] `makeTextFit(ctx, text, slot, maxWidth, maxHeight)`
  - [ ] `wrapText(ctx, text, maxWidth)`
  - [ ] `truncateLines(lines, maxLines)`

- [ ] `lib/canvas/colorResolver.ts`
  - [ ] `resolveColor(colorVar, brandKit, backgroundColor)`
  - [ ] `getContrastColor(bgColor)` (WCAG AAA)
  - [ ] `hexToRgb(hex)`

- [ ] Testear renderizado con datos mock

---

## 🤖 Fase 3: AI Generator - Paso 1 (8h)

- [ ] `lib/anthropic.ts`
  - [ ] Cliente de Anthropic
  - [ ] Función `generateCarouselContent(prompt, slideCount)`
  - [ ] System prompt optimizado
  - [ ] Parser de respuesta JSON

- [ ] Página `/generator`
  - [ ] Textarea para prompt
  - [ ] Select cantidad de slides (5, 7, 10)
  - [ ] Botón "Generar con IA"
  - [ ] Loading state (spinner + "Generando contenido...")
  - [ ] Error handling

- [ ] Zustand Store (`store/useCarouselStore.ts`)
  - [ ] State: slides, currentSlide, template, brandKit
  - [ ] Actions: setSlides, setTemplate, setBrandKit

- [ ] Redirect a `/editor` después de generar

---

## 🎨 Fase 4: Editor Desktop - Paso 2 (24h)

### Layout Base
- [ ] Página `/editor` con grid de 3 columnas
- [ ] Header con progress (Step 2 of 3)
- [ ] Footer con botones

### Columna Izquierda: Slide List
- [ ] Componente `SlideList.tsx`
- [ ] Renderizar thumbnails de todos los slides
- [ ] Click para cambiar slide activo
- [ ] Highlight del slide actual
- [ ] Botón "Add New Slide" (opcional)

### Columna Centro: Canvas Preview
- [ ] Componente `CanvasPreview.tsx`
- [ ] Renderizar slide actual usando `renderSlideToCanvas()`
- [ ] Navegación ← 1/7 →
- [ ] Botones flotantes hover (opcionales)

### Columna Derecha: Design Panel
- [ ] Componente `DesignPanel.tsx` con tabs
- [ ] **Tab "Design":**
  - [ ] `TemplateSelector.tsx` - Grid de templates
  - [ ] Brand Kit controls:
    - [ ] Toggle "Show Logo" + file upload
    - [ ] Toggle "Show Author" + text input
    - [ ] Toggle "Show Website" + text input
  - [ ] Color pickers (2 colores)
    - [ ] Primary color
    - [ ] Secondary color
    - [ ] Botón "+" para custom

### Logic
- [ ] Re-render canvas al cambiar template
- [ ] Re-render canvas al cambiar colores
- [ ] Guardar brandKit en Zustand + Supabase

### Footer
- [ ] Botón "Back to Scripts" → `/generator`
- [ ] Botón "Finish & Export" → `/preview`

---

## 📱 Fase 5: Mobile Editor (12h)

- [ ] Detectar viewport mobile
- [ ] Layout mobile alternativo
- [ ] Preview de slide (aspect-square)
- [ ] Navegación ← 1/7 →
- [ ] Tabs bottom sticky:
  - [ ] "Contenido" - Edición de texto
  - [ ] "Diseño" - Bottom sheet con opciones
  - [ ] "Slides" - Lista de slides
- [ ] Sincronizar con Zustand

---

## 📦 Fase 6: Export & Preview Final (10h)

### Export Logic
- [ ] `lib/canvas/exportUtils.ts`
  - [ ] `exportSlideAsPNG(canvas, slideNumber)`
  - [ ] `createZIP(canvases, filename)`

### Página `/preview`
- [ ] Componente `SlideGallery.tsx`
  - [ ] Renderizar todos los slides a PNG
  - [ ] Gallery horizontal scrollable

- [ ] Componente `ExportPanel.tsx`
  - [ ] Botón "Download ZIP"
  - [ ] Trigger download con JSZip
  - [ ] Naming: `carousel-slide-01.png`

- [ ] Caption Generator
  - [ ] Llamada a Claude API para generar caption
  - [ ] Display caption en card
  - [ ] Botón "Copy Caption" → clipboard

- [ ] Botones secundarios:
  - [ ] "Edit Carousel Slides" → `/editor`
  - [ ] "Create Another Carousel" → `/generator`

---

## 🚀 Fase 7: Landing Page (6h - opcional)

- [ ] Página `/` (landing)
- [ ] Hero section
- [ ] Features section (3 pasos)
- [ ] CTA buttons
- [ ] Footer
- [ ] Responsive

---

## 🎨 Fase 8: Polish & Testing (8h)

- [ ] Responsive en todos los breakpoints
- [ ] Dark mode (si aplica)
- [ ] Loading states everywhere
- [ ] Error boundaries
- [ ] Toast notifications (react-hot-toast)
- [ ] Testing manual:
  - [ ] Flujo completo en desktop
  - [ ] Flujo completo en mobile
  - [ ] Diferentes templates
  - [ ] Diferentes cantidades de slides
  - [ ] Textos largos/cortos (auto-fit)
- [ ] Fix bugs
- [ ] Deploy a Vercel

---

## 🎯 MVP Mínimo (Prioridad 1)

Si quieres lanzar rápido, enfócate en:

✅ **Core Path:**
1. Fase 0: Setup
2. Fase 1: Auth  
3. Fase 2: Templates (solo 3 templates)
4. Fase 3: Generator
5. Fase 4: Editor Desktop (sin edit manual de texto)
6. Fase 6: Export

**Estimación:** ~50-60 horas (1 semana)

---

## 📝 Próximo Paso

**Opción A:** Empezar con Fase 0 (Setup completo)

**Opción B:** Crear prototipo rápido del Canvas renderer primero (para validar arquitectura)

**¿Qué prefieres?** 🚀
