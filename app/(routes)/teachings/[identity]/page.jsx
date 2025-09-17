"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchTeachingDetail } from "@/hooks/teachings/actions";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

function TeachingDetail() {
  const { identity } = useParams();

  const {
    isLoading: isLoadingTeachingDetail,
    data: teaching,
    refetch: refetchTeachingDetail,
  } = useFetchTeachingDetail(identity);

  if (isLoadingTeachingDetail) return <LoadingSpinner />;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard" className="text-primary">
              Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/teachings">Teachings</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {teaching?.title}
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default TeachingDetail;
