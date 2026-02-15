import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const sql = getDb();
  const showAll = request.nextUrl.searchParams.get("all") === "true";

  // If requesting all products, verify admin
  if (showAll) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const rows = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  }

  const rows = await sql`SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC`;
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const {
    name,
    slug,
    description,
    long_description,
    price_cents,
    currency,
    image_url,
    download_url,
    stripe_price_id,
    is_active,
  } = body;

  const sql = getDb();
  const rows = await sql`
    INSERT INTO products (name, slug, description, long_description, price_cents, currency, image_url, download_url, stripe_price_id, is_active)
    VALUES (${name}, ${slug}, ${description}, ${long_description || null}, ${price_cents || 0}, ${currency || "BRL"}, ${image_url || null}, ${download_url || null}, ${stripe_price_id || null}, ${is_active ?? true})
    RETURNING *
  `;

  return NextResponse.json(rows[0], { status: 201 });
}
