import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-6">📦</p>
        <h2 className="text-2xl font-semibold text-secondary mb-2">
          Nenhum produto disponível
        </h2>
        <p className="text-gray-500">
          Novos produtos serão adicionados em breve.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <AnimatedSection key={product.id} delay={index * 0.15}>
          <ProductCard product={product} />
        </AnimatedSection>
      ))}
    </div>
  );
}
