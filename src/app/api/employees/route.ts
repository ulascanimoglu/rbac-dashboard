import { NextResponse } from "next/server";
import { createEmployee, queryEmployees } from "@/lib/data/employees";
import { employeeCreateSchema } from "@/lib/schemas/employee";
import type { SortableField } from "@/lib/types";

const SORTABLE: SortableField[] = ["name", "department", "status", "createdAt"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize") ?? "10") || 10));
  const search = (searchParams.get("search") ?? "").trim();
  const sortParam = searchParams.get("sort") as SortableField | null;
  const sort: SortableField = sortParam && SORTABLE.includes(sortParam) ? sortParam : "createdAt";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  // Simulated latency so loading and keep-previous-data states are visible in the demo.
  await new Promise((resolve) => setTimeout(resolve, 250));

  return NextResponse.json(queryEmployees({ page, pageSize, search, sort, order }));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = employeeCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  return NextResponse.json(createEmployee(parsed.data), { status: 201 });
}
