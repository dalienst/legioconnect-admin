"use client";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { getPrayerDetail, getPrayers } from "@/services/prayers";
import { useQuery } from "@tanstack/react-query";

export function useFetchPrayers() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["prayers"],
    queryFn: () => getPrayers(axios),
  });
}

export function useFetchPrayerDetail(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["prayer", slug],
    queryFn: () => getPrayerDetail(slug, axios),
    enabled: !!slug,
  });
}
