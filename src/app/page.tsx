import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { MetricsChart } from "@/components/dashboard/MetricsChart";
import { ServiceStatusGrid } from "@/components/dashboard/ServiceStatusGrid";
import { DeploymentFeed } from "@/components/dashboard/DeploymentFeed";
import { buildDashboardSummary } from "@/lib/mock-data";
import {
  Server,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Rocket,
  Cpu,
} from "lucide-react";

// Summary stats are rendered server-side; charts and grids hydrate on client
export default function DashboardPage() {
  const summary = buildDashboardSummary();
  const { cluster } = summary;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header
        title="Platform Dashboard"
        subtitle="Live cluster and service health overview"
      />
      <main className="flex-1 overflow-y-auto p-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard
            title="Total Services"
            value={summary.totalServices}
            icon={Server}
            iconColor="text-slate-400"
          />
          <StatCard
            title="Healthy"
            value={summary.healthyServices}
            icon={CheckCircle2}
            iconColor="text-status-healthy"
            trend="up"
          />
          <StatCard
            title="Degraded"
            value={summary.degradedServices}
            icon={AlertTriangle}
            iconColor="text-status-degraded"
            trend={summary.degradedServices > 0 ? "down" : "neutral"}
          />
          <StatCard
            title="Down / Unknown"
            value={summary.downServices}
            icon={XCircle}
            iconColor="text-status-down"
            trend={summary.downServices > 0 ? "down" : "neutral"}
          />
          <StatCard
            title="Deployments Today"
            value={summary.deploymentsToday}
            subtitle={`${summary.successfulDeployments} successful`}
            icon={Rocket}
            iconColor="text-brand"
          />
          <StatCard
            title="Cluster CPU"
            value={`${cluster.cpuUsedCores}/${cluster.cpuTotalCores}`}
            subtitle={`${cluster.readyNodes}/${cluster.totalNodes} nodes ready`}
            icon={Cpu}
            iconColor="text-indigo-400"
          />
        </div>

        {/* Metrics charts — client components with SWR */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <MetricsChart metric="requestsPerSec" label="Requests / sec" unit="" />
          <MetricsChart metric="p99LatencyMs" label="p99 Latency" unit="ms" />
          <MetricsChart metric="errorRate" label="Error Rate" unit="%" />
          <MetricsChart metric="cpuPercent" label="Cluster CPU" unit="%" />
        </div>

        {/* Service grid */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Services
          </h2>
          <ServiceStatusGrid />
        </div>

        {/* Deployment feed */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Recent Deployments
          </h2>
          <DeploymentFeed />
        </div>
      </main>
    </div>
  );
}
