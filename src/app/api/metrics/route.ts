import { NextResponse } from "next/server";
import { MOCK_METRICS } from "@/lib/mock-data";

// Small random drift per request so the chart moves on each poll
function jitter(value: number, pct: number): number {
  const delta = value * pct * (Math.random() - 0.5) * 2;
  return parseFloat((value + delta).toFixed(2));
}

export async function GET() {
  const live = MOCK_METRICS.map((p) => ({
    ...p,
    requestsPerSec: Math.round(jitter(p.requestsPerSec, 0.05)),
    errorRate: Math.max(0, jitter(p.errorRate, 0.1)),
    p99LatencyMs: Math.round(Math.max(10, jitter(p.p99LatencyMs, 0.08))),
    cpuPercent: Math.round(Math.min(100, Math.max(0, jitter(p.cpuPercent, 0.06)))),
  }));

  return NextResponse.json(live);
}
