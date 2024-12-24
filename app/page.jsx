"use client";
import Navbar from "@/components/landing/Navbar";
import { appFeatures } from "@/data/features";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <section className="mb-3">
          <h1 className="text-center fw-bold">LegioConnect Application</h1>
          <p className="text-center w-75 mx-auto text-muted lead">
            LegioConnect is an application created for members of Legio Maria
            and those interested in learning more about the faith. It offers
            rich content on Legio Maria’s history, prayers, and the Bible, for
            deeper engagement with the faith.
          </p>
          <div className="text-center">
            <Link
              href="https://play.google.com/apps/testing/com.dalienst.legioconnect"
              target="_blank"
              className="d-inline-flex align-items-center gap-2"
              style={{ width: "auto" }}
            >
              <Image
                src="/preregister.png"
                alt="playstore"
                width={200}
                height={100}
                className="img-fluid"
              />
            </Link>
          </div>

          <div className="mt-3 text-center">
            <Image
              src="/spaced.png"
              alt="land"
              className="img-fluid"
              width={1000}
              height={500}
            />
          </div>
        </section>
      </div>
    </>
  );
}
