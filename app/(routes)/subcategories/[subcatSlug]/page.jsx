"use client";
import { useFetchSubcategoryDetail } from "@/hooks/subcategories/actions";
import { useRouter } from "next/router";
import React, { use } from "react";

function SubcategoryDetail({ params }) {
  const subcatSlug = use(params);
  const router = useRouter();

  const {
    isLoading: isLoadingSubcategory,
    data: subcategory,
    refetch: refetchSubcategory,
  } = useFetchSubcategoryDetail(subcatSlug?.subcatSlug);

  return <div>SubcategoryDetail</div>;
}

export default SubcategoryDetail;
