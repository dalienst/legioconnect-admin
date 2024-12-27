import React from "react";

function DataCard({ item, title }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{item?.length}</h5>
        <p className="card-text">{title}</p>
      </div>
    </div>
  );
}

export default DataCard;
