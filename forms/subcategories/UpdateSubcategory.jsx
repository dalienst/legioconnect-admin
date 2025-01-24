import useAxiosAuth from "@/hooks/useAxiosAuth";
import { updateSubcategory } from "@/services/subcategories";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UpdateSubcategory({ category, refetch, closeModal, subcategory }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();

  return (
    <>
      <Formik
        initialValues={{
          category: subcategory?.category || "",
          name: subcategory?.name || "",
          position: subcategory?.position || "",
          tod: subcategory?.tod || "",
          description: subcategory?.description || "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const formData = new FormData();
            formData.append("category", values.category);
            formData.append("name", values.name);
            formData.append("position", values.position);
            formData.append("tod", values.tod);
            formData.append("description", values.description);
            await updateSubcategory(subcategory?.reference, formData, axios);
            toast.success("Subcategory created successfully!");
            refetch();
            closeModal();
          } catch (error) {
            if (error?.response?.data?.name) {
              toast.error(error?.response?.data?.name[0]);
            } else {
              toast.error("Something went wrong!");
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
                  <option value="" disabled>
                    {subcategory?.category?.name}
                  </option>
                  {category.map((item) => (
                    <option key={item?.id} value={item?.reference}>
                      {item?.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder={subcategory?.name || ""}
                />
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
                    placeholder={subcategory?.position || ""}
                  />
                </div>

                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="form-label">Time Of Day</label>
                  <Field as="select" name="tod" className="form-select">
                    <option value={subcategory?.tod} disabled>
                      {subcategory?.tod || ""}
                    </option>
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
                  placeholder={subcategory?.description || ""}
                />
              </div>

              <button
                type="submit"
                className="btn btn-connect w-100"
                disabled={loading}
              >
                {loading ? "Loading..." : "Update"}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default UpdateSubcategory;
