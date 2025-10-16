"use client";
import Link from "next/link";
import React from "react";
import Markdown from "../Markdown";
import extractDate from "@/hooks/useDateFormat";

// Utility function to truncate text
const truncateText = (text, maxLength = 120) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

function BlogCard({ blog }) {
  return (
    <>
      <div className="card h-100">
        <div className="card-body">
          <Link
            href={`/blogs/${blog?.identity}`}
            className="card-title text-decoration-none h5 fw-bold text-dark d-block mb-2 text-truncate"
          >
            {blog?.title}
          </Link>
          <h6 className="card-subtitle mb-3 text-muted text-truncate">
            {blog?.location} - {blog?.date}
          </h6>

          <p className="card-text text-muted small mb-2">
            {extractDate(blog?.created_at)}
          </p>

          {/* Truncate the content before passing to Markdown */}
          <Markdown>{truncateText(blog?.content)}</Markdown>
        </div>

        <div className="card-footer bg-transparent border-0 p-4 pt-0">
          <Link
            href={`/blogs/${blog.identity}`}
            className="btn btn-outline-primary btn-sm"
            aria-label={`Read more about ${blog?.title}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
