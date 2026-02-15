import Hero from "@/components/landing/Hero";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import SocialProof from "@/components/landing/SocialProof";
import type { Product } from "@/types";

// Mock products until DB is connected
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Planilha - 3 Demonstrações Financeiras Conectadas",
    slug: "planilha-3-demonstracoes-financeiras",
    description:
      "Planilha com as 3 demonstrações financeiras conectadas, pronta para uso.",
    price_cents: 2990,
    currency: "BRL",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts products={mockProducts} />
      <SocialProof />
    </>
  );
}
