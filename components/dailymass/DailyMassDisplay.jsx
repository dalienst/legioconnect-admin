"use client";
import Link from "next/link";
import React from "react";

function DailyMassDisplay({ dailymass }) {
  return (
    <div className="row">
      {dailymass?.map((mass) => (
        <div key={mass.id} className="col-md-6 col-lg-4 mb-4">
          <Link
            href={`/dailymass/${mass?.slug}`}
            className="card h-100 shadow-sm text-decoration-none hover"
          >
            <div className="card-body">
              <h5 className="card-title">{mass.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {mass.mass_date}
              </h6>
              <p className="card-text">
                <strong>Lectionary:</strong> {mass.lectionary}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DailyMassDisplay;
