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
      <div className="container-fluid py-5"></div>
    </>
  );
}
