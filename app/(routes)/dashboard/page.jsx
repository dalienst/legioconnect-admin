"use client";
import AddDailyVerse from "@/forms/AddDailyVerse";
import useFetchAccount from "@/hooks/accounts/useFetchAccount";
import { useFetchDailyVerses } from "@/hooks/dailyverse/dailyverse";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Dashboard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { isLoading: isLoadingAccount, data: account } = useFetchAccount();
  const {
    isLoading: isLoadingDailyVerses,
    data: dailyverses,
    refetch: refetchDailyVerse,
  } = useFetchDailyVerses();

  console.log(dailyverses);

  return (
    <div className="container-fluid">
      <section className="mb-3">
        <h3 className="dash-text">Hello, {account?.first_name}</h3>
        <p className="lead">This is the admin dashboard</p>
      </section>

      <section className="card">
        <div className="mb-3 d-flex flex-row flex-md-row justify-content-between align-items-start align-items-md-center card-header bg-white">
          <h5>Daily Verses</h5>

          <div>
            <button className="btn btn-connect btn-sm" onClick={handleShow}>
              Add
            </button>

            {/* Modal for creating daily verse */}
            <Modal
              show={show}
              onHide={handleClose}
              dialogClassName="modal-dialog modal-dialog-centered"
            >
              <div className="modal-header">
                <h5 className="modal-title">Create Daily Verse</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <AddDailyVerse
                  refetch={refetchDailyVerse}
                  handleCloseModal={handleClose}
                />
              </div>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
