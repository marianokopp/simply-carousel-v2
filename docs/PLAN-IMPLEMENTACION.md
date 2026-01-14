# 🚀 Plan de Implementación - Simply Carousel v2

## 📊 Resumen Ejecutivo

### Archivos Analizados: ✅ COMPLETO

- **Documentación técnica:** 2 archivos (Template System + Ejemplo)
- **Pantallas HTML:** 7 archivos (100% identificados)
- **Imágenes de referencia:** 7 archivos

---

## 🎯 Arquitectura Identificada

### Flujo Completo de Usuario

```
Landing Page → Login/Signup → Generator (IA) → Editor Desktop/Mobile → Preview Final
     ↓              ↓               ↓                    ↓                   ↓
  Marketing      Supabase         Claude API      Canvas Rendering       Export ZIP
```

---

## 📱 Pantallas Identificadas (7/7)

### ✅ 1. Landing Page (`code1.html`)
- **Ruta:** `/`
- **Est. tiempo:** 6-8 horas
- **Prioridad:** Media (puede lanzarse después del MVP core)

### ✅ 2. Login/Signup (`code.6html.html`)
- **Ruta:** `/login`
- **Est. tiempo:** 4 horas
- **Prioridad:** Alta
- **Integración:** Supabase Auth + Google OAuth

### ✅ 3. AI Generator - Paso 1 (`code7.html`)
- **Ruta:** `/generator`
- **Est. tiempo:** 8-10 horas
- **Prioridad:** CRÍTICA
- **Elementos:**
  - Textarea grande para prompt
  - Select de cantidad de slides (5, 7, 10)
  - Botón "Generar con IA"
  - Loading states
  - Manejo de errores
- **Integración:** Claude API

### ✅ 4. Editor Desktop - Paso 2 (`code5.html`)
- **Ruta:** `/editor`
- **Est. tiempo:** 20-24 horas
- **Prioridad:** CRÍTICA
- **Layout:** 3 columnas
  - **Izquierda:** Lista de slides thumbnails (dragable)
  - **Centro:** Preview grande de canvas + navegación (1/7)
  - **Derecha:** Panel de diseño con tabs
    - Tab "Design": Brand Kit, Colors, Typography, Visual Style
    - Tab "Templates": Grid de templates
- **Footer:**
  - "Back to Scripts" (volver a Generator)
  - "Save Draft" (opcional MVP)
  - "Finish & Export" (ir a Preview)

### ✅ 5. Mobile Editor - Contenido (`code2.html`)
- **Ruta:** `/editor` (vista mobile)
- **Est. tiempo:** 8 horas
- **Prioridad:** Media-Alta
- **Layout:**
  - Header sticky con botón "Finalizar"
  - Preview de slide (aspect-square)
  - Navegación: ← 1/7 →
  - Tabs bottom sticky:
    - Contenido (activo)
    - Diseño
    - Slides
  - Campos de edición:
    - Input "Título del Slide"
    - Textarea "Cuerpo del texto"
    - Botón "Mejorar con IA"

### ✅ 6. Mobile Editor - Diseño (`code4.html`)
- **Ruta:** `/editor` (tab Diseño)
- **Est. tiempo:** 6 horas
- **Prioridad:** Media
- **Layout Bottom Sheet:**
  - Preview de slide arriba
  - Tabs: Contenido | **Diseño** | Ajustes
  - Secciones:
    - **Plantillas**: Carousel horizontal (Bold, Minimal, Modern)
    - **Kit de Marca**: Toggles (Logo, Usuario, Website)
    - **Paleta de Colores**: Grid de 4 colores + custom

### ✅ 7. Final Preview - Paso 3 (`code3.html`)
- **Ruta:** `/preview`
- **Est. tiempo:** 10 horas
- **Prioridad:** Alta
- **Layout:**
  - Header con nav + "New Carousel"
  - Título: "¡Tu carrusel está listo!"
  - Gallery horizontal scrollable (7 slides as images)
  - Sidebar derecha sticky:
    - Botón "Download ZIP" (PNG de alta calidad)
    - Post Caption (AI Optimized) + Copy button
    - "Edit Carousel Slides" | "Create Another Carousel"

---

## 🏗️ Stack Técnico Propuesto

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Estado:** Zustand (para wizard multi-step + canvas state)
- **UI Components:** Headless UI o Radix UI

