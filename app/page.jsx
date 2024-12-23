"use client";
import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
      <h1 className="hero-text mb-4">Welcome to LegioConnect</h1>
      <p className="text-center text-muted mb-4">
        Connect, collaborate, and engage with your community like never before.
      </p>
      {/* <Link className="btn hero-btn btn-lg" href="/auth/login">
        Get Started
      </Link> */}
    </div>
  );
}
