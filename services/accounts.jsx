import { apiMultipartActions } from "@/tools/api";

export const getUser = async (useUserId, axios) => {
  const response = await apiMultipartActions?.get(
    `/api/accounts/${useUserId}/`,
    axios
  );

  return response?.data;
};

export const updateUser = async (useUserId, formData, axios) => {
  await apiMultipartActions?.put(`/api/accounts/${useUserId}/`, formData, axios);
};
