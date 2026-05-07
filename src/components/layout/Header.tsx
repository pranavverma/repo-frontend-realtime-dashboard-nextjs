"use client";

import { RefreshCw } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-surface-border bg-slate-950 px-6 py-4">
      <div>
        <h1 className="text-lg font-bold text-slate-100">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <RefreshCw className="h-3.5 w-3.5" />
        <span>Auto-refresh: 5s / 10s / 15s</span>
      </div>
    </header>
  );
}
