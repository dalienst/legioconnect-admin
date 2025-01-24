"use client";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { createPrayer } from "@/services/prayers";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddPrayer({ subcategory, refetch, closeModal }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();

  return (
    <>
      <Formik
        initialValues={{
          subcategory: subcategory?.reference,
          is_public: true,
          title: "",
          purpose: "",
          position: "",
          content: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            await createPrayer(values, axios);
            toast?.success("Prayer created successfully!");
            refetch();
            closeModal();
          } catch (error) {
            toast?.error("Something went wrong!");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ values }) => (
          <>
            <Form>
              <div className="row">
                <div className="col-md-6 col-sm-12 mb-3">
                  <label className="form-label">Subcategory</label>
                  <Field
                    name="subcategory"
                    className="form-control"
                    disabled
                    placeholder={subcategory?.name}
                  />
                </div>

                <div className="col-md-6 col-sm-12 mb-3">
                  <label className="form-label">Title</label>
                  <Field
                    name="title"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-sm-12 mb-3">
                  <label className="form-label">Purpose</label>
                  <Field
                    name="purpose"
                    className="form-control"
                    placeholder="Purpose"
                  />
                </div>

                <div className="col-md-6 col-sm-12 mb-3">
                  <label className="form-label">Position</label>
                  <Field
                    name="position"
                    className="form-control"
                    placeholder="Position"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Content</label>
                <Field
                  as="textarea"
                  name="content"
                  className="form-control"
                  placeholder="Content"
                />
              </div>

              <button
                type="submit"
                className="btn btn-connect w-100"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default AddPrayer;
