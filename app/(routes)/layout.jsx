"use client";
import Navbar from "@/components/dashboard/Navbar";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
