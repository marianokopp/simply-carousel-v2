# PayPal Subscriptions + Legal Docs - Plan de Implementación

## 🎯 Análisis: ¿PayPal es bueno para este MVP?

### ✅ **SÍ, PayPal es perfecto para tu caso**

**Ventajas para tu MVP sin LLC**:
1. **No requiere LLC** - Puedes operar como Sole Proprietorship (Persona Física)
2. **Setup más simple** que Stripe para suscripciones básicas
3. **Confianza del usuario** - PayPal es muy conocido, inspira confianza
4. **Todo en uno** - Manejo de suscripciones, pagos recurrentes, y customer portal incluido
5. **Sin comisiones ocultas** para features básicos (a diferencia de Stripe)

**Desventajas vs Stripe**:
- API menos flexible (pero para tu caso no importa)
- Menos control sobre la UX de pago (pero el Customer Portal es suficiente)
- Reportes menos avanzados (para MVP no es crítico)

### 💡 **Recomendación Final**: 
PayPal es **ideal para tu MVP**. Stripe sería mejor solo si tuvieras una LLC y necesitaras personalización extrema. Para $5.99/mes y gestión simple, PayPal es perfecto.

---

## 🛠️ Plan de Implementación Simple

### **Fase 1: Setup de PayPal (30 min)**

#### 1.1 Crear Cuenta PayPal Business
```
1. Ir a developer.paypal.com
2. Login con tu cuenta personal de PayPal
3. Crear una Business App en el Dashboard
4. Copiar Client ID y Secret
```

#### 1.2 Configurar Sandbox (testing)
```
1. En el Dashboard, ir a "Sandbox Accounts"
2. Crear una cuenta de prueba (Business)
3. Crear una cuenta de prueba (Personal) para simular clientes
4. Activar modo Sandbox en tu app
```

#### 1.3 Variables de Entorno
```bash
# .env.local
NEXT_PUBLIC_PAYPAL_CLIENT_ID=tu_client_id_aqui
PAYPAL_CLIENT_SECRET=tu_secret_aqui
PAYPAL_MODE=sandbox  # Cambiar a 'live' en producción
```

---

### **Fase 2: Crear Plan de Suscripción en PayPal (10 min)**

Opción A: **Crear plan manualmente en Dashboard** (Recomendado para MVP)
```
1. PayPal Dashboard → Products & Services → Plans
2. Click "Create Plan"
3. Nombre: "Simply Carousel Pro"
4. Precio: $5.99 USD/mes
5. Billing cycle: Monthly
6. Trial: None (o 7 días gratis si querés)
7. Copiar el PLAN_ID generado
```

Opción B: **Crear plan por API** (si querés automatizar)
- Ver código en Fase 4

---

### **Fase 3: Frontend - PayPal Button (30 min)**

#### 3.1 Instalar SDK
```bash
npm install @paypal/react-paypal-js
```

#### 3.2 Componente de Suscripción
```tsx
// components/PayPalSubscribeButton.tsx
'use client';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useState } from 'react';

const PAYPAL_PLAN_ID = 'P-XXX123';  // El ID del plan que creaste

export default function PayPalSubscribeButton() {
  const [subscriptionID, setSubscriptionID] = useState<string | null>(null);

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        vault: true,
        intent: 'subscription',
      }}
    >
      <PayPalButtons
        style={{
          shape: 'rect',
          color: 'blue',
          layout: 'vertical',
          label: 'subscribe',
        }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: PAYPAL_PLAN_ID,
          });
        }}
        onApprove={async (data, actions) => {
          // Usuario aprobó la suscripción
          console.log('Subscription ID:', data.subscriptionID);
          
          // Guardar en tu base de datos
          await fetch('/api/subscriptions/activate', {
            method: 'POST',
            body: JSON.stringify({
              subscriptionID: data.subscriptionID,
              orderID: data.orderID,
            }),
          });

          setSubscriptionID(data.subscriptionID);
          alert('¡Suscripción activada! Redirigiendo...');
          window.location.href = '/generator';
        }}
        onError={(err) => {
          console.error('PayPal Error:', err);
          alert('Hubo un error. Intenta nuevamente.');
        }}
      />
    </PayPalScriptProvider>
  );
}
```

---

### **Fase 4: Backend - API Routes (45 min)**

#### 4.1 Helper para PayPal Auth
```typescript
// lib/paypal.ts
const PAYPAL_API_URL =
  process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

/**
 * Obtiene access token de PayPal
 */
export async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

/**
 * Obtiene detalles de una suscripción
 */
export async function getSubscriptionDetails(subscriptionID: string) {
  const token = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionID}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return await response.json();
}
```

