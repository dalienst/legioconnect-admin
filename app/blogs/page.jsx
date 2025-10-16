"use client";
import BlogCard from "@/components/blogs/BlogCard";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { useFetchTeachings } from "@/hooks/teachings/actions";
import React from "react";

function Blogs() {
  const {
    isLoading: isLoadingBlogs,
    data: blogs,
    error: errorBlogs,
    refetch: refetchBlogs,
  } = useFetchTeachings();

  if (isLoadingBlogs) return LoadingSpinner();

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <section className="mb-3">
          <h1 className="text-center fw-bold">Legio Maria Teachings</h1>
        </section>

        {/* Blogs */}
        <section>
          {blogs?.length > 0 ? (
            <>
              <div className="row">
                {blogs?.map((blog) => (
                  <div key={blog.reference} className="col-md-6 mb-3">
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Keep an eye out for new teachings
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
