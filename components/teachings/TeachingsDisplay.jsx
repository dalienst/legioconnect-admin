"use client";
import extractDate from "@/hooks/useDateFormat";
import Link from "next/link";
import React from "react";
import Markdown from "../Markdown";

// Utility function to truncate text
const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

function TeachingsDisplay({ teachings }) {
  return (
    <div>
      {teachings?.map((teaching) => (
        <div key={teaching.reference}>
          <div className="card h-100 shadow teaching-card d-flex flex-column mb-3">
            <div className="card-header">
              <Link
                href={`/teachings/${teaching?.identity}`}
                className="card-title text-decoration-none h5 fw-bold text-dark d-block mb-2 text-truncate"
              >
                {teaching?.title}
              </Link>
              <h6 className="card-subtitle mb-3 text-muted text-truncate">
                {teaching?.location} - {teaching?.date}
              </h6>
            </div>
            <div className="card-body p-4 flex-grow-1 d-flex flex-column">
              <p className="card-text text-muted small mb-2">
                {extractDate(teaching?.created_at)}
              </p>

              {/* Truncate the content before passing to Markdown */}
              <Markdown>{truncateText(teaching?.content)}</Markdown>
            </div>
            <div className="card-footer bg-transparent border-0 p-4 pt-0">
              <Link
                href={`/teachings/${teaching.identity}`}
                className="btn btn-outline-primary btn-sm"
                aria-label={`Read more about ${teaching?.title}`}
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeachingsDisplay;
