"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMetrics } from "@/hooks/useMetrics";
import { Spinner } from "@/components/ui/Spinner";

const CHART_COLORS = {
  requestsPerSec: "#6366f1",
  errorRate: "#ef4444",
  p99LatencyMs: "#f59e0b",
  cpuPercent: "#22c55e",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-xs shadow-xl">
      <p className="mb-2 font-semibold text-slate-300">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="leading-5">
          {entry.name}: <span className="font-mono font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

interface MetricsChartProps {
  metric: "requestsPerSec" | "errorRate" | "p99LatencyMs" | "cpuPercent";
  label: string;
  unit?: string;
}

export function MetricsChart({ metric, label, unit = "" }: MetricsChartProps) {
  const { metrics, isLoading } = useMetrics();

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-surface-border bg-surface-card">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-surface-border bg-surface-card p-5">
      <p className="mb-4 text-sm font-semibold text-slate-200">
        {label}
        <span className="ml-1 text-xs font-normal text-slate-500">(live · 5s)</span>
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={metrics} margin={{ top: 0, right: 8, bottom: 0, left: -12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="time"
            tick={{ fill: "#64748b", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}${unit}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey={metric}
            name={label}
            stroke={CHART_COLORS[metric]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
