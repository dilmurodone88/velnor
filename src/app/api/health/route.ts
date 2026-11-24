import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Kubernetes liveness/readiness uchun. ?db=1 bo'lsa bazani ham tekshiradi.
export async function GET(req: Request) {
  const checkDb = new URL(req.url).searchParams.get("db") === "1";
  if (!checkDb) return NextResponse.json({ status: "ok", time: new Date().toISOString() });
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", db: "up" });
  } catch {
    return NextResponse.json({ status: "degraded", db: "down" }, { status: 503 });
  }
}