#### 4.2 API Route: Activar Suscripción
```typescript
// app/api/subscriptions/activate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSubscriptionDetails } from '@/lib/paypal';

export async function POST(req: NextRequest) {
  try {
    const { subscriptionID } = await req.json();
    
    // Obtener usuario actual
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verificar con PayPal que la suscripción existe
    const paypalSub = await getSubscriptionDetails(subscriptionID);

    if (paypalSub.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Subscription not active' },
        { status: 400 }
      );
    }

    // Guardar en base de datos
    const { error } = await supabase.from('subscriptions').insert({
      user_id: user.id,
      paypal_subscription_id: subscriptionID,
      status: 'active',
      plan_id: paypalSub.plan_id,
      next_billing_time: paypalSub.billing_info?.next_billing_time,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription activation error:', error);
    return NextResponse.json(
      { error: 'Failed to activate subscription' },
      { status: 500 }
    );
  }
}
```

---

### **Fase 5: Webhooks (1 hora)**

#### 5.1 Crear Webhook Endpoint
```typescript
// app/api/paypal/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const headersList = await headers();
    
    // TODO: Verificar firma del webhook (ver Fase 5.2)
    
    const eventType = body.event_type;
    const resource = body.resource;

    const supabase = await createClient();

    switch (eventType) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        // Suscripción activada
        await supabase
          .from('subscriptions')
          .update({ status: 'active' })
          .eq('paypal_subscription_id', resource.id);
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        // Usuario canceló
        await supabase
          .from('subscriptions')
          .update({ status: 'cancelled', cancelled_at: new Date() })
          .eq('paypal_subscription_id', resource.id);
        break;

      case 'PAYMENT.SALE.COMPLETED':
        // Pago mensual exitoso
        await supabase
          .from('subscription_payments')
          .insert({
            subscription_id: resource.billing_agreement_id,
            amount: resource.amount.total,
            status: 'completed',
            paypal_payment_id: resource.id,
          });
        break;

      case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED':
        // Pago falló
        await supabase
          .from('subscriptions')
          .update({ status: 'payment_failed' })
          .eq('paypal_subscription_id', resource.id);
        
        // TODO: Enviar email al usuario
        break;

      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        // Suscripción suspendida (múltiples fallos de pago)
        await supabase
          .from('subscriptions')
          .update({ status: 'suspended' })
          .eq('paypal_subscription_id', resource.id);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
```

#### 5.2 Configurar Webhook en PayPal Dashboard
```
1. PayPal Developer Dashboard → Tu App → Webhooks
2. Click "Add Webhook"
3. URL: https://tu-dominio.com/api/paypal/webhook
   - En desarrollo: usar ngrok (https://xxx.ngrok.io/api/paypal/webhook)
4. Seleccionar eventos:
   ✅ BILLING.SUBSCRIPTION.ACTIVATED
   ✅ BILLING.SUBSCRIPTION.CANCELLED
   ✅ PAYMENT.SALE.COMPLETED
   ✅ BILLING.SUBSCRIPTION.PAYMENT.FAILED
   ✅ BILLING.SUBSCRIPTION.SUSPENDED
5. Save
```

---

### **Fase 6: Base de Datos Supabase (15 min)**

#### 6.1 Migración SQL
```sql
-- Migration: create_subscriptions_table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  paypal_subscription_id TEXT UNIQUE NOT NULL,
  plan_id TEXT NOT NULL, -- 'P-XXX123'
  status TEXT NOT NULL DEFAULT 'active', -- active, cancelled, suspended, payment_failed
  next_billing_time TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- RLS Policies
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Los usuarios solo pueden ver su propia suscripción
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Solo el sistema puede insertar/actualizar (vía service_role key)
CREATE POLICY "Service role can manage subscriptions"
  ON subscriptions FOR ALL
  USING (auth.role() = 'service_role');

-- Tabla para historial de pagos (opcional)
CREATE TABLE subscription_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id TEXT NOT NULL,
  paypal_payment_id TEXT UNIQUE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL, -- completed, pending, refunded
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_payments_subscription_id ON subscription_payments(subscription_id);
```

---

### **Fase 7: Middleware de Verificación (20 min)**

