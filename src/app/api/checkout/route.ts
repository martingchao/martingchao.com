import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  const { productId } = await request.json();

  const rows = await query(
    "SELECT * FROM products WHERE id = $1 AND is_active = true",
    [productId]
  );
  const product = rows[0];

  if (!product) {
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  }

  // Free product: return download URL directly
  if (product.price_cents === 0) {
    return NextResponse.json({ downloadUrl: product.download_url });
  }

  // Paid product: create Stripe Checkout session
  if (!product.stripe_price_id) {
    return NextResponse.json(
      { error: "Produto não configurado para venda" },
      { status: 400 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price: product.stripe_price_id,
        quantity: 1,
      },
    ],
    metadata: {
      product_id: product.id.toString(),
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/produtos?compra=sucesso`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/produtos?compra=cancelada`,
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
