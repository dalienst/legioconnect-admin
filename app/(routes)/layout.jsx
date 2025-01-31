"use client";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-lg-2 d-none d-lg-block bg-light border-end">
          <Sidebar />
        </div>

        {/* main content */}
        <div className="col-lg-10 col-sm-12">
          <div className="container-fluid py-2">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
