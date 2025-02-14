"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar sticky-top navbar-expand-md navbar-style mb-3">
      <div className="container-fluid">
        <Link href="/dashboard" className="navbar-brand text-white fw-bold">
          LegioConnect
        </Link>

        <button
          className="navbar-toggler border-0  "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
          aria-controls="collapsibleNavbar"
        >
          <i className="bi bi-list text-white"></i>
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
                    ? "nav-link text-info"
                    : "nav-link  text-white"
                }`}
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item ">
              <Link
                href="/kitapLemo"
                className={`${
                  pathname === "/kitapLemo"
                    ? "nav-link text-info"
                    : "nav-link  text-white"
                }`}
              >
                KitapLemo
              </Link>
            </li>

            <li className="nav-item ">
              <Link
                href="/dailymass"
                className={`${
                  pathname === "/dailymass"
                    ? "nav-link text-info"
                    : "nav-link  text-white"
                }`}
              >
                Daily Mass
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/users"
                className={`${
                  pathname === "/users"
                    ? "nav-link text-info"
                    : "nav-link text-white"
                }`}
              >
                Users
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/verses"
                className={`${
                  pathname === "/verses"
                    ? "nav-link text-info"
                    : "nav-link text-white"
                }`}
              >
                Daily Verse
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/reports"
                className={`${
                  pathname === "/reports"
                    ? "nav-link text-info"
                    : "nav-link text-white"
                }`}
              >
                App Reports & Feedback
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/deletion-requests"
                className={`${
                  pathname === "/deletion-requests"
                    ? "nav-link text-info"
                    : "nav-link text-white"
                }`}
              >
                Account Deletion
              </Link>
            </li>

            <li className="nav-item ">
              <Link
                href="/settings"
                className={`${
                  pathname === "/settings"
                    ? "nav-link text-info"
                    : "nav-link text-white"
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
