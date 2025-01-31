"use client";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { updatePrayer } from "@/services/prayers";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UpdatePrayer({ slug, subcategory, prayer, refetch, closeModal }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();

  return (
    <>
      <Formik
        initialValues={{
          subcategory: subcategory?.reference || "",
          // is_public: prayer?.is_public || true,
          title: prayer?.title || "",
          purpose: prayer?.purpose || "",
          position: prayer?.position || "",
          content: prayer?.content || "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const formData = new FormData();

            formData.append("subcategory", values.subcategory);
            // formData.append("is_public", values.is_public);
            formData.append("title", values.title);
            formData.append("purpose", values.purpose);
            formData.append("position", values.position);
            formData.append("content", values.content);

            await updatePrayer(slug, formData, axios);
            toast?.success("Prayer updated successfully!");
            refetch();
            closeModal();
          } catch (error) {
            toast?.error("Something went wrong!");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <>
            <Form>
              {/* <div className="form-check form-switch mb-3">
                <Field name="is_public">
                  {({ field, form }) => (
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="is_public"
                      checked={field?.value}
                      onChange={(e) =>
                        form.setFieldValue("is_public", e.target.checked)
                      }
                    />
                  )}
                </Field>
                <label className="form-check-label" htmlFor="is_public">
                  Public
                </label>
              </div> */}

              <div className="row">
                <div className="col-md-6 col-sm-12 mb-3">
                  <label className="form-label">Subcategory</label>
                  <Field
                    name="subcategory"
                    className="form-control"
                    value={prayer?.subcategory_detail || ""}
                    disabled
                  />
                </div>

                <div className="col-md-6 col-sm-12 mb-3">
                  <label className="form-label">Title</label>
                  <Field
                    name="title"
                    className="form-control"
                    placeholder={prayer?.title || "Title"}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-sm-12 mb-3">
                  <label className="form-label">Purpose</label>
                  <Field
                    name="purpose"
                    className="form-control"
                    placeholder={prayer?.purpose || "Purpose"}
                  />
                </div>

                <div className="col-md-6 col-sm-12 mb-3">
                  <label className="form-label">Position</label>
                  <Field
                    name="position"
                    className="form-control"
                    placeholder={prayer?.position || "Position"}
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

              <button type="submit" className="btn" disabled={loading}>
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
          </>
        )}
      </Formik>
    </>
  );
}

export default UpdatePrayer;
