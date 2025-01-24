"use client";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { updateCategory } from "@/services/category";
import { createSubcategory } from "@/services/subcategories";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UpdateCategory({ refetch, closeModal, category, slug }) {
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const axios = useAxiosAuth();

  return (
    <>
      <div className="row">
        <div className="col-md-7 col-sm-12 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-3 text-center">Update Category</h5>
              <hr />
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
                    toast.success("Category created successfully!");
                    refetch();
                  } catch (error) {
                    if (error?.response?.data?.name) {
                      toast.error(error?.response?.data?.name[0]);
                    } else {
                      toast.error("Something went wrong!");
                    }
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {({ values }) => (
                  <>
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Category Name
                        </label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder={category?.name || "Category Name"}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="position" className="form-label">
                          Position
                        </label>
                        <Field
                          type="number"
                          name="position"
                          className="form-control"
                          placeholder={category?.position || "Position"}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          name="description"
                          className="form-control"
                          placeholder={category?.description || "Description"}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-connect w-100"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Update"}
                      </button>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
        {/* adding subcategory */}
        <div className="col-md-5 col-sm-12 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-3 text-center">Add Subcategory</h5>
              <hr />
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
                    toast.success("Subcategory created successfully!");
                    refetch();
                    resetForm();
                  } catch (error) {
                    if (error?.response?.data?.name) {
                      toast.error("Subcategory name already exists!");
                    } else {
                      toast.error("Something went wrong!");
                    }
                  } finally {
                    setCreating(false);
                  }
                }}
              >
                {({ values }) => (
                  <>
                    <Form>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Subcategory Name"
                        />
                      </div>

                      <div className="row">
                        <div className="mb-3 col-md-6 col-sm-12">
                          <label htmlFor="position" className="form-label">
                            Position
                          </label>
                          <Field
                            type="number"
                            name="position"
                            className="form-control"
                            placeholder="1"
                          />
                        </div>

                        <div className="mb-3 col-md-6 col-sm-12">
                          <label className="form-label">Time Of Day</label>
                          <Field as="select" name="tod" className="form-select">
                            <option value="">Select Time Of Day</option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                            <option value="night">Night</option>
                            <option value="other">Other</option>
                          </Field>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <Field
                          as="textarea"
                          name="description"
                          className="form-control"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-connect w-100"
                        disabled={creating}
                      >
                        {creating ? "Loading..." : "Submit"}
                      </button>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCategory;
