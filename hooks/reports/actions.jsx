"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../useAxiosAuth";
import { getReportDetail, getReports } from "@/services/reports";

export function useFetchReports() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["reports"],
    queryFn: () => getReports(axios),
  });
}

export function useFetchReportDetail(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["report", slug],
    queryFn: () => getReportDetail(slug, axios),
    enabled: !!slug,
  });
}
