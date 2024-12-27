"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchReportDetail } from "@/hooks/reports/actions";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import extractDate from "@/hooks/useDateFormat";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

function ReportDetail({ params }) {
  const reportSlug = use(params);
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();
  const router = useRouter();

  const {
    isLoading: isLoadingReport,
    data: report,
    refetch: refetchReport,
  } = useFetchReportDetail(reportSlug?.reportSlug);

  if (isLoadingReport) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/reports">Application Reports</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {report?.report_type}
          </li>
        </ol>
      </nav>

      <section className="mb-3 border-bottom">
        <h4>{report?.title}</h4>
        <p className="text-muted mb-0">
          <strong>Reference: </strong>
          {report?.reference}
        </p>
        <p className="text-muted">
          <strong>Logged: </strong>
          {extractDate(report?.created_at)}
        </p>
      </section>

      <section className="mb-3">
        <p className="text-justify">{report?.description}</p>
      </section>
    </div>
  );
}

export default ReportDetail;
