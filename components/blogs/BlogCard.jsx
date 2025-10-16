"use client";
import Link from "next/link";
import React from "react";
import Markdown from "../Markdown";

// Utility function to truncate text
const truncateText = (text, maxLength = 120) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

function BlogCard({ blog }) {
  return (
    <div
      className="card h-100 shadow-sm border-0"
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
      }}
    >
      <div className="card-body p-4">
        <Link
          href={`/blogs/${blog?.identity}`}
          className="card-title text-decoration-none h5 fw-bold text-dark d-block mb-3"
          style={{ lineHeight: "1.4" }}
        >
          {blog?.title}
        </Link>
        <h6 className="card-subtitle text-muted mb-3">
          <i className="bi bi-geo-alt me-1"></i> {blog?.location} |{" "}
          <i className="bi bi-calendar3 me-1"></i>{" "}
          {new Date(blog?.date).toLocaleDateString()}
        </h6>
        <Markdown>{truncateText(blog?.content)}</Markdown>
      </div>
      <div className="card-footer bg-transparent border-0 p-4 pt-0">
        <Link
          href={`/blogs/${blog.identity}`}
          className="btn btn-outline-primary btn-sm rounded-pill px-3"
          aria-label={`Read more about ${blog?.title}`}
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
