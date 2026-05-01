import { NextResponse } from "next/server";
import { getLocationsCatalog } from "@/lib/locations/get-locations";

export const revalidate = 300;

export async function GET() {
  const body = await getLocationsCatalog();
  return NextResponse.json(body);
}
