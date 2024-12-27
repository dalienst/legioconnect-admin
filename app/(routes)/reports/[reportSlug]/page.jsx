"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchReportDetail } from "@/hooks/reports/actions";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import extractDate from "@/hooks/useDateFormat";
import { deleteReport, updateReport } from "@/services/reports";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import toast from "react-hot-toast";

function ReportDetail({ params }) {
  const reportSlug = use(params);
  const [loading, setLoading] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const axios = useAxiosAuth();
  const router = useRouter();

  const {
    isLoading: isLoadingReport,
    data: report,
    refetch: refetchReport,
  } = useFetchReportDetail(reportSlug?.reportSlug);

  const handleSolveReport = async (reportSlug) => {
    try {
      await updateReport(reportSlug, { is_solved: !isSolved }, axios);
      refetchReport();
      setIsSolved((prev) => !prev);
      toast.success("Report Closed successfully");
    } catch (error) {
      toast.error("Error closing report");
    }
  };

  const handleDeleteReport = async () => {
    setLoading(true);
    try {
      await deleteReport(reportSlug?.reportSlug, axios);
      toast?.success("Report deleted successfully");
      router?.push("/reports");
    } catch (error) {
      toast?.error("Error deleting report");
    } finally {
      setLoading(false);
    }
  };

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
        <h5>
          {report?.title} -{" "}
          {report?.is_solved === true ? (
            <span className="badge bg-success rounded-pill">Solved</span>
          ) : (
            <span className="badge bg-danger rounded-pill">Open</span>
          )}
        </h5>
        <p className="text-muted mb-0">
          <strong>Reference: </strong>
          {report?.reference}
        </p>
        <p className="text-muted">
          <strong>Logged: </strong>
          {extractDate(report?.created_at)}
        </p>

        {report?.is_solved === false && (
          <div className="form-check form-switch">
            <input
              type="checkbox"
              name="is_solved"
              id="is_solved"
              role="switch"
              className="form-check-input"
              checked={isSolved}
              onChange={(e) => {
                setIsSolved(!isSolved);
                handleSolveReport(reportSlug?.reportSlug);
              }}
            />
            <label
              htmlFor="is_solved"
              id="is_solved"
              className="form-check-label"
            >
              Close Report
            </label>
          </div>
        )}
      </section>

      <section className="mb-3">
        <p className="text-justify">{report?.description}</p>
      </section>

      <section>
        <button onClick={handleDeleteReport} className="btn" disabled={loading}>
          {loading ? "Deleting..." : "Delete Report"}
        </button>
      </section>
    </div>
  );
}

export default ReportDetail;
