"use client";
import extractDate from "@/hooks/useDateFormat";
import Link from "next/link";
import React from "react";

function ReportsTable({ reports }) {
  return (
    <>
      {reports?.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date Logged</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports?.map((report, index) => (
                <tr key={report?.id}>
                  <td>{index + 1}</td>
                  <td>{report?.report_type}</td>
                  <td>{report?.title}</td>
                  <td>{report?.description}</td>
                  <td>{extractDate(report?.created_at)}</td>
                  <td>
                    {report?.is_solved === true ? <p>Solved</p> : <p>Open</p>}
                  </td>
                  <td>
                    <Link
                      href={`/reports/${report?.slug}`}
                      className="btn btn-sm"
                    >
                      <i className="bi bi-eye-fill"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-2 bg-light">No users found</p>
      )}
    </>
  );
}

export default ReportsTable;
