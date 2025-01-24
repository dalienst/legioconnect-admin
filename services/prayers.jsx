"use client";

import { apiActions } from "@/tools/api";

export const getPrayers = async (axios) => {
  const response = await apiActions?.get("/api/prayers/", axios);
  return response.data.results || [];
};

export const createPrayer = async (values, axios) => {
  await apiActions?.post("/api/prayers/", values, axios);
};

export const getPrayerDetail = async (slug, axios) => {
  const response = await apiActions?.get(`/api/prayers/${slug}/`, axios);
  return response.data || {};
};

export const updatePrayer = async (slug, formData, axios) => {
  await apiActions?.patch(`/api/prayers/${slug}/`, formData, axios);
};

export const deletePrayer = async (slug, axios) => {
  await apiActions?.delete(`/api/prayers/${slug}/`, axios);
};
