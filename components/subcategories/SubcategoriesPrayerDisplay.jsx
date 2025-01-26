"use client";
import React from "react";

function SubcategoriesPrayerDisplay({ subcategory}) {
  return (
    <>
      <h6>Prayers</h6>
      {subcategory?.prayers && subcategory?.prayers?.length > 0 ? (
        <>
          {subcategory?.prayers?.map((prayer) => (
            <div className="card mb-3" key={prayer?.id}>
              <div className="card-body">
                <h5 className="card-title">{prayer?.title}</h5>
                <p className="card-text">{prayer?.content}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          No prayers found
        </div>
      )}
    </>
  );
}

export default SubcategoriesPrayerDisplay;
