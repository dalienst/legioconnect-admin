"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../useAxiosAuth";
import { getDailyMass, getDailyMassDetail } from "@/services/dailymass";

export function useFetchDailyMass() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["dailymass"],
    queryFn: () => getDailyMass(axios),
  });
}

export function useFetchDailyMassDetail(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["dailymass", slug],
    queryFn: () => getDailyMassDetail(slug, axios),
    enabled: !!slug,
  });
}
