"use client";
import UpdateCategory from "@/forms/categories/UpdateCategory";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function CategoriesDisplay({ categories, refetchCategories }) {
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pagination, setPagination] = useState({}); // Track pagination per category

  const itemsPerPage = 5; // Number of subcategories per page

  const handlePageChange = (categoryRef, newPage) => {
    setPagination((prev) => ({
      ...prev,
      [categoryRef]: newPage,
    }));
  };

  const handleShow = (category) => {
    setSelectedCategory(category);
    setShow(true);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setShow(false);
  };

  return (
    <>
      <section>
        <div className="accordion" id="accordionOne">
          {categories?.map((category) => {
            const currentPage = pagination[category?.reference] || 1;
            const startIndex = (currentPage - 1) * itemsPerPage;
            const currentSubcategories = category?.subcategories?.slice(
              startIndex,
              startIndex + itemsPerPage
            );
            const totalPages = Math.ceil(
              (category?.subcategories?.length || 0) / itemsPerPage
            );

            return (
              <div key={category?.reference} className="accordion-item">
                <h4 className="accordion-header">
                  <button
                    className="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${category?.reference}`}
                    aria-expanded="false"
                    aria-controls={category?.reference}
                  >
                    {category?.name}
                  </button>
                </h4>
                <div
                  id={category?.reference}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionOne"
                >
                  <div className="accordion-body">
                    <section>
                      <h6 className="fst-italic">Category Description</h6>
                      <p>{category?.description}</p>
                    </section>

                    {/* Subcategories table */}
                    <section className="mb-3 ">
                      {category?.subcategories &&
                      category?.subcategories?.length > 0 ? (
                        <>
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

                          {/* Pagination Controls */}
                          <div className="d-flex justify-content-between align-items-center p-2 border">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() =>
                                handlePageChange(
                                  category?.reference,
                                  currentPage - 1
                                )
                              }
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>
                            <span>
                              Page {currentPage} of {totalPages}
                            </span>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() =>
                                handlePageChange(
                                  category?.reference,
                                  currentPage + 1
                                )
                              }
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="alert alert-info">
                          <i className="bi bi-info-circle"></i> No Subcategories
                        </div>
                      )}
                    </section>
                    {/* End of Subcategories table */}

                    {/* Category Details Button */}
                    <section>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleShow(category)}
                      >
                        Category Details
                      </button>
                    </section>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal for Updating Category */}
      {selectedCategory && (
        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="modal-dialog modal-xl"
        >
          <div className="modal-header">
            <h5 className="modal-title">Category: {selectedCategory?.name}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <UpdateCategory
              refetch={refetchCategories}
              closeModal={handleClose}
              category={selectedCategory}
              slug={selectedCategory?.slug}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default CategoriesDisplay;
