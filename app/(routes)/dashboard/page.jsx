"use client";
import DataCard from "@/components/dashboard/DataCard";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import AddDailyVerse from "@/forms/AddDailyVerse";
import { useFetchAccount, useFetchUsers } from "@/hooks/accounts/actions";
import { useFetchDailyVerses } from "@/hooks/dailyverse/dailyverse";
import { useFetchReports } from "@/hooks/reports/actions";
import DailyVerseTable from "@/tables/DailyVerseTable";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

function Dashboard() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    isLoading: isLoadingAccount,
    data: account,
    refetch: refetchAccount,
  } = useFetchAccount();

  const {
    isLoading: isLoadingDailyVerses,
    data: dailyverses,
    error: errorDailyVerses,
    refetch: refetchDailyVerse,
  } = useFetchDailyVerses();

  const {
    isLoading: isLoadingUsers,
    data: users,
    refetch: refetchUsers,
  } = useFetchUsers();

  const {
    isLoading: isLoadingReports,
    data: reports,
    refetch: refetchReports,
  } = useFetchReports();

  console.log(users);

  if (isLoadingAccount) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <h6 className="text-uppercase text-muted">Dashboard</h6>
      <section className="mb-3">
        <h3 className="dash-text">
          Hello, {account?.first_name || account?.email}
        </h3>
        <p className="lead small">Welcome to the admin dashboard</p>
      </section>

      <section className="row">
        <div className="col-md-4 col-sm-12 mb-3">
          <DataCard item={users} title="User Accounts Created" />
        </div>

        <div className="col-md-4 col-sm-12 mb-3">
          <DataCard item={dailyverses} title="Daily Verses Created" />
        </div>

        <div className="col-md-4 col-sm-12 mb-3">
          <DataCard item={reports} title="Reports Created" />
        </div>
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

        <div className="card-body">
          {isLoadingDailyVerses ? (
            <LoadingSpinner />
          ) : dailyverses && dailyverses.length > 0 ? (
            <>
              <DailyVerseTable dailyverses={dailyverses} />
            </>
          ) : (
            <p className="lead">No daily verses found</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
