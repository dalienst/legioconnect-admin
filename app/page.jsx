"use client";
import Navbar from "@/components/landing/Navbar";
import { appFeatures } from "@/data/features";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <div className="container-fluid py-5">
        <div className="container">
          <Navbar />
        </div>
        {/* Hero Section */}
        <section className="text-center mt-5 mb-5">
          <div className="container py-5">
            <h1 className="display-4 fw-bold">Welcome to LegioConnect</h1>
            <p className="lead">
              LegioConnect is an application created for members of Legio Maria
              and those interested in learning more about the faith. It offers
              rich content on Legio Maria’s history, prayers, and the Bible, for
              deeper engagement with the faith.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-5 bg-light py-5">
          <div className="container">
            <h2 className="text-center mb-4">Features</h2>
            <div className="row g-4">
              {appFeatures.map((feature) => (
                <div className="col-md-4 col-sm-6" key={feature.id}>
                  <div className="card h-100 text-center shadow-sm">
                    <div className="card-body">
                      <div className="mb-3">{feature.icon}</div>
                      <h5 className="card-title fw-bold">{feature.title}</h5>
                      <p className="card-text">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="mb-5 py-5">
          {/* <h2 className="text-center mb-4">Get Started</h2> */}
          <div className="row align-items-center g-2">
            <div className="col-md-6 text-center">
              <Image
                src="/screens.png"
                alt="hero"
                width={500}
                height={500}
                className="img-fluid"
              />
            </div>

            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Download the app to get started</h5>
              
              <div className="d-flex align-items-center">
                {/* Google Play Store */}
                <Link
                  href=""
                  className="btn btn-success d-flex align-items-center me-3"
                >
                  <Image
                    src="/playstore.png"
                    alt="google-play"
                    width={24}
                    height={24}
                    className="me-2"
                  />
                  Android Play Store
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
