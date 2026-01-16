# Implementación i18n - Pasos Críticos Pendientes

## ⚠️ ADVERTENCIA IMPORTANTE

La implementación completa de i18n requiere reestructurar toda la carpeta `/app`. 
Esto es un **cambio masivo** que afectará todas las rutas de la aplicación.

## ✅ Completado hasta ahora:

1. ✅ Instalado `next-intl`
2. ✅ Creados archivos de traducción (`/messages/es.json`, `/messages/en.json`)
3. ✅ Creado `/i18n.ts` con configuración
4. ✅ Actualizado `next.config.ts` con plugin de next-intl

## 🚨 Cambio Masivo Requerido: Reestructuración de /app

### Estructura ACTUAL:
```
/app
  /(public)
    /page.tsx          # Landing
    /login/
  /(protected)
    /generator/
    /editor/
    /preview/
  /layout.tsx
  /globals.css
  /api/
```

### Estructura NUEVA requerida:
```
/app
  /[locale]            # ← NUEVA carpeta dinámica
    /(public)
      /page.tsx        # Landing
      /login/
    /(protected)
      /generator/
      /editor/
      /preview/
    /layout.tsx        # ← Layout con locale
  /api/                # ← APIs quedan fuera de [locale]
  /globals.css         # ← Archivos estáticos fuera
```

## 📋 Alternativa Recomendada: Implementación Manual Paso a Paso

Debido a la complejidad, **es más seguro** hacer esto manualmente:

### Opción 1: Script de migración (Safer)

Puedo crear un script de migración que:
1. Crea la nueva estructura `/app/[locale]`
2. Copia archivos a las nuevas ubicaciones
3. Mantiene respaldo de la estructura antigua
4. Permite rollback si algo falla

**Comando:**
```bash
node scripts/migrate-to-i18n.js
```

### Opción 2: Implementación progresiva (Recommended)

En lugar de mover todo, podemos:
1. **Crear `/app/[locale]` en paralelo** a la estructura actual
2. **Duplicar solo la landing page** primero
3. **Probar que funciona**
4. **Migrar el resto progresivamente**

Esto te permite:
- ✅ Mantener la app funcionando
- ✅ Probar cada pieza antes de avanzar  
- ✅ Rollback fácil si algo falla

### Opción 3: Feature Branch (Most Professional)

1. Crear branch `feature/i18n`
2. Hacer todos los cambios ahí
3. Probar completamente
4. Merge cuando esté 100% funcional

## 🛠️ Siguiente Paso Sugerido

Voy a crear un **script de migración automático** con rollback incluido.

El script hará:
```bash
# 1. Backup de /app actual
cp -r app app.backup

# 2. Crear nueva estructura
mkdir -p app/[locale]

# 3. Mover archivos (preservando git history)
git mv app/(public) app/[locale]/(public)
git mv app/(protected) app/[locale]/(protected)
# ... etc

# 4. Actualizar imports en archivos movidos

# 5. Crear middleware actualizado
```

Si algo falla:
```bash
# Rollback
rm -rf app/[locale]
mv app.backup app
```

## 🤔 ¿Quieres que proceda?

**Opciones:**
1. ✅ **SÍ** - Crear script de migración automático (con rollback)
2. ⏸️ **ESPERA** - Hacer esto en un branch separado primero
3. 🔄 **MANUAL** - Dame los comandos y los ejecuto yo manualmente

**Mi recomendación: Opción 1** - Script automático con backup y rollback.

Es más seguro y si algo falla, podemos volver atrás fácilmente.

---

**Responde con:**
- "Procede con script" → Creo el script de migración
- "Hazlo manual" → Te doy comandos paso a paso
- "Usemos branch" → Creamos feature/i18n primero
