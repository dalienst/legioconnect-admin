"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchDeletionRequests } from "@/hooks/accounts/actions";
import extractDate from "@/hooks/useDateFormat";
import Link from "next/link";
import React from "react";

function DeletionRequestList() {
  const {
    isLoading: isLoadingDeleteRequests,
    data: deleteRequests,
    refetch: refetchDeleteRequests,
  } = useFetchDeletionRequests();

  if (isLoadingDeleteRequests) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Deletion Requests
          </li>
        </ol>
      </nav>

      <section className="mb-3">
        <h3 className="dash-text">Accounts Deletion Requests</h3>
        <p className="lead small">
          Review and handle account deletion requests here.
        </p>
      </section>

      <section>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Reason</th>
                <th scope="col">Logged</th>
                <th scope="col">Reference</th>
              </tr>
            </thead>
            <tbody>
              {deleteRequests?.map((deleteRequest, index) => (
                <tr key={deleteRequest?.reference}>
                  <th scope="row">{index + 1}</th>
                  <td>{deleteRequest?.email}</td>
                  <td>{deleteRequest?.reason}</td>
                  <td>{extractDate(deleteRequest?.created_at)}</td>
                  <td>{deleteRequest?.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default DeletionRequestList;
