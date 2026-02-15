import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sql = getDb();
  const rows = await sql`SELECT * FROM products WHERE id = ${parseInt(id)}`;

  if (rows.length === 0) {
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(rows[0]);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
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
    UPDATE products
    SET name = ${name}, slug = ${slug}, description = ${description},
        long_description = ${long_description || null}, price_cents = ${price_cents || 0},
        currency = ${currency || "BRL"}, image_url = ${image_url || null},
        download_url = ${download_url || null}, stripe_price_id = ${stripe_price_id || null},
        is_active = ${is_active ?? true}, updated_at = NOW()
    WHERE id = ${parseInt(id)}
    RETURNING *
  `;

  if (rows.length === 0) {
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(rows[0]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const sql = getDb();
  await sql`UPDATE products SET is_active = false WHERE id = ${parseInt(id)}`;

  return NextResponse.json({ success: true });
}
