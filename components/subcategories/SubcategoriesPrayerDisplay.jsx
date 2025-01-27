"use client";
import UpdatePrayer from "@/forms/prayers/UpdatePrayer";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function SubcategoriesPrayerDisplay({ subcategory, refetchSubcategory }) {
  const [show, setShow] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState(null);

  const handleShow = (prayer) => {
    setSelectedPrayer(prayer);
    setShow(true);
  };

  const handleClose = () => {
    setSelectedPrayer(null);
    setShow(false);
  };

  return (
    <>
      <h6>Prayers</h6>
      {subcategory?.prayers && subcategory?.prayers?.length > 0 ? (
        <>
          {subcategory?.prayers?.map((prayer) => (
            <div className="card mb-3" key={prayer?.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">{prayer?.title}</h5>
                  <span
                    className="badge bg-secondary rounded-pill"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {prayer?.position || "N/A"}
                  </span>
                </div>
                <p className="card-text">{prayer?.content}</p>
                <button
                  className="btn btn-sm"
                  onClick={() => handleShow(prayer)}
                >
                  Update Prayer
                </button>
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

      {/* Modal for updating prayer */}
      {selectedPrayer && (
        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="modal-dialog modal-dialog-scrollable"
        >
          <div className="modal-header">
            <h5 className="modal-title">
              Update Prayer: {selectedPrayer?.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>

          <div className="modal-body">
            <UpdatePrayer
              slug={selectedPrayer?.slug}
              subcategory={subcategory}
              prayer={selectedPrayer}
              refetch={refetchSubcategory}
              closeModal={handleClose}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default SubcategoriesPrayerDisplay;
