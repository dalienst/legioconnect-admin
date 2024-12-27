"use client";
import { createReport } from "@/services/reports";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Feedback() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <section
        className="card shadow-lg"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="card-body">
          <h5 className="card-title text-center">Tell us what you think😊</h5>
          <p className="card-text text-center">
            Is it a bug? Is it a feature request? It could be a compliment. We
            would love to hear your feedback!
          </p>

          <section>
            <Formik
              initialValues={{
                report_type: "",
                title: "",
                description: "",
              }}
              onSubmit={async (values, { resetForm }) => {
                setLoading(true);
                try {
                  await createReport(values);
                  setLoading(false);
                  toast?.success("We have received your feedback!🫠");
                  resetForm();
                } catch (error) {
                  toast?.error("Error submitting feedback");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="report_type" className="form-label">
                      I would like to:
                    </label>
                    <Field
                      as="select"
                      id="report_type"
                      name="report_type"
                      className="form-select"
                      onChange={(e) =>
                        setFieldValue("report_type", e.target.value)
                      }
                    >
                      <option value="">Select an option</option>
                      <option value="bug">Report a bug</option>
                      <option value="suggestion">Suggest an improvement</option>
                      <option value="feature">Request a feature</option>
                      <option value="feedback">Give feedback</option>
                      <option value="compliment">Give a compliment</option>
                    </Field>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      placeholder="Give us a hint..."
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      className="form-control"
                      placeholder="Tell us more about your feedback..."
                    />
                  </div>

                  <button type="submit" className="btn" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Feedback;
