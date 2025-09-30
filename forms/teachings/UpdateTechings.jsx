"use client";

import RichTextEditor from "@/components/RichTextEditor";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { updateTeaching } from "@/services/teachings";
import { Field, Form, Formik } from "formik";
import { draftToMarkdown } from "markdown-draft-js";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UpdateTeachings({ teaching, refetchTeachingDetail, closeModal }) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(teaching?.content || "Prayer");

  const handleEditorChange = (draft) => {
    const markdownContent = draftToMarkdown(draft);
    setContent(markdownContent);
  };

  const token = useAxiosAuth();

  return (
    <Formik
      initialValues={{
        title: teaching?.title || "",
        location: teaching?.location || "",
        date: teaching?.date || "",
      }}
      enableReinitialize
      onSubmit={async (values) => {
        setLoading(true);
        const valuesWithContent = { ...values, content };
        try {
          await updateTeaching(teaching?.identity, valuesWithContent, token);
          toast.success("Teaching updated successfully");
          closeModal();
          refetchTeachingDetail();
        } catch (error) {
          toast.error("Something went wrong");
          console.log(error);
        } finally {
          setLoading(false);
          closeModal();
        }
      }}
    >
      {({ values }) => (
        <Form>
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
              component={RichTextEditor}
              name="content"
              onChange={handleEditorChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Update Teaching"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default UpdateTeachings;
