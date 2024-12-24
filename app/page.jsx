"use client";
import Navbar from "@/components/landing/Navbar";
import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <div className="container py-3">
        <Navbar />
        <section className="mt-5">
          <h1 className="text-center">Welcome to LegioConnect</h1>
          <p className="text-center lead">
            LegioConnect is an application created for members of Legio Maria
            and those interested in learning more about the faith. It offers
            rich content on Legio Maria’s history, prayers, and the Bible, for
            deeper engagement with the faith.
          </p>
        </section>
      </div>
    </>
  );
}
