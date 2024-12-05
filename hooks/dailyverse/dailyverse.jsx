"use client";
import React from "react";
import useAxiosAuth from "../useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { getDailyVerse, getDailyVerseDetail } from "@/services/dailyverse";

export function useFetchDailyVerses() {
  const axios = useAxiosAuth();
  return useQuery({
    queryKey: ["dailyverse"],
    queryFn: () => getDailyVerse(axios),
  });
}

export const useFetchDailyVerseDetail = (slug) => {
  const axios = useAxiosAuth();
  return useQuery({
    queryKey: ["dailyverse", slug],
    queryFn: () => getDailyVerseDetail(slug, axios),
  });
};
