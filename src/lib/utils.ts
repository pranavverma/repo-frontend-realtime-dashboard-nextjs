import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ServiceStatus, DeploymentStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(ms: number | null): string {
  if (ms === null) return "—";
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const rem = seconds % 60;
  return rem > 0 ? `${minutes}m ${rem}s` : `${minutes}m`;
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function statusColor(status: ServiceStatus): string {
  const map: Record<ServiceStatus, string> = {
    healthy: "text-status-healthy",
    degraded: "text-status-degraded",
    down: "text-status-down",
    unknown: "text-status-unknown",
  };
  return map[status];
}

export function deploymentStatusColor(status: DeploymentStatus): string {
  const map: Record<DeploymentStatus, string> = {
    success: "text-status-healthy",
    running: "text-brand",
    failed: "text-status-down",
    pending: "text-status-unknown",
  };
  return map[status];
}

export function deploymentStatusBg(status: DeploymentStatus): string {
  const map: Record<DeploymentStatus, string> = {
    success: "bg-green-500/10 text-green-400",
    running: "bg-indigo-500/10 text-indigo-400",
    failed: "bg-red-500/10 text-red-400",
    pending: "bg-gray-500/10 text-gray-400",
  };
  return map[status];
}

export function serviceStatusBg(status: ServiceStatus): string {
  const map: Record<ServiceStatus, string> = {
    healthy: "bg-green-500/10 text-green-400",
    degraded: "bg-amber-500/10 text-amber-400",
    down: "bg-red-500/10 text-red-400",
    unknown: "bg-gray-500/10 text-gray-400",
  };
  return map[status];
}
