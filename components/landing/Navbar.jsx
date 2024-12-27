"use client";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-style mb-3 shadow">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand text-white fw-bold">
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
            <li className="nav-item">
              <Link
                href="/"
                className="nav-link text-white fw-bold"
                aria-current="page"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/feedback"
                className="nav-link text-white fw-bold"
                aria-current="page"
              >
                Talk to us
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/privacy-policy"
                className="nav-link text-white fw-bold"
                aria-current="page"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
