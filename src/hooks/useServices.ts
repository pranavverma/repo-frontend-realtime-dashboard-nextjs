"use client";

import useSWR from "swr";
import type { Service } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useServices() {
  const { data, error, isLoading } = useSWR<Service[]>(
    "/api/services",
    fetcher,
    { refreshInterval: 10_000 }
  );

  return {
    services: data ?? [],
    isLoading,
    isError: !!error,
  };
}
