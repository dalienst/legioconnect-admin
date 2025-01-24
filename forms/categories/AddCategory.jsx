"use client";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { createCategory } from "@/services/category";
import { Field, Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";

function AddCategory({ refetch, closeModal }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          description: "",
          position: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            await createCategory(values, axios);
            toast.success("Category created successfully!");
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
        <Form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Category Name
            </label>
            <Field type="text" name="name" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Position
            </label>
            <Field type="number" name="position" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <Field
              as="textarea"
              type="text"
              name="description"
              className="form-control"
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
      </Formik>
    </>
  );
}

export default AddCategory;
