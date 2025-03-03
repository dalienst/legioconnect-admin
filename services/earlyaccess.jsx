import { apiActions } from "@/tools/api";

export const getEarlyAccess = async (axios) => {
  const response = await apiActions?.get(`/api/earlyaccess/`, axios);
  return response?.data?.results || [];
};

export const getEarlyAccessDetail = async (slug, axios) => {
  const response = await apiActions?.get(`/api/earlyaccess/${slug}/`, axios);
  return response?.data || {};
};

export const createEarlyAccess = async (values) => {
  await apiActions?.post(`/api/earlyaccess/create/`, values);
};

export const updateEarlyAccess = async (slug, values, axios) => {
  await apiActions?.patch(`/api/earlyaccess/${slug}/`, values, axios);
};

export const deleteEarlyAccess = async (slug, axios) => {
  await apiActions?.patch(`/api/earlyaccess/${slug}/`, axios);
};
