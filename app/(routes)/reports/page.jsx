"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import ReportsTable from "@/components/reports/ReportsTable";
import { useFetchReports } from "@/hooks/reports/actions";
import Link from "next/link";
import React, { useState } from "react";

function AppReports() {
  const {
    isLoading: isLoadingReports,
    data: reports,
    refetch: refetchReports,
  } = useFetchReports();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = reports?.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingReports) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Application Reports
          </li>
        </ol>
      </nav>

      <section className="mb-3">
        <h3 className="dash-text">Reports</h3>
        <p className="lead small">
          Access all application reports, feedback, suggestions, and feature
          requests in one place.
        </p>
      </section>

      <section className="mb-3 col-md-3">
        <input
          type="search"
          name="reports"
          id="reports"
          className="form-control rounded-0"
          placeholder="Search reports by title or description.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section>
        <ReportsTable reports={filteredReports} />
      </section>
    </div>
  );
}

export default AppReports;
