"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import Markdown from "@/components/Markdown";
import UpdateTeachings from "@/forms/teachings/UpdateTechings";
import { useFetchTeachingDetail } from "@/hooks/teachings/actions";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import extractDate from "@/hooks/useDateFormat";
import { deleteTeaching } from "@/services/teachings";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";

function TeachingDetail() {
  const { identity } = useParams();
  const token = useAxiosAuth();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    isLoading: isLoadingTeachingDetail,
    data: teaching,
    refetch: refetchTeachingDetail,
  } = useFetchTeachingDetail(identity);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteTeaching(identity, token);
      toast?.success("Teaching deleted successfully");
      router?.push("/teachings");
    } catch (error) {
      toast?.error("Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  if (isLoadingTeachingDetail) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard" className="text-primary">
              Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/teachings">Teachings</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {teaching?.title}
          </li>
        </ol>
      </nav>

      <div className="card mb-3">
        <section className="d-flex justify-content-between mb-3 card-header">
          <div>
            <h3 className="dash-text">{teaching?.title}</h3>
          </div>

          <div>
            <button className="btn me-2" onClick={handleShow}>
              <i className="bi bi-pencil"></i>
            </button>
            <button className="btn" onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <span className="spinner-border spinner-border-sm text-danger"></span>
              ) : (
                <i className="bi bi-trash"></i>
              )}
            </button>
          </div>
        </section>

        <div className="card-body mb-3">
          <h6 className="card-title">
            {extractDate(teaching?.date)} - {teaching?.location}
          </h6>
          <Markdown>{teaching.content}</Markdown>
        </div>
      </div>

      {/* Modal for updating teaching */}
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
            <UpdateTeachings
              teaching={teaching}
              refetchTeachingDetail={refetchTeachingDetail}
              closeModal={handleClose}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TeachingDetail;
