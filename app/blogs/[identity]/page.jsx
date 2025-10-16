"use client";

import Navbar from "@/components/landing/Navbar";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchTeachingDetail } from "@/hooks/teachings/actions";
import { useParams } from "next/navigation";
import React from "react";
import Footer from "@/components/landing/Footer";
import Markdown from "@/components/Markdown";
import extractDate from "@/hooks/useDateFormat";

function BlogIdentity() {
  const { identity } = useParams();

  const { isLoading: isLoadingBlogDetail, data: blog } =
    useFetchTeachingDetail(identity);

  if (isLoadingBlogDetail) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="container py-4 vh-100">
        {/* header */}
        <section className="mb-3">
          <h1 className="text-center fw-bold">{blog?.title}</h1>

          <p className="text-center w-75 mx-auto text-muted lead">
            {blog?.location} - {blog?.date}
          </p>
        </section>

        {/* Content */}
        <section className="mb-3">
          <p className="text-muted small">{extractDate(blog?.created_at)}</p>
          <Markdown>{blog?.content}</Markdown>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default BlogIdentity;
