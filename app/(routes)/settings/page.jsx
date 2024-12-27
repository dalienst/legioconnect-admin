"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchAccount } from "@/hooks/accounts/actions";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import useUserId from "@/hooks/useUserId";
import { updateUser } from "@/services/accounts";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const userId = useUserId();
  const axios = useAxiosAuth();

  const {
    isLoading: isLoadingAccount,
    data: profile,
    refetch: refetchProfile,
  } = useFetchAccount();

  if (isLoadingAccount) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Account Settings
          </li>
        </ol>
      </nav>
      <article className="card">
        <h3 className="card-header bg-white">Account Settings</h3>

        <div className="card-body">
          <Formik
            initialValues={{
              avatar: null,
              first_name: profile?.first_name || "",
              last_name: profile?.last_name || "",
            }}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                const formData = new FormData();
                if (values?.avatar) {
                  formData.append("avatar", values?.avatar);
                }
                formData.append("first_name", values?.first_name);
                formData.append("last_name", values?.last_name);

                await updateUser(userId, formData, axios);
                toast?.success("Profile updated successfully!");
                setLoading(false);
                refetchProfile();
              } catch (error) {
                toast?.error("Something went wrong, please try again later.");
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="d-flex gap-3 align-items-center">
                  <div>
                    {profile?.avatar ? (
                      <Image
                        src={profile.avatar}
                        alt="avatar"
                        width={60}
                        height={60}
                        className="img-fluid rounded-circle"
                      />
                    ) : (
                      <Image
                        src="/profile.svg"
                        alt="avatar"
                        width={60}
                        height={60}
                        className="img-fluid rounded-circle"
                      />
                    )}
                  </div>

                  <div>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(event) => {
                        setFieldValue("avatar", event.currentTarget.files[0]);
                      }}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label className="form-label">First Name</label>
                    <Field
                      type="text"
                      name="first_name"
                      className="form-control"
                      id="first_name"
                      placeholder={profile?.first_name || "First Name"}
                    />
                  </div>

                  <div className="col-md-6 col-sm-12 mb-3">
                    <label className="form-label">Last Name</label>
                    <Field
                      type="text"
                      name="last_name"
                      className="form-control"
                      id="last_name"
                      placeholder={profile?.last_name || "Last Name"}
                    />
                  </div>
                </div>

                <button type="submit" className="btn" disabled={loading}>
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </article>
    </div>
  );
}
