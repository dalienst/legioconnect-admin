import { useQuery } from "@tanstack/react-query";
import { getTeachings } from "@/services/teachings";

export function useFetchTeachings() {
  return useQuery({
    queryKey: ["teachings"],
    queryFn: () => getTeachings(),
  });
}

export function useFetchTeachingDetail(identity) {
  return useQuery({
    queryKey: ["teaching", identity],
    queryFn: () => getTeachingDetail(identity),
    enabled: !!identity,
  });
}
