"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductForm {
  name: string;
  slug: string;
  description: string;
  long_description: string;
  price_cents: number;
  currency: string;
  image_url: string;
  download_url: string;
  stripe_price_id: string;
  is_active: boolean;
}

const emptyForm: ProductForm = {
  name: "",
  slug: "",
  description: "",
  long_description: "",
  price_cents: 0,
  currency: "BRL",
  image_url: "",
  download_url: "",
  stripe_price_id: "",
  is_active: true,
};

export default function AdminProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    const res = await fetch("/api/products?all=true");
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId
        ? `/api/products/${editingId}`
        : "/api/products";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(false);
        fetchProducts();
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      long_description: product.long_description || "",
      price_cents: product.price_cents,
      currency: product.currency,
      image_url: product.image_url || "",
      download_url: product.download_url || "",
      stripe_price_id: product.stripe_price_id || "",
      is_active: product.is_active,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja desativar este produto?")) return;

    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-secondary">
            Gerenciar Produtos
          </h1>
          <Button
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Cancelar" : "Adicionar Produto"}
          </Button>
        </div>

        {/* Product Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Descrição
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Descrição longa
              </label>
              <textarea
                value={form.long_description}
                onChange={(e) =>
                  setForm({ ...form, long_description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Preço (centavos)
                </label>
                <input
                  type="number"
                  value={form.price_cents}
                  onChange={(e) =>
                    setForm({ ...form, price_cents: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  min={0}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  value={form.image_url}
                  onChange={(e) =>
                    setForm({ ...form, image_url: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  URL de Download
                </label>
                <input
                  type="text"
                  value={form.download_url}
                  onChange={(e) =>
                    setForm({ ...form, download_url: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Stripe Price ID
                </label>
                <input
                  type="text"
                  value={form.stripe_price_id}
                  onChange={(e) =>
                    setForm({ ...form, stripe_price_id: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) =>
                      setForm({ ...form, is_active: e.target.checked })
                    }
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm font-medium text-gray-600">
                    Ativo
                  </span>
                </label>
              </div>
            </div>

            <Button type="submit" disabled={loading}>
              {loading
                ? "Salvando..."
                : editingId
                ? "Atualizar Produto"
                : "Criar Produto"}
            </Button>
          </form>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-accent">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 text-sm text-secondary font-medium">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatPrice(product.price_cents, product.currency)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        product.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {product.is_active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-sm text-primary hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Desativar
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
