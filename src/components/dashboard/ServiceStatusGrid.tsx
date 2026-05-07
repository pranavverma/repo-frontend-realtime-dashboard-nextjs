"use client";

import { useServices } from "@/hooks/useServices";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { serviceStatusBg, formatRelativeTime } from "@/lib/utils";
import { Cpu } from "lucide-react";

export function ServiceStatusGrid() {
  const { services, isLoading } = useServices();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {services.map((svc) => {
        const podRatio = svc.podCount > 0 ? svc.readyPods / svc.podCount : 0;

        return (
          <div
            key={svc.id}
            className="rounded-xl border border-surface-border bg-surface-card p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-100">
                  {svc.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {svc.team} · {svc.language}
                </p>
              </div>
              <Badge
                label={svc.status}
                className={serviceStatusBg(svc.status)}
              />
            </div>

            <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
              <Cpu className="h-3.5 w-3.5 shrink-0" />
              <div className="flex flex-1 items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all"
                    style={{ width: `${podRatio * 100}%` }}
                  />
                </div>
                <span className="whitespace-nowrap font-mono">
                  {svc.readyPods}/{svc.podCount} pods
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>{svc.version}</span>
              <span>{formatRelativeTime(svc.lastDeployed)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
