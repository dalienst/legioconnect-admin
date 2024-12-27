"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import AddDailyVerse from "@/forms/AddDailyVerse";
import { useFetchDailyVerses } from "@/hooks/dailyverse/dailyverse";
import DailyVerseTable from "@/tables/DailyVerseTable";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function DailyVerses() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    isLoading: isLoadingDailyVerses,
    data: dailyverses,
    error: errorDailyVerses,
    refetch: refetchDailyVerse,
  } = useFetchDailyVerses();

  if (isLoadingDailyVerses) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Daily Verses
          </li>
        </ol>
      </nav>

      <section className="mb-3 d-flex flex-row flex-md-row justify-content-between align-items-start align-items-md-center">
        <div>
          <h3 className="dash-text">Daily Verse</h3>
          <p className="lead small">Manage your daily verses.</p>
        </div>

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
      </section>

      <section className="mb-3">
        {dailyverses?.length > 0 ? (
          <>
            <DailyVerseTable dailyverses={dailyverses} />
          </>
        ) : (
          <p className="p-2 bg-light">No daily verses found</p>
        )}
      </section>
    </div>
  );
}

export default DailyVerses;
