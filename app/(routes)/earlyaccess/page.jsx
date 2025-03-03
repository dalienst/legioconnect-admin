"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchEarlyAccess } from "@/hooks/earlyaccess/actions";
import Link from "next/link";
import React from "react";

function EarlyAccessRequest() {
  const {
    isLoading: isLoadingEarlyAccess,
    data: earlyaccess,
    refetch: refetchEarlyAccess,
  } = useFetchEarlyAccess();

  if (isLoadingEarlyAccess) {
    <LoadingSpinner />;
  }

  return (
    <>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Early Access Request
            </li>
          </ol>
        </nav>

        <section className="mb-3">
          <h3 className="dash-text">Early Request Access</h3>
          <p className="lead small">Review and handle early access requests.</p>
        </section>

        <section>
          {earlyaccess?.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                      {/* TODO: Add status */}
                    </tr>
                  </thead>
                  <tbody>
                    {earlyaccess?.map((item, index) => (
                      <tr key={item?.reference}>
                        <th scope="row">{index + 1}</th>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="p-2 bg-light alert">No Requests Found</p>
          )}
        </section>
      </div>
    </>
  );
}

export default EarlyAccessRequest;
