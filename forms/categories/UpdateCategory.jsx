"use client";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { updateCategory } from "@/services/category";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UpdateCategory({ refetch, closeModal, category, slug }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();
  return (
    <>
      <div className="row">
        <div className="col-md-7 col-sm-12 mb-3">
          <div className="card h-100">
            <div className="card-body">
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
                      <h6 className="card-title mb-3 text-center">
                        Update Category
                      </h6>
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
      </div>
    </>
  );
}

export default UpdateCategory;
