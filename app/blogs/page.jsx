"use client";
import BlogCard from "@/components/blogs/BlogCard";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { useFetchTeachings } from "@/hooks/teachings/actions";
import React, { useState, useMemo } from "react";

function Blogs() {
  const {
    isLoading: isLoadingBlogs,
    data: blogs,
    error: errorBlogs,
    refetch: refetchBlogs,
  } = useFetchTeachings();

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Extract unique locations and years for filters
  const locations = useMemo(() => {
    if (!blogs) return [];
    return [...new Set(blogs.map((blog) => blog.location))].sort();
  }, [blogs]);

  const years = useMemo(() => {
    if (!blogs) return [];
    return [
      ...new Set(blogs.map((blog) => new Date(blog.date).getFullYear())),
    ].sort((a, b) => b - a);
  }, [blogs]);

  // Filter blogs based on search and filters
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = selectedLocation
        ? blog.location === selectedLocation
        : true;
      const matchesYear = selectedYear
        ? new Date(blog.date).getFullYear() === parseInt(selectedYear)
        : true;
      return matchesSearch && matchesLocation && matchesYear;
    });
  }, [blogs, searchQuery, selectedLocation, selectedYear]);

  if (isLoadingBlogs) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <div className="container py-4 min-vh-100">
        <section className="mb-4">
          <h1 className="text-center fw-bold display-4 text-dark mb-4">
            Legio Maria Teachings
          </h1>

          {/* Search and Filter Section */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control rounded-pill shadow-sm"
                placeholder="Search by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search teachings"
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select rounded-pill shadow-sm"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                aria-label="Filter by location"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select rounded-pill shadow-sm"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filter by year"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Blogs Section */}
        <section>
          {filteredBlogs.length > 0 ? (
            <div className="row">
              {filteredBlogs.map((blog) => (
                <div key={blog.reference} className="col-md-6 col-lg-4 mb-4">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card shadow-sm border-light">
              <div className="card-body text-center">
                <h5 className="card-title text-muted">
                  No teachings found. Try adjusting your filters or keep an eye
                  out for new teachings.
                </h5>
              </div>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Blogs;
