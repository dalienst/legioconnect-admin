import React from "react";

function LoadingSpinner() {
  return (
    <section className="p-2 mt-3 d-flex justify-content-center align-items-center flex-column min-vh-100">
      <div
        className="spinner-border"
        style={{ color: "#4b1719" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </section>
  );
}

export default LoadingSpinner;
