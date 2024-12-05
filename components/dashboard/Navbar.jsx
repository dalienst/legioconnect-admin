"use client";

import useFetchAccount from "@/hooks/accounts/useFetchAccount";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { isLoading: isLoadingAccount, data: account } = useFetchAccount();
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-md bg-light mb-3 shadow">
      <div className="container-fluid">
        <Link href="/dashboard" className="navbar-brand">
          {account?.first_name}
        </Link>

        <button
          className="navbar-toggler border-0  text-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
          aria-controls="collapsibleNavbar"
        >
          <i className="bi bi-list text-dark"></i>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link
                href="/dashboard"
                className={`${
                  pathname === "/dashboard"
                    ? "nav-link active text-success"
                    : "nav-link text-dark"
                }`}
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item ">
              <Link
                href="/settings"
                className={`${
                  pathname === "/settings"
                    ? "nav-link active text-success"
                    : "nav-link text-dark"
                }`}
              >
                Settings
              </Link>
            </li>

            <li className="nav-item">
              <button
                onClick={() => signOut()}
                className="nav-link text-danger"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
