"use client";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AccountDeletion() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="container py-5 px-4">
      <section className="mb-4">
        <h1 className="text-center mb-3" style={{ color: "#4b1719" }}>
          Account Deletion Request
        </h1>
        <p className="text-center">
          Please fill out the form below to request the deletion of your
          account.
        </p>
      </section>
      <section className="card p-4">
        <Formik
          initialValues={{ email: "", reason: "" }}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            try {
              await axios?.post("https://formspree.io/f/xqaakzbq", values);
              toast?.success("Deletion request submitted successfully!");
              resetForm();
            } catch (error) {
              setIsLoading(false);
              toast?.error("Something went wrong, please try again later.");
            }
          }}
        >
          {({ values }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Enter email associated with your account
                </label>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="reason" className="form-label">
                  Reason for deletion
                </label>
                <Field
                  name="reason"
                  type="text"
                  className="form-control"
                  as="textarea"
                  placeholder="Why would you like to delete your account?"
                  rows="4"
                />
              </div>

              <div className="d-flex justify-content-center">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-danger btn-lg px-4"
                >
                  {isLoading ? "Submitting..." : "Request Deletion"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}

export default AccountDeletion;
