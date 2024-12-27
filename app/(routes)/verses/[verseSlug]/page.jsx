"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchDailyVerseDetail } from "@/hooks/dailyverse/dailyverse";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { deleteDailyVerse, updateDailyVerse } from "@/services/dailyverse";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import toast from "react-hot-toast";

function VerseDetail({ params }) {
  const verseSlug = use(params);

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const axios = useAxiosAuth();
  const router = useRouter();

  const {
    isLoading: isLoadingVerse,
    data: verse,
    refetch: refetchVerse,
  } = useFetchDailyVerseDetail(verseSlug?.verseSlug);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteDailyVerse(verseSlug?.verseSlug, axios);
      toast?.success("Verse deleted successfully");
      router?.push("/verses");
    } catch (error) {
      toast?.error("Error deleting verse");
    } finally {
      setDeleting(false);
    }
  };

  if (isLoadingVerse) return <LoadingSpinner />;

  return (
    <>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/verses">Daily Verses</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Verse Detail
            </li>
          </ol>
        </nav>

        <div className="card mb-3">
          <section className="d-flex justify-content-between mb-3 card-header">
            <div>
              <h3 className="dash-text">
                {verse?.verse_reference} - {verse?.active_date}
              </h3>
            </div>

            <button className="btn" onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <span className="spinner-border spinner-border-sm text-danger"></span>
              ) : (
                <i className="bi bi-trash"></i>
              )}
            </button>
          </section>

          <section className="mb-3 card-body">
            <Formik
              initialValues={{
                image: null,
                verse_reference: verse?.verse_reference || "",
                verse_text: verse?.verse_text || "",
                active_date: verse?.active_date || "",
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

                  await updateDailyVerse(verseSlug?.verseSlug, formData, axios);
                  toast?.success("Daily Verse updated successfully!");
                  refetchVerse();
                  setLoading(false);
                } catch (error) {
                  if (error?.response?.data?.active_date) {
                    toast.error(error?.response?.data?.active_date[0]);
                  } else {
                    toast.error("Something went wrong!");
                  }
                } finally {
                  setLoading(false);
                }
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="d-flex gap-3 align-items-center mb-3">
                    <div>
                      {verse?.image ? (
                        <Image
                          src={verse?.image}
                          alt="image"
                          width={100}
                          height={100}
                          className="img-fluid"
                        />
                      ) : (
                        <Image
                          src="/profile.svg"
                          alt="image"
                          width={100}
                          height={100}
                          className="img-fluid"
                        />
                      )}
                    </div>

                    <div>
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                        }}
                      />
                    </div>
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
                      placeholder={verse?.active_date || "Enter Active Date"}
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
                      placeholder={
                        verse?.verse_reference || "Enter Verse Reference"
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="verse_text" className="form-label">
                      Verse Text
                    </label>
                    <Field
                      as="textarea"
                      className="form-control"
                      type="text"
                      id="verse_text"
                      name="verse_text"
                      rows="10"
                      placeholder={verse?.verse_text || "Enter Verse Text"}
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
          </section>
        </div>
      </div>
    </>
  );
}

export default VerseDetail;
