"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchUserDetail } from "@/hooks/accounts/actions";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import extractDate from "@/hooks/useDateFormat";
import { deleteUser } from "@/services/accounts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import toast from "react-hot-toast";

function UserDetail({ params }) {
  const userSlug = use(params);
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();
  const router = useRouter();

  const {
    isLoading: isLoadingUser,
    data: user,
    refetch: refetchUser,
  } = useFetchUserDetail(userSlug?.userSlug);

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await deleteUser(userSlug?.userSlug, axios);
      toast?.success("User deleted successfully");
      router?.push("/users");
    } catch (error) {
      toast?.error(error?.response?.data?.detail);
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingUser) return <LoadingSpinner />;

  return (
    <>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/users">All Users</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {user?.first_name} {user?.last_name}
            </li>
          </ol>
        </nav>

        <section className="mb-3 card">
          <div className="card-body">
            {user?.avatar ? (
              <Image
                src={user?.avatar}
                alt={user?.first_name}
                width={50}
                height={50}
                className="img-fluid rounded-circle"
              />
            ) : (
              <Image
                src="/profile.svg"
                alt="avatar"
                width={50}
                height={50}
                className="img-fluid rounded-circle"
              />
            )}
            <h4 className="card-title mt-3">
              {user?.first_name} {user?.last_name}
            </h4>
            <p className="card-text mb-0">
              <strong>User Email:</strong> {user?.email}
            </p>
            <p className="card-text mb-0">
              <strong>User Reference:</strong> {user?.reference}
            </p>
            <p className="card-text mb-0">
              <strong>Date Joined:</strong> {extractDate(user?.created_at)}
            </p>
            <p className="card-text mb-0">
              <strong>Highlights Created:</strong> {user?.highlights?.length}
            </p>
            <p className="card-text mb-0">
              <strong>Current Streak Count:</strong>{" "}
              {user?.current_streak_count}
            </p>
            <p className="card-text mb-0">
              <strong>Last Streak Date:</strong> {user?.last_streak_date}
            </p>

            {!user?.is_staff ? (
              <button
                onClick={handleDeleteUser}
                disabled={loading}
                className="btn mt-3"
              >
                {loading ? "Deleting..." : "Delete User"}
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
}

export default UserDetail;
