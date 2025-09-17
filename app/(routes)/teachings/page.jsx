"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import TeachingsDisplay from "@/components/teachings/TeachingsDisplay";
import CreateTeachings from "@/forms/teachings/CreateTeachings";
import { useFetchTeachings } from "@/hooks/teachings/actions";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Teachings() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    isLoading: isLoadingTeachings,
    data: teachings,
    refetch: refetchTeachings,
  } = useFetchTeachings();

  if (isLoadingTeachings) return <LoadingSpinner />;

  return (
    <div className="container-fluid py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <Link href="/dashboard" className="text-primary">
              Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Teachings
          </li>
        </ol>
      </nav>

      <section className="mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <div>
          <h3 className="fw-bold text-dark mb-1">Legio Maria Teachings</h3>
          <p className="text-muted small">Publish and manage teachings.</p>
        </div>
        <button
          className="btn btn-primary btn-sm mt-3 mt-md-0"
          onClick={handleShow}
        >
          Create Teaching
        </button>
      </section>

      {/* Modal for creating teachings */}
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-dialog modal-xl"
        centered
      >
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold">Create Teaching</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <CreateTeachings
              refetchTeachings={refetchTeachings}
              closeModal={handleClose}
            />
          </div>
        </div>
      </Modal>

      <section>
        {teachings?.length > 0 ? (
          <TeachingsDisplay teachings={teachings} />
        ) : (
          <div className="alert alert-info" role="alert">
            No teachings available.
          </div>
        )}
      </section>
    </div>
  );
}

export default Teachings;
