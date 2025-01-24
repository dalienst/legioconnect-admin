"use client";

import { apiActions } from "@/tools/api";

export const getSubcategories = async (axios) => {
  const response = await apiActions?.get("/api/subcategory/", axios);
  return response?.data?.results || [];
};

export const createSubcategory = async (values, axios) => {
  await apiActions?.post("/api/subcategory/", values, axios);
};

export const getSubcategoryDetail = async (slug, axios) => {
  const response = await apiActions?.get(`/api/subcategory/${slug}/`, axios);
  return response?.data || {};
};

export const updateSubcategory = async (slug, formData, axios) => {
  await apiActions?.patch(`/api/subcategory/${slug}/`, formData, axios);
};

export const deleteSubcategory = async (slug, axios) => {
  await apiActions?.delete(`/api/subcategory/${slug}/`, axios);
};