### Backend & Services
- **Auth:** Supabase Auth
- **Database:** Supabase (Postgres) - **Solo para usuarios y brand kits**
- **IA:** Anthropic Claude API (Claude 3.5 Sonnet)
- **Storage:** Supabase Storage (para logos)

### Renderizado
- **Canvas:** Canvas API nativo (NO html2canvas, NO fabric.js)
- **Export:** JSZip para Download ZIP

### Fonts
- **UI:** Inter (Google Fonts)
- **Canvas:** Inter (pre-loaded en canvas)

---

## 📦 Estructura de Datos

### Supabase Schema (Mínimo)

```sql
-- users table (handled by Supabase Auth)

-- brand_kits table
create table brand_kits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  logo_url text,
  show_logo boolean default false,
  author_handle text,
  show_author boolean default false,
  website text,
  show_website boolean default false,
  primary_color text default '#607AFB',
  secondary_color text default '#10B981',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS policies
alter table brand_kits enable row level security;
create policy "Users can view own brand kit"
  on brand_kits for select
  using (auth.uid() = user_id);
create policy "Users can update own brand kit"
  on brand_kits for update
  using (auth.uid() = user_id);
```

**NOTA:** NO guardamos carruseles en DB, solo en sesión/estado (Zustand).

---

## 🎨 Sistema de Templates

### Template Interface (TypeScript)

```typescript
interface Template {
  id: string;
  metadata: {
    name: string;
    category: 'minimal' | 'bold' | 'modern' | 'swiss' | 'playful';
    colorSupport: 0 | 1 | 2; // 0=no brand, 1=primary, 2=primary+secondary
    description: string;
    tags: string[];
  };
  viewport: {
    width: 1080;
    height: 1350;
    safeMargin: 60;
  };
  background: {
    type: 'solid' | 'gradient';
    colorVar: 'brand_primary' | 'brand_secondary' | string;
  };
  design_elements: DesignElement[]; // circles, rects, lines, SVGs
  text_slots: {
    slide_number?: TextSlot;
    label?: TextSlot;
    subtitle?: TextSlot;
    title?: TextSlot;
    body?: TextSlot;
    cta_text?: TextSlot;
  };
  global_slots: {
    logo?: LogoSlot;
    author?: TextSlot;
    website?: TextSlot;
  };
  variations: {
    hook?: Partial<Template>;
    cta?: Partial<Template>;
  };
}
```

### Templates a Crear (5 iniciales)

1. **minimal-underline** (ya tenemos ejemplo)
2. **bold-geometric** - Formas grandes, colores sólidos
3. **modern-gradient** - Degradados sutiles
4. **swiss-minimal** - Grid-based, tipografía grande
5. **playful-shapes** - Formas coloridas, dinámico

---

## 🔄 Flujo de Renderizado en Canvas

### Render Pipeline

```typescript
function renderSlideToCanvas(
  slideData: SlideContent,
  template: Template,
  brandKit: BrandKit
): HTMLCanvasElement {
  
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d')!;

  // Determinar tipo de slide
  const slideType = slideData.type; // 'hook' | 'body' | 'cta'
  
  // Aplicar variation si existe
  const effectiveTemplate = slideType !== 'body' && template.variations[slideType]
    ? mergeDeep(template, template.variations[slideType])
    : template;

  // Layer 0: Background
  renderBackground(ctx, effectiveTemplate.background, brandKit);

  // Layer 1: Design Elements (sorted by zIndex)
  effectiveTemplate.design_elements
    .sort((a, b) => a.zIndex - b.zIndex)
    .forEach(el => renderDesignElement(ctx, el, brandKit));

  // Layer 2: Text Slots (con auto-fit)
  renderTextSlots(ctx, effectiveTemplate.text_slots, slideData, brandKit);

  // Layer 3: Global Slots (logo, author, website)
  renderGlobalSlots(ctx, effectiveTemplate.global_slots, brandKit);

  return canvas;
}
```

### Auto-Fit de Texto (CRÍTICO)

