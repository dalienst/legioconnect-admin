import Link from "next/link";
import React from "react";

function DataCard({ item, title, link }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{item?.length}</h5>
        <Link href={`/${link}`} className="card-text">
          {title}
        </Link>
      </div>
    </div>
  );
}

export default DataCard;
