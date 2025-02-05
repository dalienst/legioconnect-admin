"use client";
import CategorySection from "@/components/categories/CategorySection";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchCategories } from "@/hooks/categories/actions";
import React from "react";

function KitapLemo() {
  const {
    isLoading: isLoadingCategories,
    data: categories,
    refetch: refetchCategories,
  } = useFetchCategories();

  if (isLoadingCategories) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <CategorySection
        categories={categories}
        refetchCategories={refetchCategories}
      />
    </div>
  );
}

export default KitapLemo;