```typescript
function makeTextFit(
  ctx: CanvasRenderingContext2D,
  text: string,
  slot: TextSlot,
  maxWidth: number,
  maxHeight: number
): { fontSize: number; lines: string[] } {
  
  let fontSize = slot.fontSize;
  const minFontSize = slot.minFontSize || 18;

  while (fontSize >= minFontSize) {
    ctx.font = `${slot.fontWeight} ${fontSize}px ${slot.fontFamily}`;
    
    // Wrap text en líneas
    const lines = wrapText(ctx, text, maxWidth);
    
    // Calcular altura total
    const lineHeight = fontSize * slot.lineHeight;
    const totalHeight = lines.length * lineHeight;

    // Si cabe, retornar
    if (totalHeight <= maxHeight && lines.length <= (slot.maxLines || Infinity)) {
      return { fontSize, lines };
    }

    // Reducir tamaño gradualmente
    fontSize -= 2;
  }

  // Truncar si no cabe
  const lines = wrapText(ctx, text, maxWidth);
  const maxLines = Math.floor(maxHeight / (minFontSize * slot.lineHeight));
  return {
    fontSize: minFontSize,
    lines: truncateLines(lines, maxLines) // Agregar "..."
  };
}
```

---

## 🗂️ Fases de Implementación

### Fase 0: Setup (2-3 horas)
- [ ] Crear proyecto Next.js 15 + TypeScript
- [ ] Configurar Tailwind CSS
- [ ] Setup Supabase (crear proyecto, configurar Auth)
- [ ] Configurar variables de entorno (`.env.local`)
- [ ] Instalar dependencias:
  - `zustand` (estado global)
  - `@anthropic-ai/sdk` (Claude)
  - `jszip` (export)
  - `@supabase/auth-helpers-nextjs`

### Fase 1: Auth & Login (4 horas)
- [ ] Pantalla Login (`/login`)
- [ ] Integrar Supabase Auth
- [ ] Google OAuth
- [ ] Protected routes middleware
- [ ] Redirect logic

### Fase 2: Sistema de Templates (12 horas)
- [ ] Crear tipos TypeScript completos (`types.ts`)
- [ ] Implementar 5 templates iniciales
- [ ] Crear renderer de Canvas base
- [ ] Función `renderSlideToCanvas()`
- [ ] Función `makeTextFit()` con auto-ajuste
- [ ] Función `resolveColor()` para brand colors
- [ ] Testear renderizado de cada template

### Fase 3: AI Generator - Paso 1 (8 horas)
- [ ] Pantalla Generator (`/generator`)
- [ ] UI: Textarea + Select + Botón
- [ ] Integración Claude API
- [ ] Prompt engineering para output JSON
- [ ] Parser de respuesta
- [ ] Loading states + error handling
- [ ] Guardar en Zustand store
- [ ] Redirect a `/editor`

### Fase 4: Editor Desktop - Paso 2 (24 horas)
- [ ] Layout de 3 columnas
- [ ] **Columna izquierda:** Slide thumbnails
  - Canvas preview pequeño (200x250px)
  - Click para cambiar slide activo
  - Mostrar número + título
- [ ] **Columna centro:** Canvas preview grande
  - Renderizar slide actual
  - Navegación ← 1/7 →
  - Zoom controls (opcional)
- [ ] **Columna derecha:** Panel de diseño
  - Tab "Design":
    - Selector de templates (grid 2x2)
    - Brand Kit controls (toggles + inputs)
    - Color pickers (2 colores)
    - Typography selectors (opcional MVP)
  - Tab "Templates" (opcional MVP)
- [ ] Re-render al cambiar template/colors
- [ ] Footer con botones "Back to Scripts" + "Finish & Export"

### Fase 5: Mobile Editor (12 horas)
- [ ] Detectar viewport mobile
- [ ] Layout mobile con preview + tabs bottom
- [ ] Tab "Contenido": Edición de texto
- [ ] Tab "Diseño": Bottom sheet con opciones
- [ ] Tab "Slides": Lista de slides
- [ ] Navegación entre slides
- [ ] Sincronizar con Zustand store

### Fase 6: Export & Preview Final (10 horas)
- [ ] Pantalla Preview (`/preview`)
- [ ] Renderizar todos los slides a PNG
  - `canvas.toDataURL('image/png', 0.95)`
  - Guardar en array
- [ ] Gallery horizontal scrollable
- [ ] Botón "Download ZIP"
  - Usar JSZip
  - Naming: `carousel-slide-01.png`, `carousel-slide-02.png`
- [ ] Generar caption con Claude API
- [ ] Copiar caption al clipboard
- [ ] Botones secundarios (Edit, Create Another)

### Fase 7: Landing Page (opcional, 6 horas)
- [ ] Implementar `/` (landing)
- [ ] Hero section
- [ ] Features section
- [ ] CTA buttons

