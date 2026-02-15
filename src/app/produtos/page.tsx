import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductGrid from "@/components/products/ProductGrid";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Produtos digitais de Martin Chao - planilhas, templates e ferramentas.",
};

// Mock products until DB is connected
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Planilha - 3 Demonstrações Financeiras Conectadas",
    slug: "planilha-3-demonstracoes-financeiras",
    description:
      "Planilha com as 3 demonstrações financeiras conectadas, pronta para uso. DRE, Balanço Patrimonial e Fluxo de Caixa integrados.",
    long_description:
      "Planilha completa com DRE, Balanço Patrimonial e Fluxo de Caixa conectados. Baseada no vídeo do YouTube onde mostro como construir do zero. Ideal para quem quer economizar tempo e já ter a planilha funcionando.",
    price_cents: 2990,
    currency: "BRL",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function ProdutosPage() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-secondary">
            Produtos Digitais
          </h1>
          <p className="text-gray-500 text-center text-lg mb-16 max-w-2xl mx-auto">
            Ferramentas e materiais para acelerar seus estudos e carreira em
            finanças e tecnologia.
          </p>
        </AnimatedSection>

        <ProductGrid products={mockProducts} />
      </div>
    </div>
  );
}
