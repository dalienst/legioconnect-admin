import { apiMultipartActions } from "@/tools/api";

export const getUser = async (useUserId, axios) => {
  const response = await apiMultipartActions?.get(
    `/api/accounts/${useUserId}/`,
    axios
  );

  return response?.data;
};

export const updateUser = async (useUserId, formData, axios) => {
  await apiMultipartActions?.patch(
    `/api/accounts/${useUserId}/`,
    formData,
    axios
  );
};

export const getAllUsers = async (axios) => {
  const response = await apiMultipartActions?.get(`/api/accounts/`, axios);
  return response?.data?.results || [];
};

export const getUserDetail = async (slug, axios) => {
  const response = await apiMultipartActions?.get(
    `/api/accounts/users/${slug}/`,
    axios
  );

  return response?.data || {};
};

export const deleteUser = async (slug, axios) => {
  await apiMultipartActions?.delete(`/api/accounts/users/${slug}/`, axios);
};
