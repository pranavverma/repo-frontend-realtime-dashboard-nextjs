"use client";

import useSWR from "swr";
import type { Deployment } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useDeployments() {
  const { data, error, isLoading } = useSWR<Deployment[]>(
    "/api/deployments",
    fetcher,
    { refreshInterval: 15_000 }
  );

  return {
    deployments: data ?? [],
    isLoading,
    isError: !!error,
  };
}
