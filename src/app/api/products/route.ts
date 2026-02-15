import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const showAll = request.nextUrl.searchParams.get("all") === "true";

  if (showAll) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const rows = await query("SELECT * FROM products ORDER BY created_at DESC");
    return NextResponse.json(rows);
  }

  const rows = await query(
    "SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC"
  );
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

  const rows = await query(
    `INSERT INTO products (name, slug, description, long_description, price_cents, currency, image_url, download_url, stripe_price_id, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [
      name,
      slug,
      description,
      long_description || null,
      price_cents || 0,
      currency || "BRL",
      image_url || null,
      download_url || null,
      stripe_price_id || null,
      is_active ?? true,
    ]
  );

  return NextResponse.json(rows[0], { status: 201 });
}