#### 7.1 Helper para Check de Suscripción
```typescript
// lib/subscriptions.ts
import { createClient } from '@/lib/supabase/server';

export async function getUserSubscription(userId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  if (error || !data) return null;
  return data;
}

export async function isUserPro(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  return subscription !== null;
}

export async function getUserCarouselCount(userId: string, month: number, year: number) {
  const supabase = await createClient();
  
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const { count } = await supabase
    .from('carousels')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  return count || 0;
}

export async function canCreateCarousel(userId: string): Promise<{
  allowed: boolean;
  reason?: string;
  currentCount?: number;
  limit?: number;
}> {
  const isPro = await isUserPro(userId);
  const now = new Date();
  const count = await getUserCarouselCount(userId, now.getMonth() + 1, now.getFullYear());

  const limit = isPro ? 30 : 3;

  if (count >= limit) {
    return {
      allowed: false,
      reason: isPro
        ? 'Has alcanzado el límite de 30 carruseles este mes.'
        : 'Has alcanzado el límite de 3 carruseles gratis. Upgrade a Pro para crear más.',
      currentCount: count,
      limit,
    };
  }

  return { allowed: true, currentCount: count, limit };
}
```

#### 7.2 Usar en el Generate Endpoint
```typescript
// app/api/generate/route.ts
import { canCreateCarousel } from '@/lib/subscriptions';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verificar si puede crear
  const { allowed, reason } = await canCreateCarousel(user.id);

  if (!allowed) {
    return NextResponse.json(
      { error: reason, requiresUpgrade: true },
      { status: 403 }
    );
  }

  // Continuar con generación...
}
```

---

### **Fase 8: Customer Portal Integration (10 min)**

PayPal tiene su propio Customer Portal. El usuario puede:
- Cancelar suscripción
- Ver historial de pagos
- Actualizar método de pago

```typescript
// Redirigir al usuario al portal de PayPal
const PAYPAL_SUBSCRIPTION_PORTAL = 'https://www.paypal.com/myaccount/autopay/';

// En tu componente de Settings:
<a href={PAYPAL_SUBSCRIPTION_PORTAL} target="_blank">
  Gestionar suscripción en PayPal
</a>
```

**No necesitas implementar nada más**. PayPal se encarga de todo y te notifica vía webhook.

---

## ⚡ Resumen del Flujo Completo

```
1. Usuario hace clic en "Upgrade a Pro"
   ↓
2. Frontend muestra PayPal Button
   ↓
3. Usuario aprueba en ventana de PayPal
   ↓
4. `onApprove` callback ejecuta
   ↓
5. Frontend llama a /api/subscriptions/activate
   ↓
6. Backend verifica con PayPal
   ↓
7. Backend guarda subscription en Supabase
   ↓
8. Usuario redirigido a /generator
   ↓
9. Cada generación, el middleware verifica si es Pro
   ↓
10. PayPal envía webhooks mensuales con pagos/cancelaciones
    ↓
11. Tu webhook endpoint actualiza Supabase
```

---

## 🧪 Testing Local con ngrok

```bash
# 1. Instalar ngrok
brew install ngrok  # Mac
# o descargar de ngrok.com

# 2. Exponer puerto 3000
ngrok http 3000

# 3. Copiar URL pública (ej: https://abc123.ngrok.io)

# 4. Configurar en PayPal Dashboard:
#    Webhook URL → https://abc123.ngrok.io/api/paypal/webhook

# 5. Probar suscripción en sandbox

# 6. Ver logs de webhooks en terminal de ngrok
```

---

## 📊 Próximos Pasos (Post-MVP)

1. **Email notifications** con Resend cuando:
   - Suscripción activada
   - Pago exitoso mensual
   - Pago fallido
   - Cancelación confirmada

2. **Dashboard de admin** para ver:
   - Total de suscriptores Pro
   - MRR (Monthly Recurring Revenue)
   - Churn rate

3. **Upgrade de Free a Pro** in-app:
   - Botón cuando lleguen al límite de 3
   - Modal con comparación de planes

4. **Facturación automática** (generar PDFs de recibos)

---

## ✅ Checklist de Implementación

- [ ] Crear cuenta PayPal Developer
- [ ] Crear Business App y obtener credentials
- [ ] Crear plan de suscripción (manual o API)
- [ ] Instalar `@paypal/react-paypal-js`
- [ ] Crear componente `PayPalSubscribeButton`
- [ ] Crear API route `/api/subscriptions/activate`
- [ ] Crear helper functions en `lib/paypal.ts`
- [ ] Crear tabla `subscriptions` en Supabase
- [ ] Crear API route `/api/paypal/webhook`
- [ ] Configurar webhook en PayPal Dashboard
- [ ] Configurar ngrok para testing local
- [ ] Implementar middleware de verificación
- [ ] Agregar botón "Upgrade a Pro" en UI
- [ ] Testear flujo completo en sandbox
- [ ] Migrar a producción (cambiar a mode 'live')

---

**Tiempo total estimado**: 3-4 horas  
**Complejidad**: Media-Baja  
**Costo mensual**: $0 (solo comisión por transacción: ~3.49% + $0.49)

PayPal es **perfecto para tu MVP**. Simple, confiable, y sin necesidad de LLC.
