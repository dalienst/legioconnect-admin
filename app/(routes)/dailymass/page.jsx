"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchDailyMass } from "@/hooks/dailymass/actions";
import Link from "next/link";
import React from "react";

function DailyMass() {
  const {
    isLoading: isLoadingDailyMass,
    data: dailyMass,
    refetch: refetchDailyMass,
  } = useFetchDailyMass();

  if (isLoadingDailyMass) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Daily Mass
          </li>
        </ol>
      </nav>

      <section className="mb-3 d-flex flex-row flex-md-row justify-content-between align-items-start align-items-md-center">
        <div>
          <h3 className="dash-text">Daily Mass</h3>
          <p className="lead small">Review and handle daily mass here.</p>
        </div>

        <div>
          <button className="btn btn-connect btn-sm">Create</button>
        </div>
      </section>

      <section className="mb-3">
        <p>Display mass</p>
      </section>
    </div>
  );
}

export default DailyMass;
