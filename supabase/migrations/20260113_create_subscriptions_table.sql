-- Migration: create_subscriptions_table
-- Tabla de suscripciones para integración con Systeme.io

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- IDs de Systeme.io
  systeme_contact_id VARCHAR(255) UNIQUE,
  systeme_subscription_id VARCHAR(255),
  
  -- Plan y estado
  plan VARCHAR(50) DEFAULT 'free', -- 'free', 'pro_monthly'
  status VARCHAR(50) DEFAULT 'inactive', -- 'active', 'inactive', 'cancelled', 'expired', 'past_due'
  
  -- Fechas
  started_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_systeme_contact ON subscriptions(systeme_contact_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- RLS (Row Level Security)
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver su propia suscripción
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Solo service_role puede insertar/actualizar (webhooks)
CREATE POLICY "Service role can manage subscriptions"
  ON subscriptions FOR ALL
  USING (auth.role() = 'service_role');

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_subscriptions_updated_at 
  BEFORE UPDATE ON subscriptions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
