"use client";

import RichTextEditor from "@/components/RichTextEditor";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { createTeaching } from "@/services/teachings";
import { Field, Form, Formik } from "formik";
import { draftToMarkdown } from "markdown-draft-js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

function CreateTeachings({ refetchTeachings, closeModal }) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const handleEditorChange = (draft) => {
    const markdownContent = draftToMarkdown(draft);
    setContent(markdownContent);
  };

  const token = useAxiosAuth();

  return (
    <div className="container py-3">
      <Formik
        initialValues={{
          title: "",
          location: "",
          date: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          const valuesWithContent = { ...values, content };
          let shouldCloseModal = false;
          try {
            await createTeaching(valuesWithContent, token);
            toast.success("Teaching created successfully");
            refetchTeachings();
            shouldCloseModal = true;
          } catch (error) {
            toast.error("Something went wrong");
          } finally {
            setLoading(false);
            if (shouldCloseModal){
              closeModal();
            }
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
             
              <RichTextEditor
                onChange={handleEditorChange}
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
