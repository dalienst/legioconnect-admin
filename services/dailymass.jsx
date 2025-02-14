"use client";

import { apiMultipartActions } from "@/tools/api";

export const getDailyMass = async (axios) => {
  try {
    const response = await apiMultipartActions?.get(
      `/api/dailymassreading/`,
      axios
    );
    return response?.data?.results || [];
  } catch (error) {
    throw new Error("Failed to fetch daily mass readings");
  }
};

export const getDailyMassDetail = async (slug, axios) => {
  const response = await apiMultipartActions?.get(
    `/api/dailymassreading/${slug}/`,
    axios
  );
  return response?.data || {};
};

export const createDailyMass = async (formData, axios) => {
  try {
    const response = await apiMultipartActions?.post(
      `/api/dailymassreading/`,
      formData,
      axios
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const updateDailyMass = async (slug, formData, axios) => {
  await apiMultipartActions?.patch(
    `/api/dailymassreading/${slug}/`,
    formData,
    axios
  );
};

export const deleteDailyMass = async (slug, axios) => {
  await apiMultipartActions?.delete(`/api/dailymassreading/${slug}/`, axios);
};
