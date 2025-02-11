"use client";

import { apiActions } from "@/tools/api";

export const getDailyMass = async (axios) => {
  try {
    const response = await apiActions?.get(`/api/dailymassreading/`, axios);
    return response?.data?.results || [];
  } catch (error) {
    throw new Error("Failed to fetch daily mass readings");
  }
};

export const getDailyMassDetail = async (slug, axios) => {
  const response = await apiActions?.get(
    `/api/dailymassreading/${slug}/`,
    axios
  );
  return response?.data || {};
};

export const createDailyMass = async (formData, axios) => {
  await apiActions?.post(`/api/dailymassreading/`, formData, axios);
};

export const updateDailyMass = async (slug, formData, axios) => {
  await apiActions?.patch(`/api/dailymassreading/${slug}/`, formData, axios);
};

export const deleteDailyMass = async (slug, axios) => {
  await apiActions?.delete(`/api/dailymassreading/${slug}/`, axios);
};
