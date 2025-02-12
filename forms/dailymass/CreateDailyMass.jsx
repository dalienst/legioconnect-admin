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
    <div className="container">
      <Formik
        initialValues={{
          title: "",
          lectionary: "",
          reading_one: "",
          reading_one_text: "",
          psalm: "",
          responsorial_psalm: "",
          reading_two: "",
          reading_two_text: "",
          alleluia: "",
          alleluia_text: "",
          gospel: "",
          gospel_text: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
              formData.append(key, value);
            });

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
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="lectionary" className="form-label">
                  Lectionary
                </label>
                <Field className="form-control" name="lectionary" />
              </div>
              {/* Title */}
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <Field className="form-control" name="title" />
              </div>
            </div>

            {/* Reading One Text */}
            <div>
              <label>Reading One Text</label>
              <TextEditor
                value={values.reading_one_text}
                onModelChange={(content) =>
                  setFieldValue("reading_one_text", content)
                }
              />
            </div>

            {/* Reading Two Text */}
            <div>
              <label>Reading Two Text</label>
              <TextEditor
                value={values.reading_two_text}
                onModelChange={(content) =>
                  setFieldValue("reading_two_text", content)
                }
              />
            </div>

            {/* Gospel Text */}
            <div>
              <label>Gospel Text</label>
              <TextEditor
                value={values.gospel_text}
                onModelChange={(content) =>
                  setFieldValue("gospel_text", content)
                }
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Submitting..." : "Create Daily Mass"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateDailyMass;
