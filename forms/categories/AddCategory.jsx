"use client";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { createCategory } from "@/services/category";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddCategory({ refetch, closeModal }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          description: "",
          position: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            await createCategory(values, axios);
            toast.success("Category created successfully!");
            refetch();
            closeModal();
          } catch (error) {
            if (error?.response?.data?.name) {
              toast.error("Category name already exists!");
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
                  placeholder="Category Name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="position" className="form-label">
                  Category Position
                </label>
                <Field
                  type="number"
                  name="position"
                  className="form-control"
                  placeholder="1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Category Description
                </label>
                <Field
                  as="textarea"
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Category Description"
                />
              </div>

              <button
                type="submit"
                className="btn"
                disabled={loading}
              >
                {loading ? (
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
          </>
        )}
      </Formik>
    </>
  );
}

export default AddCategory;
