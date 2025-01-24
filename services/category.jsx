"use client";

import { apiActions } from "@/tools/api";

export const getAllCategories = async (axios) => {
  try {
    const response = await apiActions?.get("/api/category/", axios);
    return response?.data?.results;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

export const createCategory = async (values, axios) => {
  await apiActions?.post("/api/category/", values, axios);
};

export const getCategoryDetail = async (slug, axios) => {
  const response = await apiActions?.get(`/api/category/${slug}/`, axios);
  return response?.data || {};
};

export const updateCategory = async (slug, formData, axios) => {
  await apiActions?.patch(`/api/category/${slug}/`, formData, axios);
};

export const deleteCategory = async (slug, axios) => {
  await apiActions?.delete(`/api/category/${slug}/`, axios);
};
