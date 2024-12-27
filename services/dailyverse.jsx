import { apiMultipartActions } from "@/tools/api";

export const getDailyVerse = async (axios) => {
  try {
    const response = await apiMultipartActions?.get(`/api/dailyverse/`, axios);
    return response?.data?.results || [];
  } catch (error) {
    throw new Error("Failed to fetch daily verses");
  }
};

export const createDailyVerse = async (formData, axios) => {
  try {
    const response = await apiMultipartActions?.post(
      `/api/dailyverse/`,
      formData,
      axios
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const updateDailyVerse = async (slug, formData, axios) => {
  await apiMultipartActions?.patch(`/api/dailyverse/${slug}/`, formData, axios);
};

export const deleteDailyVerse = async (slug, axios) => {
  await apiMultipartActions?.delete(`/api/dailyverse/${slug}/`, axios);
};

export const getDailyVerseDetail = async (slug, axios) => {
  const response = await apiMultipartActions?.get(
    `/api/dailyverse/${slug}/`,
    axios
  );

  return response?.data || {};
};
