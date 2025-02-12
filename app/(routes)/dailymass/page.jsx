"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import CreateDailyMass from "@/forms/dailymass/CreateDailyMass";
import { useFetchDailyMass } from "@/hooks/dailymass/actions";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function DailyMass() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    isLoading: isLoadingDailyMass,
    data: dailymass,
    refetch: refetchDailyMass,
  } = useFetchDailyMass();

  console.log(dailymass)

  if (isLoadingDailyMass) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Daily Mass
          </li>
        </ol>
      </nav>

      <section className="mb-3 d-flex flex-row flex-md-row justify-content-between align-items-start align-items-md-center">
        <div>
          <h3 className="dash-text">Daily Mass</h3>
          <p className="lead small">Review and handle daily mass here.</p>
        </div>

        <div>
          <button className="btn btn-connect btn-sm" onClick={handleShow}>
            Create
          </button>

          {/* Modal for creating daily mass */}
          <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modal-dialog modal-fullscreen"
          >
            <div className="modal-header">
              <h5 className="modal-title">Create Daily Mass</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>

            <div className="modal-body">
              <CreateDailyMass
                refetchDailyMass={refetchDailyMass}
                closeModal={handleClose}
              />
            </div>
          </Modal>
        </div>
      </section>

      <section className="mb-3">
        <p>Display mass</p>
      </section>
    </div>
  );
}

export default DailyMass;
