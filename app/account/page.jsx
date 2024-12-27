"use client";
import { accountDeletionRequest } from "@/services/accounts";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AccountDeletion() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <section className="card shadow-lg border-0">
        <div className="card-body">
          <h5
            className="card-title text-center mb-3"
            style={{ color: "#4b1719" }}
          >
            Account Deletion Request
          </h5>
          <p className="text-center text-muted">
            Please fill out the form below to request the deletion of your
            account.
          </p>
          <Formik
            initialValues={{ email: "", reason: "" }}
            onSubmit={async (values, { resetForm }) => {
              setIsLoading(true);
              try {
                await accountDeletionRequest(values);
                toast?.success("Deletion request submitted successfully!");
                resetForm();
              } catch (error) {
                if (error?.response?.data?.email[0]) {
                  toast?.error(error?.response?.data?.email[0]);
                } else {
                  toast?.error("Something went wrong, please try again later.");
                }
              } finally {
                setIsLoading(false);
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
                    required
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
                    required
                  />
                </div>

                <button disabled={isLoading} type="submit" className="btn">
                  {isLoading ? "Submitting..." : "Request Deletion"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
}

export default AccountDeletion;
