import type {
  Service,
  Deployment,
  MetricPoint,
  DashboardSummary,
} from "./types";

// Generates a time-series that drifts realistically so charts look lively
function generateMetrics(count = 30): MetricPoint[] {
  const now = Date.now();
  const points: MetricPoint[] = [];
  let rps = 420;
  let err = 0.8;
  let lat = 78;
  let cpu = 42;

  for (let i = count - 1; i >= 0; i--) {
    const t = new Date(now - i * 60_000);
    const hh = t.getHours().toString().padStart(2, "0");
    const mm = t.getMinutes().toString().padStart(2, "0");

    rps = Math.max(100, Math.min(900, rps + (Math.random() - 0.5) * 80));
    err = Math.max(0, Math.min(15, err + (Math.random() - 0.5) * 0.6));
    lat = Math.max(20, Math.min(400, lat + (Math.random() - 0.5) * 20));
    cpu = Math.max(5, Math.min(95, cpu + (Math.random() - 0.5) * 8));

    points.push({
      time: `${hh}:${mm}`,
      requestsPerSec: Math.round(rps),
      errorRate: parseFloat(err.toFixed(2)),
      p99LatencyMs: Math.round(lat),
      cpuPercent: Math.round(cpu),
    });
  }
  return points;
}

export const MOCK_SERVICES: Service[] = [
  {
    id: "svc-001",
    name: "Payment Gateway",
    team: "fintech",
    language: "Go",
    environment: "production",
    status: "healthy",
    podCount: 6,
    readyPods: 6,
    uptime: 99.97,
    lastDeployed: new Date(Date.now() - 3 * 3600_000).toISOString(),
    version: "v4.2.1",
    namespace: "payments",
  },
  {
    id: "svc-002",
    name: "User Auth Service",
    team: "identity",
    language: "Python",
    environment: "production",
    status: "healthy",
    podCount: 4,
    readyPods: 4,
    uptime: 99.99,
    lastDeployed: new Date(Date.now() - 12 * 3600_000).toISOString(),
    version: "v2.8.0",
    namespace: "identity",
  },
  {
    id: "svc-003",
    name: "Product Catalog",
    team: "commerce",
    language: "Java",
    environment: "production",
    status: "degraded",
    podCount: 3,
    readyPods: 1,
    uptime: 94.2,
    lastDeployed: new Date(Date.now() - 2 * 3600_000).toISOString(),
    version: "v3.1.4",
    namespace: "commerce",
  },
  {
    id: "svc-004",
    name: "Notification Worker",
    team: "platform",
    language: "Node.js",
    environment: "production",
    status: "down",
    podCount: 2,
    readyPods: 0,
    uptime: 71.0,
    lastDeployed: new Date(Date.now() - 45 * 60_000).toISOString(),
    version: "v1.9.3",
    namespace: "platform",
  },
  {
    id: "svc-005",
    name: "Analytics Ingester",
    team: "data",
    language: "Python",
    environment: "staging",
    status: "healthy",
    podCount: 2,
    readyPods: 2,
    uptime: 99.1,
    lastDeployed: new Date(Date.now() - 48 * 3600_000).toISOString(),
    version: "v0.7.2",
    namespace: "data",
  },
  {
    id: "svc-006",
    name: "Inventory API",
    team: "commerce",
    language: "Go",
    environment: "production",
    status: "healthy",
    podCount: 4,
    readyPods: 4,
    uptime: 99.8,
    lastDeployed: new Date(Date.now() - 6 * 3600_000).toISOString(),
    version: "v2.3.0",
    namespace: "commerce",
  },
  {
    id: "svc-007",
    name: "Recommendation Engine",
    team: "ml-platform",
    language: "Python",
    environment: "production",
    status: "healthy",
    podCount: 8,
    readyPods: 8,
    uptime: 99.5,
    lastDeployed: new Date(Date.now() - 24 * 3600_000).toISOString(),
    version: "v1.4.0",
    namespace: "ml",
  },
  {
    id: "svc-008",
    name: "Email Relay",
    team: "platform",
    language: "Rust",
    environment: "production",
    status: "unknown",
    podCount: 1,
    readyPods: 0,
    uptime: 85.0,
    lastDeployed: new Date(Date.now() - 30 * 60_000).toISOString(),
    version: "v0.3.1",
    namespace: "platform",
  },
];

