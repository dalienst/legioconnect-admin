import { apiActions } from "@/tools/api";

export const getTeachings = async () => {
  const response = await apiActions?.get("/api/teachings/");
  return response?.data?.results || [];
};

export const getTeachingDetail = async (identity) => {
  const response = await apiActions?.get(`/api/teachings/${identity}/`);
  return response?.data || {};
};

export const createTeaching = async (values, token) => {
  const response = await apiActions?.post("/api/teachings/", values, token);
  return response?.data;
};

export const updateTeaching = async (identity, values, token) => {
  const response = await apiActions?.patch(
    `/api/teachings/${identity}/`,
    values,
    token
  );
  return response?.data;
};

export const deleteTeaching = async (identity, token) => {
  const response = await apiActions?.delete(
    `/api/teachings/${identity}/`,
    token
  );
  return response?.data;
};
