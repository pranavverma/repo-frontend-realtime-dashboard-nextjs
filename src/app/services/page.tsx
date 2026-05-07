"use client";

import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { useServices } from "@/hooks/useServices";
import { serviceStatusBg, formatRelativeTime } from "@/lib/utils";

const ENV_COLOR: Record<string, string> = {
  production: "bg-red-500/10 text-red-400",
  staging: "bg-amber-500/10 text-amber-400",
  development: "bg-slate-700 text-slate-300",
};

export default function ServicesPage() {
  const { services, isLoading } = useServices();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header
        title="Services"
        subtitle={isLoading ? "Loading…" : `${services.length} registered services · auto-refresh 10s`}
      />
      <main className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-surface-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-slate-900 text-left">
                  {["Service", "Team", "Language", "Environment", "Status", "Pods", "Uptime", "Version", "Last Deployed"].map(
                    (col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {services.map((svc) => (
                  <tr
                    key={svc.id}
                    className="bg-surface-card transition-colors hover:bg-slate-800/60"
                  >
                    <td className="px-4 py-3 font-medium text-slate-100">
                      {svc.name}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{svc.team}</td>
                    <td className="px-4 py-3 text-slate-400">{svc.language}</td>
                    <td className="px-4 py-3">
                      <Badge
                        label={svc.environment}
                        className={ENV_COLOR[svc.environment]}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        label={svc.status}
                        className={serviceStatusBg(svc.status)}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">
                      {svc.readyPods}/{svc.podCount}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">
                      {svc.uptime.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">
                      {svc.version}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {formatRelativeTime(svc.lastDeployed)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
