import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({
  products,
}: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-accent">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-secondary">
            Produtos Digitais
          </h2>
          <p className="text-gray-500 text-center text-lg mb-16 max-w-2xl mx-auto">
            Ferramentas e materiais para acelerar seus estudos e carreira.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <AnimatedSection key={product.id} delay={index * 0.15}>
              <Card className="p-6 h-full flex flex-col">
                {product.image_url && (
                  <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-500 mb-4 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span
                    className={`text-2xl font-bold ${
                      product.price_cents === 0
                        ? "text-green-500"
                        : "text-primary"
                    }`}
                  >
                    {formatPrice(product.price_cents, product.currency)}
                  </span>
                  <Button href="/produtos" size="sm">
                    {product.price_cents === 0 ? "Baixar" : "Comprar"}
                  </Button>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
