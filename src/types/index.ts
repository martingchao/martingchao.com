export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  long_description?: string;
  price_cents: number;
  currency: string;
  image_url?: string;
  download_url?: string;
  stripe_price_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  product_id: number;
  customer_email: string;
  stripe_session_id?: string;
  stripe_payment_intent?: string;
  amount_cents: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  created_at: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  url?: string;
  github_url?: string;
  image_url?: string;
  tech_stack: string[];
  is_active: boolean;
  display_order: number;
  created_at: string;
}
