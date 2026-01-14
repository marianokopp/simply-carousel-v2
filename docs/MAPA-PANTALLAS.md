# 📱 Mapa de Pantallas - Simply Carousel v2

## Flujo de Usuario

```
┌──────────────┐
│   Landing    │  (Público)
│  code1.html  │  Marketing page
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Login/Signup │  (Público)
│code.6html.html│  Auth con Supabase + Google
└──────┬───────┘
       │ ✅ Authenticated
       ▼
┌──────────────────────────┐
│   AI Generator - Paso 1  │  (Autenticado)
│     code7.html           │  
│                          │  
│  - Textarea (prompt)     │
│  - Select (5, 7, 10)     │
│  - Generar con IA btn    │
│                          │
│  → Claude API response   │
└─────────┬────────────────┘
          │
          ▼
    ┌─────────────────┐
    │ Editor - Paso 2 │
    │                 │
    ├─────────────────┤
    │   Desktop View  │  (code5.html)
    │                 │
    │  3 columnas:    │
    │  • Izq: Slides  │
    │  • Centro: Canvas
    │  • Der: Design   │
    │                 │
    ├─────────────────┤
    │   Mobile View   │
    │                 │
    │  • code2.html   │  Tab Contenido
    │  • code4.html   │  Tab Diseño
    │                 │
    │  Bottom tabs:   │
    │  Contenido|Diseño|Slides
    └─────────┬───────┘
              │
              ▼
    ┌─────────────────────┐
    │  Preview - Paso 3   │  (code3.html)
    │    Paso Final       │
    │                     │
    │  - Gallery (7 imgs) │
    │  - Download ZIP     │
    │  - Copy Caption     │
    └─────────────────────┘
```

---

## Pantallas Detalladas

### 1️⃣ Landing Page
**Archivo:** `code1.html`  
**Ruta:** `/`  
**Estado:** Público

**Secciones:**
- Header: Logo + Nav + "Get Started"
- Hero: Título grande + CTA
- Features: 3 cards (Prompt, Edit, Export)
- CTA Final
- Footer

**Colores:**
- Primary: `#006199`
- Accent: `#10B981`

---

### 2️⃣ Login/Signup
**Archivo:** `code.6html.html`  
**Ruta:** `/login`  
**Estado:** Público

**Elementos:**
- Logo centrado
- Form:
  - Email input
  - Password input + visibility toggle
  - "¿Olvidaste tu contraseña?"
- Botón: "Iniciar Sesión"
- Divider
- Social: "Continuar con Google"
- Footer: "¿No tienes cuenta? Regístrate"

**Colores:**
- Primary: `#607AFB`

---

### 3️⃣ AI Generator - Paso 1
**Archivo:** `code7.html`  
**Ruta:** `/generator`  
**Estado:** Autenticado

**Layout:**
```
┌─────────────────────────────────────┐
│ Header: Logo + Nav + Avatar         │
├─────────────────────────────────────┤
│                                     │
│   Diseña tu próximo carrusel       │
│        en segundos                  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ Tu idea o tema              │  │
│   │ [Textarea grande]           │  │
│   │                             │  │
│   └─────────────────────────────┘  │
│                                     │
│   Número de láminas    [Generar]   │
│   [5, 7, 10 ▼]        con IA 🔥    │
│                                     │
│   Chips: 🚀 Marketing | 🧘 Bienestar │
│                                     │
│   [Benefits Grid - 3 columnas]     │
│                                     │
└─────────────────────────────────────┘
```

**Funcionalidad:**
- User input → Claude API → JSON response
- Guardar slides en Zustand
- Redirect a `/editor`

---

### 4️⃣ Editor Desktop - Paso 2
**Archivo:** `code5.html`  
**Ruta:** `/editor`  
**Estado:** Autenticado

**Layout (3 columnas):**
```
┌────────────────────────────────────────────────┐
│ Header: Logo + Progress (2/3) + Avatar        │
├────────┬───────────────────────┬───────────────┤
│ SLIDES │    CANVAS PREVIEW     │ DESIGN PANEL  │
│        │                       │               │
│ ┌─┐ 1  │  ┌─────────────────┐  │ ┌───────────┐ │
│ └─┘    │  │                 │  │ │Templates  │ │
│        │  │                 │  │ │───────────│ │
│ ┌─┐ 2  │  │   Slide 1/7     │  │ │[Grid 2x2] │ │
│ └─┘    │  │                 │  │ │           │ │
│        │  │                 │  │ ├───────────┤ │
│ ┌─┐ 3  │  │                 │  │ │Brand Kit  │ │
│ └─┘    │  └─────────────────┘  │ │☑ Logo     │ │
│        │                       │ │☐ Author   │ │
│ ┌─┐ 4  │    ← 1/7 →           │ │☐ Website  │ │
│ └─┘    │                       │ ├───────────┤ │
│        │                       │ │Colors     │ │
│ ...    │                       │ │● ● ● ●    │ │
│        │                       │ └───────────┘ │
├────────┴───────────────────────┴───────────────┤
│ Back to Scripts          Finish & Export ▶     │
└────────────────────────────────────────────────┘
```

