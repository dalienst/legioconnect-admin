"use client";
import TextEditor from "@/components/froala/TextEditor";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { createDailyMass } from "@/services/dailymass";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CreateDailyMass({ refetchDailyMass, closeModal }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();

  return (
    <div className="container py-3">
      <Formik
        initialValues={{
          title: "",
          mass_date: "",
          lectionary: "",
          reading_one: "",
          reading_one_text: "",
          psalm: "",
          responsorial_psalm: "",
          reading_two: "",
          reading_two_text: "",
          gospel: "",
          gospel_text: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("mass_date", values.mass_date);
            formData.append("lectionary", values.lectionary);
            formData.append("reading_one", values.reading_one);
            formData.append("reading_one_text", values.reading_one_text);
            formData.append("psalm", values.psalm);
            formData.append("responsorial_psalm", values.responsorial_psalm);
            formData.append("reading_two", values.reading_two);
            formData.append("reading_two_text", values.reading_two_text);
            formData.append("gospel", values.gospel);
            formData.append("gospel_text", values.gospel_text);

            await createDailyMass(formData, axios);
            toast.success("Daily Mass created successfully!");
            refetchDailyMass();
            closeModal();
          } catch (error) {
            toast.error("Something went wrong!");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="row">
              <div className="mb-3 col-md-4 col-sm-12">
                <label htmlFor="title" className="form-label fw-semibold">
                  Title
                </label>
                <Field
                  className="form-control"
                  name="title"
                  placeholder="Wednesday of the Fifth Week in Ordinary Time"
                />
              </div>

              <div className="mb-3 col-md-4 col-sm-12">
                <label htmlFor="mass_date" className="form-label">
                  Mass Date
                </label>
                <input
                  type="date"
                  name="mass_date"
                  id="mass_date"
                  className="form-control"
                  value={values.mass_date} // Bind value to Formik state
                  onChange={(e) => setFieldValue("mass_date", e.target.value)}
                />
              </div>

              <div className="mb-3 col-md-4 col-sm-12">
                <label htmlFor="lectionary" className="form-label fw-semibold">
                  Lectionary
                </label>
                <Field
                  className="form-control"
                  name="lectionary"
                  placeholder="Lectionary: 331"
                />
              </div>
            </div>

            {/* Reading One*/}
            <div>
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="reading_one" className="form-label fw-semibold">
                  Reading One
                </label>
                <Field
                  className="form-control"
                  name="reading_one"
                  placeholder="Genesis 2:4b-9, 15-17"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Reading One Text
                </label>
                <TextEditor
                  value={values.reading_one_text}
                  onModelChange={(content) =>
                    setFieldValue("reading_one_text", content)
                  }
                />
              </div>
            </div>

            {/* Psalms */}
            <div>
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="psalm" className="form-label fw-semibold">
                  Psalm
                </label>
                <Field
                  className="form-control"
                  name="psalm"
                  placeholder="Psalm 1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="responsorial_psalm" className="form-label">
                  Responsorial Psalm
                </label>
                <TextEditor
                  value={values?.responsorial_psalm}
                  onModelChange={(content) =>
                    setFieldValue("responsorial_psalm", content)
                  }
                />
              </div>
            </div>

            {/* Reading Two Text */}
            <div>
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="reading_two" className="form-label fw-semibold">
                  Reading Two
                </label>
                <Field
                  className="form-control"
                  name="reading_two"
                  placeholder="Genesis 2:4b-9, 15-17"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Reading Two Text
                </label>
                <TextEditor
                  value={values.reading_two_text}
                  onModelChange={(content) =>
                    setFieldValue("reading_two_text", content)
                  }
                  className="form-control"
                />
              </div>
            </div>

            {/* Gospel Text */}
            <div>
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="gospel" className="form-label fw-semibold">
                  Gospel
                </label>
                <Field
                  className="form-control"
                  name="gospel"
                  placeholder="John 3:16"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Gospel Text</label>
                <TextEditor
                  value={values.gospel_text}
                  onModelChange={(content) =>
                    setFieldValue("gospel_text", content)
                  }
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateDailyMass;
