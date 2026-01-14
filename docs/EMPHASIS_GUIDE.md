# Sistema de Emphasis (Énfasis) - Guía de Implementación en Plantillas

## 📖 ¿Qué es el Emphasis?

El **emphasis** es un sistema que permite resaltar palabras o frases específicas dentro de un texto usando marcadores especiales (`**palabra**`). Es similar a Markdown pero con capacidades de diseño visual avanzadas.

---

## 🎯 Cómo Funciona

### 1. **Sintaxis del Usuario (en el contenido generado por IA)**

El usuario (o la IA) escribe texto con marcadores dobles asteriscos:

```
"Aprende **diseño** sin complicaciones"
"Los **3 secretos** del marketing digital"
"Por qué **nadie** te lo cuenta"
```

### 2. **Parsing Automático**

El sistema usa `parseEmphasis()` para convertir el texto en **segmentos**:

```typescript
// Input:
"Aprende **diseño** sin complicaciones"

// Output (segments):
[
  { text: "Aprende ", emphasized: false },
  { text: "diseño", emphasized: true },
  { text: " sin complicaciones", emphasized: false }
]
```

### 3. **Renderizado en Canvas**

Cada segmento se renderiza con su estilo correspondiente:
- **Normal**: Estilo base del slot
- **Enfatizado**: Estilo definido en `emphasisStyle` de la plantilla

---

## 🛠️ Implementación en Plantillas

### Estructura del `emphasisStyle` en un TextSlot

Para que un slot soporte emphasis, debes agregar la propiedad `emphasisStyle`:

```typescript
text_slots: {
  body: {
    enabled: true,
    x: 60,
    y: 200,
    width: 960,
    height: 1000,
    fontFamily: 'Inter',
    fontSize: 64,
    fontWeight: 400,
    color: 'auto-contrast',
    // ... otras propiedades del slot
    
    // ✅ EMPHASIS STYLE - Define cómo se verán las palabras enfatizadas
    emphasisStyle: {
      fontWeight: 700,                    // Peso de fuente para texto enfatizado
      color: 'auto-contrast',              // Color del texto enfatizado
      backgroundColor: 'brand_secondary',  // Color de fondo/subrayado
      backgroundOpacity: 1,                // Opacidad del fondo (0-1)
    },
  },
}
```

---

## 🎨 Opciones de Diseño del Emphasis

### **Opción 1: Solo cambiar peso y color** 

Sin fondo, solo hace el texto más bold o de otro color:

```typescript
emphasisStyle: {
  fontWeight: 800,           // Más bold que el texto normal
  color: 'brand_secondary',  // Color del acento
  // No hay backgroundColor
}
```

**Resultado visual**: "Aprende **diseño** sin complicaciones"  
→ La palabra "diseño" se ve en bold con color secundario

---

### **Opción 2: Subrayado con color** (Actual implementación)

Usa `backgroundColor` para crear un subrayado debajo del texto:

```typescript
emphasisStyle: {
  fontWeight: 700,
  color: 'auto-contrast',
  backgroundColor: 'brand_secondary',  // ✅ Color del subrayado
  backgroundOpacity: 1,                // ✅ Opacidad completa
}
```

**Cómo se renderiza**:
- El sistema dibuja una línea debajo de la palabra enfatizada
- La línea es del color especificado en `backgroundColor`
- El grosor es `fontSize * 0.02`
- Se agrega padding horizontal: `fontSize * 0.05`

**Resultado visual**: 
```
Aprende diseño sin complicaciones
        ~~~~~~
```

---

### **Opción 3: Fondo de color sólido** (Highlight)

Si quisieras implementar un highlight (fondo rectangular), necesitarías modificar el código de renderizado para cambiar de `ctx.stroke()` a `ctx.fillRect()`:

```typescript
// En textSlots.ts línea 251-271:
// Cambiar de:
ctx.stroke();

// A (ejemplo):
ctx.fillRect(startX, lineY, endX - startX, fontSize);
```

---

## 📋 Propiedades del `emphasisStyle`

| Propiedad | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `fontWeight` | `number` | Peso de la fuente para texto enfatizado | `700`, `800` |
| `color` | `string` | Color del texto enfatizado | `'auto-contrast'`, `'brand_secondary'`, `'#FF0000'` |
| `backgroundColor` | `string` (opcional) | Color del subrayado/fondo | `'brand_secondary'`, `'#00FF00'` |
| `backgroundOpacity` | `number` (opcional) | Opacidad del fondo (0-1) | `0.4`, `1` |

---

## 🔄 Resolución de Colores

Los colores en `emphasisStyle` usan el mismo sistema que el resto de la plantilla:

### **Colores de Marca (Brand Kit)**
```typescript
color: 'brand_primary'      // Color primario del usuario
color: 'brand_secondary'    // Color secundario
color: 'brand_accent'       // Color de acento
```

### **Auto-Contraste**
```typescript
color: 'auto-contrast'  // Se calcula automáticamente según el fondo
```
- Si el fondo es oscuro → texto claro
- Si el fondo es claro → texto oscuro

### **Colores Fijos (Hex)**
```typescript
color: '#FF0000'           // Rojo
color: '#00FF00'           // Verde
```

---

## 📐 Ejemplos de Plantillas

### Ejemplo 1: Minimal Underline (Subrayado Simple)

