import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const rows = await query("SELECT * FROM products WHERE id = $1", [
    parseInt(id),
  ]);

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

  const rows = await query(
    `UPDATE products
     SET name = $1, slug = $2, description = $3, long_description = $4,
         price_cents = $5, currency = $6, image_url = $7, download_url = $8,
         stripe_price_id = $9, is_active = $10, updated_at = NOW()
     WHERE id = $11
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
      parseInt(id),
    ]
  );

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
  await query("UPDATE products SET is_active = false WHERE id = $1", [
    parseInt(id),
  ]);

  return NextResponse.json({ success: true });
}
