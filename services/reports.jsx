import { apiActions } from "@/tools/api";

export const getReports = async (axios) => {
  const response = await apiActions?.get(`/api/reports/`, axios);

  return response?.data?.results || [];
};

export const getReportDetail = async (slug, axios) => {
  const response = await apiActions?.get(`/api/reports/${slug}/`, axios);

  return response?.data || {};
};

export const createReport = async (values) => {
  await apiActions?.post(`/api/reports/create/`, values);
};

export const updateReport = async (slug, values, axios) => {
  await apiActions?.patch(`/api/reports/${slug}/`, values, axios);
};

export const deleteReport = async (slug, axios) => {
  await apiActions?.delete(`/api/reports/${slug}/`, axios);
};
