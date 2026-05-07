"use client";

import useSWR from "swr";
import type { MetricPoint } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useMetrics() {
  const { data, error, isLoading } = useSWR<MetricPoint[]>(
    "/api/metrics",
    fetcher,
    { refreshInterval: 5_000 }
  );

  return {
    metrics: data ?? [],
    isLoading,
    isError: !!error,
  };
}
