"use client";
import Link from "next/link";
import React, { useState } from "react";

function SubCategoriesDisplay({ subcategories }) {
  const itemsPerPage = 5; // Number of subcategories per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination-related variables
  const totalPages = Math.ceil(subcategories?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSubcategories = subcategories?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <section className="mb-3">
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Prayers</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentSubcategories?.map((subcategory) => (
                <tr key={subcategory?.reference}>
                  <td>{subcategory?.name}</td>
                  <td>{subcategory?.prayers?.length}</td>
                  <td>
                    <Link
                      href={`/subcategories/${subcategory?.slug}`}
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
      </section>

      {/* Pagination Controls */}
      {totalPages > 1 && (
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
      )}
    </>
  );
}

export default SubCategoriesDisplay;
