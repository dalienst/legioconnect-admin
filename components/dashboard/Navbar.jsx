"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-md navbar-style mb-3 shadow">
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

            <li className="nav-item">
              <Link
                href="/users"
                className={`${
                  pathname === "/users"
                    ? "nav-link text-info"
                    : "nav-link text-white"
                }`}
              >
                Users & Accounts
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
