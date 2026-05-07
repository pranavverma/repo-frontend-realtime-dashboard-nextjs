import { NextResponse } from "next/server";
import { MOCK_SERVICES } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(MOCK_SERVICES);
}
