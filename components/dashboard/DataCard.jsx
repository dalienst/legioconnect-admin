import Link from "next/link";
import React from "react";

function DataCard({ item, title, link }) {
  return (
    <Link href={`/${link}`} className="card h-100 text-decoration-none hover">
      <div className="card-body">
        <h5 className="card-title">{item?.length}</h5>
        <p className="card-text">{title}</p>
      </div>
    </Link>
  );
}

export default DataCard;
