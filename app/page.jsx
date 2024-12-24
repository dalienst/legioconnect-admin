"use client";
import Navbar from "@/components/landing/Navbar";
import { appFeatures } from "@/data/features";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <div className="container py-3">
        <Navbar />
        <section className="mt-5 mb-5">
          <h1 className="text-center">Welcome to LegioConnect</h1>
          <p className="text-center lead">
            LegioConnect is an application created for members of Legio Maria
            and those interested in learning more about the faith. It offers
            rich content on Legio Maria’s history, prayers, and the Bible, for
            deeper engagement with the faith.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-center">Features</h2>
          <div className="row">
            {appFeatures.map((feature) => (
              <div className="col-md-4 col-sm-12" key={feature.id}>
                <div className="card h-100">
                  <div className="card-body">
                    {feature.icon}
                    <h5 className="card-title">{feature.title}</h5>
                    <p className="card-text">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5">
          <h2 className="text-center">Get Started</h2>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <Image src="/screens.png" alt="hero" width={500} height={500} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
