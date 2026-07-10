import { NextResponse } from "next/server";
import { getStats } from "@/lib/data/employees";

export async function GET() {
  return NextResponse.json(getStats());
}
