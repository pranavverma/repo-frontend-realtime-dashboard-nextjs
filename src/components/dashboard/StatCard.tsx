"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-brand",
  trend,
}: StatCardProps) {
  const trendColor =
    trend === "up"
      ? "text-status-healthy"
      : trend === "down"
        ? "text-status-down"
        : "text-slate-400";

  return (
    <div className="rounded-xl border border-surface-border bg-surface-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <p className={cn("mt-1 text-3xl font-bold text-white", trendColor)}>
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>
        <div className="rounded-lg bg-slate-800 p-2.5">
          <Icon className={cn("h-5 w-5", iconColor)} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}
