"use client";

import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { useDeployments } from "@/hooks/useDeployments";
import {
  deploymentStatusBg,
  formatRelativeTime,
  formatDuration,
} from "@/lib/utils";

export default function DeploymentsPage() {
  const { deployments, isLoading } = useDeployments();

  const successCount = deployments.filter((d) => d.status === "success").length;
  const failedCount = deployments.filter((d) => d.status === "failed").length;
  const runningCount = deployments.filter((d) => d.status === "running").length;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header
        title="Deployments"
        subtitle={
          isLoading
            ? "Loading…"
            : `${deployments.length} deployments · ${successCount} succeeded · ${failedCount} failed · ${runningCount} running`
        }
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
                  {["Service", "Version", "Environment", "Status", "Triggered By", "Started", "Duration"].map(
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
                {deployments.map((dep) => (
                  <tr
                    key={dep.id}
                    className="bg-surface-card transition-colors hover:bg-slate-800/60"
                  >
                    <td className="px-4 py-3 font-medium text-slate-100">
                      {dep.serviceName}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">
                      {dep.version}
                    </td>
                    <td className="px-4 py-3 text-slate-400 capitalize">
                      {dep.environment}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        label={dep.status}
                        className={deploymentStatusBg(dep.status)}
                      />
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {dep.triggeredBy}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {formatRelativeTime(dep.startedAt)}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">
                      {dep.status === "running" ? (
                        <span className="animate-pulse text-indigo-400">
                          in progress
                        </span>
                      ) : (
                        formatDuration(dep.durationMs)
                      )}
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
