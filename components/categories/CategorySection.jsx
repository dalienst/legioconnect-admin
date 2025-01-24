"use client";
import AddCategory from "@/forms/categories/AddCategory";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CategoriesDisplay from "./CategoriesDisplay";

function CategorySection({ categories, refetchCategories }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="card mb-3">
        <div className="mb-3 d-flex flex-row flex-md-row justify-content-between align-items-start align-items-md-center card-header bg-white">
          <h3 className="dash-text">Categories</h3>

          <div>
            <button className="btn btn-connect btn-sm" onClick={handleShow}>
              Add
            </button>

            {/* Modal for creating category */}
            <Modal
              show={show}
              onHide={handleClose}
              dialogClassName="modal-dialog modal-dialog-centered"
            >
              <div className="modal-header">
                <h5 className="modal-title">Create Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>

              <div className="modal-body">
                <AddCategory
                  closeModal={handleClose}
                  refetch={refetchCategories}
                />
              </div>
            </Modal>
          </div>
        </div>
        <div className="card-body">
          {categories && categories.length > 0 ? (
            <>
              <CategoriesDisplay categories={categories} refetchCategories={refetchCategories} />
            </>
          ) : (
            <div className="alert alert-info">
              <i className="bi bi-info-circle"></i> No categories found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CategorySection;
