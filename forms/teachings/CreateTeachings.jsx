"use client";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { createTeaching } from "@/services/teachings";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { date } from "yup";

function CreateTeachings({ refetchTeachings, closeModal }) {
  const [loading, setLoading] = useState(false);
  const token = useAxiosAuth();

  return (
    <div className="container py-3">
      <Formik
        initialValues={{
          title: "",
          location: "",
          date: "",
          content: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            await createTeaching(values, token);
            toast.success("Teaching created successfully");
            refetchTeachings();
            closeModal();
          } catch (error) {
            toast.error("Something went wrong");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ values }) => (
          <Form>
            {/* Specific Fields */}
            <div className="row">
              <div className="mb-3 col-md-4 col-sm-12">
                <label htmlFor="title" className="form-label fw-semibold">
                  Title
                </label>
                <Field
                  className="form-control"
                  name="title"
                  placeholder="Duond Simeo Melkio"
                />
              </div>

              <div className="mb-3 col-md-4 col-sm-12">
                <label htmlFor="location" className="form-label fw-semibold">
                  Location
                </label>
                <Field
                  className="form-control"
                  name="location"
                  placeholder="Efeso Nzoia"
                />
              </div>

              <div className="mb-3 col-md-4 col-sm-12">
                <label htmlFor="date" className="form-label fw-semibold">
                  Date
                </label>
                <Field
                  className="form-control"
                  name="date"
                  type="date"
                  placeholder="Date"
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label fw-semibold">
                Content
              </label>
              <Field
                className="form-control"
                name="content"
                as="textarea"
                placeholder="Content"
                rows={15}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Create Teaching"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateTeachings;
