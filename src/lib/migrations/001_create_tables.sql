CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  price_cents INTEGER NOT NULL DEFAULT 0,
  currency VARCHAR(3) NOT NULL DEFAULT 'BRL',
  image_url VARCHAR(500),
  download_url VARCHAR(500),
  stripe_price_id VARCHAR(255),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  customer_email VARCHAR(255) NOT NULL,
  stripe_session_id VARCHAR(255),
  stripe_payment_intent VARCHAR(255),
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'BRL',
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(500),
  github_url VARCHAR(500),
  image_url VARCHAR(500),
  tech_stack TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed: financial spreadsheet product
INSERT INTO products (name, slug, description, long_description, price_cents, currency)
VALUES (
  'Planilha - 3 Demonstrações Financeiras Conectadas',
  'planilha-3-demonstracoes-financeiras',
  'Planilha com as 3 demonstrações financeiras conectadas, pronta para uso.',
  'Planilha completa com DRE, Balanço Patrimonial e Fluxo de Caixa conectados. Baseada no vídeo do YouTube onde mostro como construir do zero. Ideal para quem quer economizar tempo e já ter a planilha funcionando.',
  2990,
  'BRL'
) ON CONFLICT (slug) DO NOTHING;
