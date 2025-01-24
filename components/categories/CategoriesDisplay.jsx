"use client";
import Link from "next/link";
import React from "react";

function CategoriesDisplay({ categories }) {
  return (
    <>
      <section>
        <div className="accordion" id="accordionOne">
          {categories?.map((category) => (
            <div key={category?.reference} className="accordion-item">
              <h4 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${category?.reference}`}
                  aria-expanded="false"
                  aria-controls={category?.reference}
                >
                  {category?.name}
                </button>
              </h4>
              <div
                id={category?.reference}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionOne"
              >
                <div className="accordion-body">
                  <section>
                    <p>{category?.description}</p>
                  </section>
                  <section>
                    {category?.subcategories &&
                    category?.subcategories?.length > 0 ? (
                      <>
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Prayers</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {category?.subcategories?.map((subcategory) => (
                                <tr key={subcategory?.reference}>
                                  <td>{subcategory?.name}</td>
                                  <td>{subcategory?.prayers?.length}</td>
                                  <td>
                                    <Link
                                      href={`/subcategories/${subcategory?.slug}`}
                                      className="btn btn-sm"
                                    >
                                      <i className="bi bi-eye"></i>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      <p>No subcategories</p>
                    )}
                  </section>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CategoriesDisplay;