### Fase 8: Polish & Testing (8 horas)
- [ ] Responsive design (todos los breakpoints)
- [ ] Dark mode (si aplica)
- [ ] Loading states everywhere
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Testing manual en mobile/desktop
- [ ] Fix bugs

---

## 📋 Tareas por Archivo

### Core del Sistema

```
/src
├── types/
│   └── index.ts                 # Todos los tipos de templates, slides, brand kit
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Cliente Supabase
│   │   └── server.ts           # Server-side Supabase
│   ├── anthropic.ts            # Cliente Claude API
│   └── canvas/
│       ├── renderer.ts         # renderSlideToCanvas()
│       ├── textFit.ts          # makeTextFit()
│       ├── colorResolver.ts    # resolveColor()
│       └── exportUtils.ts      # exportToPNG(), createZIP()
├── templates/
│   ├── index.ts                # Export all templates
│   ├── minimal-underline.ts
│   ├── bold-geometric.ts
│   ├── modern-gradient.ts
│   ├── swiss-minimal.ts
│   └── playful-shapes.ts
├── store/
│   └── useCarouselStore.ts     # Zustand store (slides, template, brandKit)
├── components/
│   ├── ui/                     # Button, Input, Select, etc.
│   └── features/
│       ├── auth/
│       │   └── LoginForm.tsx
│       ├── generator/
│       │   └── GeneratorForm.tsx
│       ├── editor/
│       │   ├── SlideList.tsx
│       │   ├── CanvasPreview.tsx
│       │   ├── DesignPanel.tsx
│       │   └── TemplateSelector.tsx
│       └── preview/
│           ├── SlideGallery.tsx
│           └── ExportPanel.tsx
└── app/
    ├── page.tsx                # Landing
    ├── login/
    │   └── page.tsx
    ├── generator/
    │   └── page.tsx
    ├── editor/
    │   └── page.tsx
    └── preview/
        └── page.tsx
```

---

## ⏱️ Estimación Total de Tiempo

| Fase | Descripción | Horas |
|------|-------------|-------|
| 0 | Setup | 3h |
| 1 | Auth & Login | 4h |
| 2 | Sistema de Templates | 12h |
| 3 | AI Generator | 8h |
| 4 | Editor Desktop | 24h |
| 5 | Mobile Editor | 12h |
| 6 | Export & Preview | 10h |
| 7 | Landing Page (opcional) | 6h |
| 8 | Polish & Testing | 8h |
| **TOTAL** | **MVP Core (sin landing)** | **81 horas** |
| **TOTAL** | **MVP Completo** | **87 horas** |

**Estimación realista:** 10-12 días de trabajo full-time

---

## 🎯 MVP Mínimo (Prioridad 1)

Para lanzar lo antes posible, enfocarse en:

1. ✅ Login con Supabase Auth
2. ✅ Generator con Claude API (Paso 1)
3. ✅ Editor Desktop básico (Paso 2)
   - Solo 2-3 templates iniciales
   - Brand Kit básico (colores, autor)
   - Sin edición manual de texto
4. ✅ Preview Final + Export ZIP (Paso 3)

**Tiempo estimado MVP mínimo:** ~50-60 horas (1 semana full-time)

---

## 🚨 Puntos Críticos

### 1. Auto-Fit de Texto
- **Criticidad:** MÁXIMA
- El texto NUNCA debe desbordarse
- Implementar función robusta con:
  - Reducción gradual de fontSize
  - Respeto de maxLines
  - Truncado con "..." si no cabe

### 2. Color Resolving
- Manejar correctamente `brand_primary`, `brand_secondary`, `auto-contrast`
- Calcular contraste automático (WCAG AAA)

### 3. Performance de Canvas
- Renderizar 7 slides puede ser pesado
- Usar debouncing en cambios de color/template
- Considerar Web Workers (opcional)

### 4. Export ZIP
- Asegurar que PNGs son de alta calidad (1080x1350 @ 95%)
- Naming correcto (`carousel-slide-01.png`)

---

## 📝 Siguiente Paso Inmediato

**Recomendación:** Empezar con **Fase 0 + Fase 1 + Fase 2** (Setup + Auth + Templates)

Esto establece la base técnica y permite testear el renderizado de Canvas antes de integrar la IA.

Una vez que el sistema de templates funcione correctamente, continuar con Generator (Fase 3).

---

**¿Quieres que empiece con alguna fase específica o prefieres revisar primero algún aspecto del plan?** 🚀
