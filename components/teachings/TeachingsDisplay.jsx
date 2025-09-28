"use client";
import extractDate from "@/hooks/useDateFormat";
import Link from "next/link";
import React from "react";
import Markdown from "../Markdown";

function TeachingsDisplay({ teachings }) {
  return (
    <div className="row g-4">
      {teachings?.map((teaching) => (
        <div key={teaching.reference} className="col-md-6 col-lg-4">
          <div className="card h-100 shadow border-0 teaching-card d-flex flex-column">
            <div className="card-body p-4 flex-grow-1 d-flex flex-column">
              <p className="card-text text-muted small mb-2">
                {extractDate(teaching?.created_at)}
              </p>
              <Link
                href={`/teachings/${teaching.identity}`}
                className="card-title text-decoration-none h5 fw-bold text-dark d-block mb-2 text-truncate"
              >
                {teaching.title}
              </Link>
              <h6 className="card-subtitle mb-3 text-muted text-truncate">
                {teaching.location} - {teaching.date}
              </h6>
                <Markdown>{teaching.content}</Markdown>
            </div>
            <div className="card-footer bg-transparent border-0 p-4 pt-0">
              <Link
                href={`/teachings/${teaching.identity}`}
                className="btn btn-outline-primary btn-sm"
                aria-label={`Read more about ${teaching.title}`}
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
