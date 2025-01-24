"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../useAxiosAuth";
import { getSubcategories, getSubcategoryDetail } from "@/services/subcategories";

export function useFetchSubcategories() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["subcategories"],
    queryFn: () => getSubcategories(axios),
  });
}

export function useFetchSubcategoryDetail(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["subcategory", slug],
    queryFn: () => getSubcategoryDetail(slug, axios),
    enabled: !!slug,
  });
}
