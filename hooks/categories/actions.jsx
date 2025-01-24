"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../useAxiosAuth";
import { getAllCategories, getCategoryDetail } from "@/services/category";

export function useFetchCategories() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(axios),
  });
}

export function useFetchCategoryDetail(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategoryDetail(slug, axios),
    enabled: !!slug,
  });
}
