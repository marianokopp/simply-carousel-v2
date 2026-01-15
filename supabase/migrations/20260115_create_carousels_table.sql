-- Migration: create_carousels_table
-- Tabla para trackear carruseles creados por usuarios

CREATE TABLE carousels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Metadata del carrusel
  title VARCHAR(500),
  slide_count INTEGER NOT NULL DEFAULT 5,
  template_id VARCHAR(100),
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_carousels_user_id ON carousels(user_id);
CREATE INDEX idx_carousels_created_at ON carousels(created_at);
CREATE INDEX idx_carousels_user_month ON carousels(user_id, created_at);

-- RLS (Row Level Security)
ALTER TABLE carousels ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propios carruseles
CREATE POLICY "Users can view own carousels"
  ON carousels FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Los usuarios pueden insertar sus propios carrusels
CREATE POLICY "Users can insert own carousels"
  ON carousels FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden actualizar sus propios carrusels
CREATE POLICY "Users can update own carousels"
  ON carousels FOR UPDATE
  USING (auth.uid() = user_id);

-- Política: Los usuarios pueden eliminar sus propios carrusels
CREATE POLICY "Users can delete own carousels"
  ON carousels FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_carousels_updated_at 
  BEFORE UPDATE ON carousels 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
