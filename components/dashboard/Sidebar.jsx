"use client";
import { useFetchAccount } from "@/hooks/accounts/actions";
import Image from "next/image";
import React from "react";
import LoadingSpinner from "../general/LoadingSpinner";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const {
    isLoading: isLoadingAccount,
    data: account,
    refetch: refetchAccount,
  } = useFetchAccount();

  const pathname = usePathname();

  if (isLoadingAccount) return <LoadingSpinner />;

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      {/* top */}
      <div>
        <div className="d-flex align-items-center gap-2 mt-2 mb-2">
          <Image
            src="/icon.png"
            className="rounded"
            alt="logo"
            width={35}
            height={35}
          />
          <h5 className="mb-0">LegioConnect</h5>
        </div>
        <hr className="w-100" />

        <div className="card w-100 px-1 py-2 mb-3">
          <div className="d-flex align-items-center gap-2">
            <div>
              <Image
                src="/icon.png"
                className="rounded"
                alt="logo"
                width={35}
                height={35}
              />
            </div>

            <div>
              <h6 className="card-title fw-semibold mb-0">
                {account?.first_name}
              </h6>
            </div>
          </div>
        </div>

        <h6 className="text-muted text-uppercase" style={{ fontSize: "12px" }}>
          Main Menu
        </h6>
        {/* Menu Links */}
        <div className="mb-1 w-100 p-2 sidebar-btn rounded border">
          <Link
            href="/dashboard"
            className={`${
              pathname === "/dashboard"
                ? "nav-link text-info"
                : "nav-link  text-dark"
            }`}
          >
            Dashboard
          </Link>
        </div>

        <div className="mb-1 w-100 p-2 sidebar-btn rounded border">
          <Link
            href="/kitapLemo"
            className={`${
              pathname === "/kitapLemo"
                ? "nav-link text-info"
                : "nav-link  text-dark"

            }`}
          >
            KitapLemo
          </Link>
        </div>

        <div className="mb-1 w-100 p-2 sidebar-btn rounded border">
          <Link
            href="/dailymass"
            className={`${
              pathname === "/dailymass"
                ? "nav-link text-info"
                : "nav-link  text-dark"
            }`}
          >
            Daily Mass
          </Link>
        </div>

        <div className="mb-1 w-100 p-2 sidebar-btn rounded border">
          <Link
            href="/users"
            className={`${
              pathname === "/users"
                ? "nav-link text-info"
                : "nav-link text-dark"
            }`}
          >
            Users
          </Link>
        </div>

        <div className="mb-1 w-100 p-2 sidebar-btn rounded border">
          <Link
            href="/verses"
            className={`${
              pathname === "/verses"
                ? "nav-link text-info"
                : "nav-link text-dark"
            }`}
          >
            Daily Verse
          </Link>
        </div>

        <div className="mb-1 w-100 p-2 sidebar-btn rounded border">
          <Link
            href="/reports"
            className={`${
              pathname === "/reports"
                ? "nav-link text-info"
                : "nav-link text-dark"
            }`}
          >
            App Reports & Feedback
          </Link>
        </div>

        <div className="mb-1 w-100 p-2 sidebar-btn rounded border">
          <Link
            href="/deletion-requests"
            className={`${
              pathname === "/deletion-requests"
                ? "nav-link text-info"
                : "nav-link text-dark"
            }`}
          >
            Account Deletion
          </Link>
        </div>

        <div className="mb-1 w-100 p-2 sidebar-btn rounded border">
          <Link
            href="/settings"
            className={`${
              pathname === "/settings"
                ? "nav-link text-info"
                : "nav-link text-dark"
            }`}
          >
            Settings
          </Link>
        </div>
      </div>

      {/* bottom */}
      <div>
        <h6 className="text-muted text-uppercase" style={{ fontSize: "12px" }}>
          Actions
        </h6>
        <hr className="mb-0 w-100" />
        <div className="mb-1 w-100 p-2">
          <button onClick={() => signOut()} className="nav-link text-danger">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
