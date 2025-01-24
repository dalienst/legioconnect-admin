"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function DailyVerseTable({ dailyverses }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = dailyverses?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = dailyverses?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Reference</th>
              <th scope="col">Text</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((dailyverse, index) => (
              <tr key={dailyverse?.id}>
                <th scope="row">{startIndex + index + 1}</th>
                <td>{dailyverse?.active_date}</td>
                <td>{dailyverse?.verse_reference}</td>
                <td>{dailyverse?.verse_text}</td>
                <td>
                  <Link
                    href={`/verses/${dailyverse?.slug}`}
                    className="btn btn-sm"
                  >
                    <i className="bi bi-eye"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