export const MOCK_DEPLOYMENTS: Deployment[] = [
  {
    id: "dep-001",
    serviceId: "svc-001",
    serviceName: "Payment Gateway",
    version: "v4.2.1",
    environment: "production",
    status: "success",
    triggeredBy: "github-actions",
    startedAt: new Date(Date.now() - 3 * 3600_000 - 120_000).toISOString(),
    completedAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
    durationMs: 118_000,
  },
  {
    id: "dep-002",
    serviceId: "svc-004",
    serviceName: "Notification Worker",
    version: "v1.9.3",
    environment: "production",
    status: "failed",
    triggeredBy: "pranavverma",
    startedAt: new Date(Date.now() - 45 * 60_000).toISOString(),
    completedAt: new Date(Date.now() - 38 * 60_000).toISOString(),
    durationMs: 420_000,
  },
  {
    id: "dep-003",
    serviceId: "svc-003",
    serviceName: "Product Catalog",
    version: "v3.1.4",
    environment: "production",
    status: "running",
    triggeredBy: "github-actions",
    startedAt: new Date(Date.now() - 8 * 60_000).toISOString(),
    completedAt: null,
    durationMs: null,
  },
  {
    id: "dep-004",
    serviceId: "svc-006",
    serviceName: "Inventory API",
    version: "v2.3.0",
    environment: "production",
    status: "success",
    triggeredBy: "github-actions",
    startedAt: new Date(Date.now() - 6 * 3600_000 - 90_000).toISOString(),
    completedAt: new Date(Date.now() - 6 * 3600_000).toISOString(),
    durationMs: 88_000,
  },
  {
    id: "dep-005",
    serviceId: "svc-002",
    serviceName: "User Auth Service",
    version: "v2.8.0",
    environment: "production",
    status: "success",
    triggeredBy: "github-actions",
    startedAt: new Date(Date.now() - 12 * 3600_000 - 95_000).toISOString(),
    completedAt: new Date(Date.now() - 12 * 3600_000).toISOString(),
    durationMs: 95_000,
  },
  {
    id: "dep-006",
    serviceId: "svc-005",
    serviceName: "Analytics Ingester",
    version: "v0.7.2",
    environment: "staging",
    status: "success",
    triggeredBy: "pranavverma",
    startedAt: new Date(Date.now() - 48 * 3600_000 - 60_000).toISOString(),
    completedAt: new Date(Date.now() - 48 * 3600_000).toISOString(),
    durationMs: 61_000,
  },
];

export const MOCK_METRICS: MetricPoint[] = generateMetrics(30);

export function buildDashboardSummary(): DashboardSummary {
  const statusCounts = MOCK_SERVICES.reduce(
    (acc, s) => {
      acc[s.status] = (acc[s.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    totalServices: MOCK_SERVICES.length,
    healthyServices: statusCounts["healthy"] ?? 0,
    degradedServices: statusCounts["degraded"] ?? 0,
    downServices: (statusCounts["down"] ?? 0) + (statusCounts["unknown"] ?? 0),
    deploymentsToday: MOCK_DEPLOYMENTS.length,
    successfulDeployments: MOCK_DEPLOYMENTS.filter(
      (d) => d.status === "success"
    ).length,
    cluster: {
      totalNodes: 6,
      readyNodes: 6,
      totalPods: MOCK_SERVICES.reduce((s, svc) => s + svc.podCount, 0),
      runningPods: MOCK_SERVICES.reduce((s, svc) => s + svc.readyPods, 0),
      failedPods: 3,
      cpuUsedCores: 19.4,
      cpuTotalCores: 32,
      memUsedGb: 52.1,
      memTotalGb: 128,
    },
    recentDeployments: MOCK_DEPLOYMENTS.slice(0, 5),
    metrics: MOCK_METRICS,
  };
}