```typescript
emphasisStyle: {
  fontWeight: 700,
  color: 'auto-contrast',
  backgroundColor: 'brand_secondary',
  backgroundOpacity: 1,
}
```

**Uso en contenido**:
```
"Los **3 secretos** del marketing"
```

**Resultado**: La frase "3 secretos" tiene un subrayado con el color secundario del brand kit.

---

### Ejemplo 2: Bold Geometric (Solo Bold + Color)

```typescript
emphasisStyle: {
  fontWeight: 900,
  color: 'brand_accent',
  // Sin backgroundColor = sin subrayado
}
```

**Uso en contenido**:
```
"Aprende **diseño** hoy"
```

**Resultado**: La palabra "diseño" se ve en bold extra grueso con el color de acento.

---

### Ejemplo 3: Modern Gradient (Highlight Sutil)

```typescript
emphasisStyle: {
  fontWeight: 600,
  color: 'auto-contrast',
  backgroundColor: 'brand_accent',
  backgroundOpacity: 0.3,  // ✅ Transparente para efecto sutil
}
```

**Resultado**: Subrayado semi-transparente que no domina el texto.

---

## 🚀 Buenas Prácticas

### ✅ **DO's**

1. **Siempre incluir `emphasisStyle`** en slots de texto importantes (`body`, `title`, `cta_text`)
2. **Usar `auto-contrast`** para el color del texto cuando sea posible (mejor adaptación)
3. **Mantener coherencia** entre slots de la misma plantilla
4. **Usar `brand_secondary`** para el fondo/subrayado (es su propósito)
5. **Ajustar `backgroundOpacity`** según el estilo de la plantilla:
   - Minimalista: `1` (opaco)
   - Moderno: `0.3-0.6` (semi-transparente)
   - Bold: `1` (opaco)

### ❌ **DON'Ts**

1. **No omitas `emphasisStyle`** si el slot puede tener texto del usuario
2. **No uses colores fijos** a menos que sea necesario (usa variables del brand kit)
3. **No hagas el `fontWeight` igual** al peso normal (no se verá la diferencia)
4. **No uses `backgroundOpacity: 0`** (equivalente a no tener fondo)

---

## 🧪 Cómo Probar

### 1. **En la IA (Anthropic)**

Al generar contenido, la IA debe usar `**palabra**` en los textos:

```typescript
// En anthropic.ts - ejemplo de prompt
"Usa **palabra** para enfatizar conceptos clave en cada slide"
```

### 2. **En el Preview**

1. Genera un carrusel con tu plantilla
2. Verifica que las palabras entre `**` se vean con el estilo de emphasis
3. Prueba con diferentes brand kits para verificar colores

### 3. **Edición Manual**

1. En el editor, modifica el texto de un slide
2. Agrega `**palabra**` manualmente
3. Verifica que se aplique el emphasis al renderizar

---

## 🔧 Troubleshooting

### Problema: "El emphasis no se ve"

**Causas posibles**:
1. No agregaste `emphasisStyle` en la plantilla
2. El `fontWeight` es igual al normal (no hay contraste)
3. El color es igual al texto base

**Solución**:
```typescript
// Asegúrate de tener:
emphasisStyle: {
  fontWeight: slot.fontWeight + 200,  // Mínimo +200
  color: 'brand_secondary',            // Color diferente
}
```

### Problema: "El subrayado no aparece"

**Causa**: No definiste `backgroundColor`

**Solución**:
```typescript
emphasisStyle: {
  // ... otros
  backgroundColor: 'brand_secondary',  // ✅ Agregar esto
  backgroundOpacity: 1,
}
```

### Problema: "El texto se ve cortado"

**Causa**: El emphasis cambia el ancho de las palabras (por el mayor peso), causando mal wrapping

**Solución**: El sistema ya maneja esto automáticamente en `renderTextWithEmphasis()`, pero asegúrate de:
- Usar `autoFit: true` en slots con emphasis
- Dejar suficiente `width` en el slot

---

## 📚 Resumen Rápido

Para agregar emphasis a un slot:

```typescript
// 1. En tu plantilla (template/*.ts)
text_slots: {
  body: {
    // ... configuración normal del slot
    
    // 2. Agregar emphasisStyle
    emphasisStyle: {
      fontWeight: 700,                    // Más bold
      color: 'auto-contrast',              // Color texto
      backgroundColor: 'brand_secondary',  // Color subrayado
      backgroundOpacity: 1,                // Opacidad
    },
  },
}

// 3. El usuario escribe (o la IA genera):
"Esto es **importante** para ti"

// 4. El sistema automáticamente:
// - Parsea el texto
// - Aplica el estilo de emphasis
// - Renderiza con subrayado/bold según la config
```

---

## 🎯 Siguiente Nivel (Futuras Mejoras)

Si quieres extender el sistema:

1. **Múltiples tipos de emphasis**: `**bold**`, `__italic__`, `~~strikethrough~~`
2. **Highlight boxes**: Cambiar de underline a background rectangles
3. **Gradientes en emphasis**: Usar gradientes para el subrayado
4. **Animaciones**: Énfasis con efectos animados (para video)

Para implementar cualquiera de estos, modifica la función `renderTextWithEmphasis()` en `lib/canvas/layers/textSlots.ts`.

---

**¿Preguntas?** El sistema está listo para usar. Solo asegúrate de incluir `emphasisStyle` en todos los slots de texto importantes de tus plantillas.