**Columnas:**
1. **Izquierda:** Thumbnails de los 7 slides
2. **Centro:** Canvas preview grande + navegación
3. **Derecha:** Tabs (Design | Templates)

---

### 5️⃣ Mobile Editor - Contenido
**Archivo:** `code2.html`  
**Ruta:** `/editor` (mobile)  
**Estado:** Autenticado

**Layout:**
```
┌────────────────────────┐
│ Logo        [Finalizar]│
├────────────────────────┤
│                        │
│  ┌──────────────────┐  │
│  │                  │  │
│  │   Slide Preview  │  │
│  │   (1080x1080)    │  │
│  │                  │  │
│  └──────────────────┘  │
│                        │
│      ← 1/7 →          │
│                        │
│  Título del Slide     │
│  [Input____________]  │
│                        │
│  Cuerpo del texto     │
│  [Textarea_________]  │
│  [                 ]  │
│                        │
│  🪄 Mejorar con IA    │
│                        │
├────────────────────────┤
│  Contenido|Diseño|Slides│
└────────────────────────┘
```

---

### 6️⃣ Mobile Editor - Diseño
**Archivo:** `code4.html`  
**Ruta:** `/editor` (tab Diseño)  
**Estado:** Autenticado

**Layout (Bottom Sheet):**
```
┌────────────────────────┐
│  Preview (arriba)      │
│                        │
├────────────────────────┤
│   ━━━━━ (Pull bar)    │
│                        │
│ Contenido|Diseño|Config│
│                        │
│ Plantillas  [Ver >]   │
│ ┌──┐ ┌──┐ ┌──┐       │
│ │Bd│ │Mn│ │Md│       │
│ └──┘ └──┘ └──┘       │
│                        │
│ Kit de Marca          │
│ ☑ Mostrar Logo        │
│ ☑ Nombre de usuario   │
│ ☐ Sitio Web           │
│                        │
│ Paleta de Colores     │
│ ● ● ● +               │
│                        │
│      [Listo] [X]      │
└────────────────────────┘
```

---

### 7️⃣ Final Preview - Paso 3
**Archivo:** `code3.html`  
**Ruta:** `/preview`  
**Estado:** Autenticado

**Layout:**
```
┌────────────────────────────────────────┐
│ Header: Logo + Nav + "New Carousel"   │
├────────────────────────────────────────┤
│                                        │
│     ✅ ¡Tu carrusel está listo!       │
│                                        │
│ ┌────────────────────────────────────┐│
│ │ Sequence Preview (7 Slides)        ││
│ │                                    ││
│ │ [Img1] [Img2] [Img3] [Img4] ...   ││  ← Scroll horizontal
│ │                                    ││
│ └────────────────────────────────────┘│
│                                        │
│                        ┌─────────────┐ │
│                        │ 📦 Download │ │
│                        │    ZIP      │ │
│                        ├─────────────┤ │
│                        │ Post Caption│ │
│                        │ (AI)        │ │
│                        │ "..."       │ │
│                        │ [Copy]      │ │
│                        ├─────────────┤ │
│                        │ Edit Slides │ │
│                        │ New Carousel│ │
│                        └─────────────┘ │
└────────────────────────────────────────┘
```

**Funcionalidad:**
- Renderizar 7 slides como PNG
- Download ZIP (carousel-slide-01.png...)
- Caption generado por Claude
- Copy to clipboard

---

## Resumen por Prioridad

### 🔴 Crítico (MVP Core)
1. Login (`code.6html.html`)
2. Generator (`code7.html`)
3. Editor Desktop (`code5.html`)
4. Preview Final (`code3.html`)

### 🟡 Importante (Post-MVP)
5. Mobile Editor - Contenido (`code2.html`)
6. Mobile Editor - Diseño (`code4.html`)

### 🟢 Nice to Have
7. Landing Page (`code1.html`)

---

## Tech Stack Summary

| Componente | Tecnología |
|-----------|-----------|
| Framework | Next.js 15 + TypeScript |
| Styling | Tailwind CSS |
| Estado | Zustand |
| Auth | Supabase Auth |
| Database | Supabase (Postgres) |
| IA | Anthropic Claude API |
| Canvas | Native Canvas API |
| Export | JSZip |
| Fonts | Google Fonts (Inter) |

---

**Total de pantallas:** 7  
**Templates a crear:** 5  
**Tiempo estimado MVP:** 50-60 horas
