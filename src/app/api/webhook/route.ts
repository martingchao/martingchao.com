import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const productId = session.metadata?.product_id;

    if (productId) {
      const sql = getDb();
      await sql`
        INSERT INTO orders (product_id, customer_email, stripe_session_id, stripe_payment_intent, amount_cents, currency, status)
        VALUES (
          ${parseInt(productId)},
          ${session.customer_details?.email || ""},
          ${session.id},
          ${typeof session.payment_intent === "string" ? session.payment_intent : ""},
          ${session.amount_total || 0},
          ${session.currency || "brl"},
          'completed'
        )
      `;
    }
  }

  return NextResponse.json({ received: true });
}
