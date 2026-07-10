import { NextResponse } from "next/server";
import { deleteEmployee } from "@/lib/data/employees";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ok = deleteEmployee(id);
  if (!ok) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}
