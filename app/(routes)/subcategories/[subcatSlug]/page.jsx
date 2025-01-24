"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import AddPrayer from "@/forms/prayers/AddPrayer";
import UpdateSubcategory from "@/forms/subcategories/UpdateSubcategory";
import { useFetchCategories } from "@/hooks/categories/actions";
import { useFetchSubcategoryDetail } from "@/hooks/subcategories/actions";
import { deleteSubcategory } from "@/services/subcategories";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import Modal from "react-bootstrap/Modal";

function SubcategoryDetail({ params }) {
  const subcatSlug = use(params);
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShut = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const {
    isLoading: isLoadingSubcategory,
    data: subcategory,
    refetch: refetchSubcategory,
  } = useFetchSubcategoryDetail(subcatSlug?.subcatSlug);

  const {
    isLoading: isLoadingCategories,
    data: categories,
    refetch: refetchCategories,
  } = useFetchCategories();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteSubcategory(subcatSlug?.subcatSlug, axios);
      toast?.success("Subcategory deleted successfully");
      router?.push("/dashboard");
    } catch (error) {
      toast?.error("Error deleting subcategory");
    } finally {
      setDeleting(false);
    }
  };

  if (isLoadingSubcategory) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {/* <li className="breadcrumb-item">
            <Link href="/subcategories">Subcategories</Link>
          </li> */}
          <li className="breadcrumb-item active" aria-current="page">
            {subcategory?.name}
          </li>
        </ol>
      </nav>

      <section className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <h5 className="dash-text">{subcategory?.name}</h5>

        <div className="d-flex gap-2">
          <button className="prayer-btn" onClick={handleOpen}>
            New Prayer
          </button>
          <button className="btn" onClick={handleShow}>
            Update
          </button>
          <button
            className="delete-btn"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </section>

      <section className="mb-3 row"></section>

      {/* modal to update subcategory */}
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-dialog modal-dialog-centered"
      >
        <div className="modal-header">
          <h5 className="modal-title">
            Update Subcategory: {subcategory?.name}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
          ></button>
        </div>
        <div className="modal-body">
          <UpdateSubcategory
            subcategory={subcategory}
            categories={categories}
            refetch={refetchSubcategory}
            closeModal={handleClose}
          />
        </div>
      </Modal>
      {/* end of modal */}

      {/* modal to add new prayer */}
      <Modal
        show={open}
        onHide={handleShut}
        dialogClassName="modal-dialog modal-dialog-centered"
      >
        <div className="modal-header">
          <h5 className="modal-title">New Prayer</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleShut}
          ></button>
        </div>

        <div className="modal-body">
          <AddPrayer
            refetch={refetchSubcategory}
            closeModal={handleShut}
            subcategory={subcategory}
          />
        </div>
      </Modal>
    </div>
  );
}

export default SubcategoryDetail;
