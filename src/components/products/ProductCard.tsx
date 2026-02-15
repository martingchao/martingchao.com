"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const isFree = product.price_cents === 0;

  const handlePurchase = async () => {
    if (isFree && product.download_url) {
      window.open(product.download_url, "_blank");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await res.json();

      if (data.downloadUrl) {
        window.open(data.downloadUrl, "_blank");
      } else if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error("Erro ao processar compra:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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

      {!product.image_url && (
        <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
          <span className="text-4xl">📊</span>
        </div>
      )}

      <h3 className="text-xl font-semibold text-secondary mb-2">
        {product.name}
      </h3>

      <p className="text-gray-500 mb-4 flex-grow">{product.description}</p>

      {product.long_description && (
        <p className="text-sm text-gray-400 mb-4">{product.long_description}</p>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <span
          className={`text-2xl font-bold ${
            isFree ? "text-green-500" : "text-primary"
          }`}
        >
          {formatPrice(product.price_cents, product.currency)}
        </span>
        <Button onClick={handlePurchase} size="sm" disabled={loading}>
          {loading
            ? "Processando..."
            : isFree
            ? "Baixar Grátis"
            : "Comprar"}
        </Button>
      </div>
    </Card>
  );
}
