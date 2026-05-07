export type ServiceStatus = "healthy" | "degraded" | "down" | "unknown";
export type DeploymentStatus = "success" | "running" | "failed" | "pending";
export type Environment = "production" | "staging" | "development";

export interface Service {
  id: string;
  name: string;
  team: string;
  language: string;
  environment: Environment;
  status: ServiceStatus;
  podCount: number;
  readyPods: number;
  uptime: number;         // percentage 0-100
  lastDeployed: string;   // ISO timestamp
  version: string;
  namespace: string;
}

export interface Deployment {
  id: string;
  serviceId: string;
  serviceName: string;
  version: string;
  environment: Environment;
  status: DeploymentStatus;
  triggeredBy: string;
  startedAt: string;
  completedAt: string | null;
  durationMs: number | null;
}

export interface MetricPoint {
  time: string;       // e.g. "14:30"
  requestsPerSec: number;
  errorRate: number;  // percentage
  p99LatencyMs: number;
  cpuPercent: number;
}

export interface ClusterMetrics {
  totalNodes: number;
  readyNodes: number;
  totalPods: number;
  runningPods: number;
  failedPods: number;
  cpuUsedCores: number;
  cpuTotalCores: number;
  memUsedGb: number;
  memTotalGb: number;
}

export interface DashboardSummary {
  totalServices: number;
  healthyServices: number;
  degradedServices: number;
  downServices: number;
  deploymentsToday: number;
  successfulDeployments: number;
  cluster: ClusterMetrics;
  recentDeployments: Deployment[];
  metrics: MetricPoint[];
}
