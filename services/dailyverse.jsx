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
    return response?.data; // Return the response for further handling
  } catch (error) {
    throw error; // Re-throw the error to be caught in the calling code
  }
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

    return response?.data?.results || [];
  } catch (error) {
    return [];
  }
};
