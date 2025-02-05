"use client";
import UpdatePrayer from "@/forms/prayers/UpdatePrayer";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { deletePrayer } from "@/services/prayers";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import toast from "react-hot-toast";

function SubcategoriesPrayerDisplay({ subcategory, refetchSubcategory }) {
  const [show, setShow] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState({});
  const axios = useAxiosAuth()

  const handleShow = (prayer) => {
    setSelectedPrayer(prayer);
    setShow(true);
  };

  const handleClose = () => {
    setSelectedPrayer(null);
    setShow(false);
  };

  const handleDelete = async (slug) => {
    setDeleting((prev) => ({ ...prev, [slug]: true })); // Set only the clicked prayer to deleting

    try {
      await deletePrayer(slug, axios);
      toast.success("Prayer deleted successfully");
      refetchSubcategory();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting prayer");
    } finally {
      setDeleting((prev) => ({ ...prev, [slug]: false })); // Reset only the clicked prayer
    }
  };


  return (
    <>
      <h5 className="fw-semibold mb-3">Prayers</h5>

      <Toast className="w-100 mb-3 toast">
        <div className="toast-header">
          <strong className="me-auto">
            <i className="bi bi-info-circle me-2"></i>Info
          </strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">
          To update the prayer&apos;s position, click the &quot;Update
          Prayer&quot; button and adjust the position. Prayers sharing the same
          position are ordered by creation time, with the earliest appearing
          first.
        </div>
      </Toast>

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
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDelete(prayer?.slug)}
                  disabled={deleting[prayer?.slug]}
                >
                  <i className="bi bi-trash"></i>
                  {deleting[prayer?.slug] ? "Deleting..." : "Delete"}
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
