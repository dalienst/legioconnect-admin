import { apiActions, apiMultipartActions } from "@/tools/api";

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

export const accountDeletionRequest = async (values) => {
  await apiActions?.post("/api/accounts/delete/account/", values);
};

export const getDeletionRequests = async (axios) => {
  const response = await apiActions?.get(
    "/api/accounts/delete/requests/",
    axios
  );
  return response?.data?.results || [];
};

export const getDeletionRequestDetail = async (slug, axios) => {
  const response = await apiActions?.get(
    `/api/accounts/delete/requests/${slug}/`,
    axios
  );
  return response?.data || {};
};
