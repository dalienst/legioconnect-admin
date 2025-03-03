import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../useAxiosAuth";
import { getEarlyAccess, getEarlyAccessDetail } from "@/services/earlyaccess";

export function useFetchEarlyAccess() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["earlyaccess"],
    queryFn: () => getEarlyAccess(axios),
  });
}

export function useFetchEarlyAccessDetail(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["earlyaccess", slug],
    queryFn: () => getEarlyAccessDetail(slug, axios),
    enabled: !!slug,
  });
}
