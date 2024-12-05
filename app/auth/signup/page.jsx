"use client";
import { signUpStaff } from "@/tools/api";
import { RegistrationSchema } from "@/validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="auth-screen px-2">
      <div
        className="card shadow-sm p-4 rounded"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-3">Sign Up</h3>
        <p className="text-center text-muted">
          Create your account to get started
        </p>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegistrationSchema}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              await signUpStaff(values);
              toast.success("Registration successful!");
              router.push("/auth/login");
            } catch (error) {
              console.log(error);
              if (
                error?.response?.data?.email?.[0] ||
                error?.response?.data?.username?.[0]
              ) {
                toast.error("User already exists");
              } else {
                toast.error("Registration Failed");
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ touched }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <Field type="text" name="first_name" className="form-control" />
                <ErrorMessage
                  name="first_name"
                  component="p"
                  className="text-danger small"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <Field type="text" name="last_name" className="form-control" />
                <ErrorMessage
                  name="last_name"
                  component="p"
                  className="text-danger small"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-danger small"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-danger small"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-danger small"
                />
              </div>
              <div className="d-grid mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />
                      Signing Up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
