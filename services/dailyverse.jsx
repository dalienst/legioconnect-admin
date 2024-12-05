import { apiMultipartActions } from "@/tools/api";

export const getDailyVerse = async (axios) => {
  try {
    const response = await apiMultipartActions?.get(`/api/dailyverse/`, axios);

    return response?.data;
  } catch (error) {}
};

export const createDailyVerse = async (formData, axios) => {
  try {
    await apiMultipartActions?.post(`/api/dailyverse/`, formData, axios);
  } catch (error) {}
};

export const updateDailyVerse = async (formData, axios) => {
  try {
    await apiMultipartActions?.put(`/api/dailyverse/`, formData, axios);
  } catch (error) {}
};

export const deleteDailyVerse = async (axios) => {
  try {
    await apiMultipartActions?.delete(`/api/dailyverse/`, axios);
  } catch (error) {}
};

export const getDailyVerseDetail = async (slug, axios) => {
  try {
    const response = await apiMultipartActions?.get(
      `/api/dailyverse/${slug}/`,
      axios
    );

    return response?.data;
  } catch (error) {}
};
