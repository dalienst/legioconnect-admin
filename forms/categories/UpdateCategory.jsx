"use client";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { deleteCategory, updateCategory } from "@/services/category";
import { createSubcategory } from "@/services/subcategories";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UpdateCategory({ refetch, closeModal, category, slug }) {
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const axios = useAxiosAuth();

  const [pagination, setPagination] = useState({});

  const itemsPerPage = 5;
  const currentPage = pagination[category?.reference] || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSubcategories = category?.subcategories?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(
    (category?.subcategories?.length || 0) / itemsPerPage
  );

  const handlePageChange = (categoryRef, newPage) => {
    setPagination((prev) => ({
      ...prev,
      [categoryRef]: newPage,
    }));
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteCategory(slug, axios);
      toast.success("Category deleted successfully");
      refetch();
      closeModal();
    } catch (error) {
      toast.error("Error deleting category");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-4 bg-light rounded-lg shadow-lg">
      {/* Category Details */}
      <section className="mb-4">
        <h4 className="mb-2">Category Details</h4>
        <p className="text-secondary">{category?.description}</p>
      </section>

      {/* Subcategories Section */}
      <section className="mb-4">
        <h4 className="mb-3">Subcategories</h4>
        {category?.subcategories?.length > 0 ? (
          <>
            <div className="table-responsive rounded-lg shadow-sm bg-white">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-primary">
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
                          className="btn btn-outline-primary btn-sm"
                        >
                          <i className="bi bi-eye"></i> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() =>
                  handlePageChange(category?.reference, currentPage - 1)
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
                  handlePageChange(category?.reference, currentPage + 1)
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="alert alert-info mt-3">
            <i className="bi bi-info-circle"></i> No subcategories available.
          </div>
        )}
      </section>

      {/* Update Category Form */}
      <section className="row g-4">
        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">Update Category</h5>
              <Formik
                initialValues={{
                  name: category?.name || "",
                  description: category?.description || "",
                  position: category?.position || "",
                }}
                onSubmit={async (values) => {
                  setLoading(true);
                  try {
                    const formData = new FormData();
                    formData.append("name", values.name);
                    formData.append("description", values.description);
                    formData.append("position", values.position);

                    await updateCategory(slug, formData, axios);
                    toast.success("Category updated successfully!");
                    refetch();
                  } catch (error) {
                    toast.error("Something went wrong!");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {() => (
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">Category Name</label>
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter category name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Position</label>
                      <Field
                        type="number"
                        name="position"
                        className="form-control"
                        placeholder="Enter position"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <Field
                        as="textarea"
                        name="description"
                        className="form-control"
                        placeholder="Enter description"
                      />
                    </div>
                    <button type="submit" className="btn">
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          />
                          Updating...
                        </>
                      ) : (
                        "Update"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>

        {/* Add Subcategory Form */}
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">Add Subcategory</h5>
              <Formik
                initialValues={{
                  category: category?.reference,
                  name: "",
                  position: "",
                  tod: "",
                  description: "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  setCreating(true);
                  try {
                    await createSubcategory(values, axios);
                    toast.success("Subcategory added successfully!");
                    refetch();
                    resetForm();
                  } catch (error) {
                    toast.error("Error adding subcategory!");
                  } finally {
                    setCreating(false);
                  }
                }}
              >
                {() => (
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">Subcategory Name</label>
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter subcategory name"
                      />
                    </div>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label className="form-label">Position</label>
                        <Field
                          type="number"
                          name="position"
                          className="form-control"
                          placeholder="Position"
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">Time of Day</label>
                        <Field as="select" name="tod" className="form-select">
                          <option value="">Select</option>
                          <option value="morning">Morning</option>
                          <option value="afternoon">Afternoon</option>
                          <option value="evening">Evening</option>
                          <option value="night">Night</option>
                        </Field>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <Field
                        as="textarea"
                        name="description"
                        className="form-control"
                        placeholder="Enter description"
                      />
                    </div>
                    <button type="submit" className="btn">
                      {creating ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          />
                          Creating...
                        </>
                      ) : (
                        "Create"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Category */}
      <div className="mt-4 text-end">
        <button
          className="btn"
          disabled={deleting}
          onClick={handleDelete}
        >
          {deleting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2 text-danger"
                role="status"
              />
              Deleting...
            </>
          ) : (
            "Delete Category"
          )}
        </button>
      </div>
    </div>
  );
}

export default UpdateCategory;
