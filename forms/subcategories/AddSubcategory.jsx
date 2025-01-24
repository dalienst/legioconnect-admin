import useAxiosAuth from "@/hooks/useAxiosAuth";
import { createSubcategory } from "@/services/subcategories";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddSubcategory({ category, refetch, closeModal }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();

  return (
    <>
      <Formik
        initialValues={{
          category: "",
          name: "",
          position: "",
          tod: "",
          description: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            await createSubcategory(values, axios);
            toast?.success("Subcategory created successfully!");
            refetch();
            closeModal();
          } catch (error) {
            if (error?.response?.data?.name) {
              toast?.error("Subcategory name already exists!");
            } else {
              toast?.error("Something went wrong!");
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ values }) => (
          <>
            <Form>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <Field as="select" name="category" className="form-select">
                  <option value="">Select Category</option>
                  {category.map((item) => (
                    <option key={item?.id} value={item?.reference}>
                      {item?.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <Field type="text" name="name" className="form-control" />
              </div>

              <div className="row">
                <div className="mb-3 col-md-6 col-sm-12">
                  <label htmlFor="position" className="form-label">
                    Position
                  </label>
                  <Field
                    type="number"
                    name="position"
                    className="form-control"
                  />
                </div>

                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="form-label">Time Of Day</label>
                  <Field as="select" name="tod" className="form-select">
                    <option value="">Select Time Of Day</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                    <option value="other">Other</option>
                  </Field>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="form-control"
                />
              </div>

              <button
                type="submit"
                className="btn"
                disabled={loading}
              >
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
          </>
        )}
      </Formik>
    </>
  );
}

export default AddSubcategory;
