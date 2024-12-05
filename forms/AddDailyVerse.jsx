"use client";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { createDailyVerse } from "@/services/dailyverse";
import { Field, Form, Formik } from "formik";
import React, { useState, version } from "react";
import toast from "react-hot-toast";

function AddDailyVerse({ refetch, handleCloseModal }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();

  return (
    <>
      <Formik
        initialValues={{
          image: null,
          verse_reference: "",
          verse_text: "",
          active_date: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const formData = new FormData();
            if (values.image) {
              formData.append("image", values.image);
            }
            formData.append("verse_reference", values.verse_reference);
            formData.append("verse_text", values.verse_text);
            formData.append("active_date", values.active_date);

            await createDailyVerse(formData, axios);
            toast?.success("Daily Verse created successfully!");
            refetch();
            handleCloseModal();
            setLoading(false);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="verse_reference" className="form-label">
                Verse Reference: (Ex: John 3:16)
              </label>
              <Field
                className="form-control"
                type="text"
                id="verse_reference"
                name="verse_reference"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="verse_text" className="form-label">
                Verse Text
              </label>
              <Field
                className="form-control"
                type="text"
                id="verse_text"
                name="verse_text"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="active_date" className="form-label">
                Active Date
              </label>
              <Field
                className="form-control"
                type="date"
                id="active_date"
                name="active_date"
              />
            </div>

            <button
              type="submit"
              className="btn btn-connect w-100"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddDailyVerse;
