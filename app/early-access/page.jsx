"use client";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { createEarlyAccess } from "@/services/earlyaccess";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function EarlyAccess() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
              Join the Mobile Application Early Access Programme
            </h5>
            <p className="card-text text-center text-muted">
              Join the Mobile Application Early Access Programme. Be among the
              first to test our mobile application.
            </p>

            <section>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  contact: "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  setLoading(true);
                  try {
                    await createEarlyAccess(values);
                    setLoading(false);
                    toast?.success(
                      "Your early access request has been received!🫠🥳"
                    );
                    resetForm();
                    router?.push("/");
                  } catch (error) {
                    toast?.error(
                      "Error submitting request! Please try again later"
                    );
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {({}) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="contact" className="form-label">
                        Phone Number
                      </label>
                      <Field
                        type="contact"
                        id="contact"
                        name="contact"
                        className="form-control"
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

export default EarlyAccess;
