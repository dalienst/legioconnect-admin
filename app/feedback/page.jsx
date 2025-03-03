"use client";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { createReport } from "@/services/reports";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Feedback() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <section
          className="card shadow-lg border-0"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="card-body">
            <h5 className="card-title text-center" style={{ color: "#4b1719" }}>
              Tell us what you think😊
            </h5>
            <p className="card-text text-center text-muted">
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
                        <option value="Bug">Report a bug</option>
                        <option value="Suggestion">
                          Suggest an improvement
                        </option>
                        <option value="Feature">Request a feature</option>
                        <option value="Feedback">Give feedback</option>
                        <option value="Compliment">Give a compliment</option>
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
      <Footer />
    </>
  );
}

export default Feedback;
