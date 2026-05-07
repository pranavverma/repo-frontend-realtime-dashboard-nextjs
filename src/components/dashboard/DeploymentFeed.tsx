"use client";

import { useDeployments } from "@/hooks/useDeployments";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { deploymentStatusBg, formatRelativeTime, formatDuration } from "@/lib/utils";
import { GitCommitHorizontal } from "lucide-react";

export function DeploymentFeed() {
  const { deployments, isLoading } = useDeployments();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {deployments.map((dep) => (
        <div
          key={dep.id}
          className="flex items-start gap-3 rounded-lg border border-surface-border bg-surface-card p-3"
        >
          <div className="mt-0.5 shrink-0 rounded-md bg-slate-800 p-1.5">
            <GitCommitHorizontal className="h-4 w-4 text-slate-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-200">
                {dep.serviceName}
              </span>
              <span className="font-mono text-xs text-slate-500">{dep.version}</span>
              <Badge
                label={dep.status}
                className={deploymentStatusBg(dep.status)}
              />
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
              <span>{dep.environment}</span>
              <span>by {dep.triggeredBy}</span>
              <span>{formatRelativeTime(dep.startedAt)}</span>
              {dep.durationMs !== null && (
                <span>{formatDuration(dep.durationMs)}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
