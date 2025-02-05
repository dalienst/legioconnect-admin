"use client";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Fixed Sidebar */}
        <div className="col-lg-2 d-none d-lg-block bg-light border-end position-fixed vh-100 overflow-auto">
          <Sidebar />
        </div>

        {/* Main content with margin to avoid overlap */}
        <div className="col-lg-10 offset-lg-2 col-sm-12 vh-100 overflow-auto">
          <div className="container-fluid py-2">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
