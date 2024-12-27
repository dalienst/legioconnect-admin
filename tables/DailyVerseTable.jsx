"use client";
import Link from "next/link";
import React from "react";

export default function DailyVerseTable({ dailyverses }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Reference</th>
            <th scope="col">Text</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dailyverses?.map((dailyverse, index) => (
            <tr key={dailyverse?.id}>
              <th scope="row">{index + 1}</th>
              <td>{dailyverse?.active_date}</td>
              <td>{dailyverse?.verse_reference}</td>
              <td>{dailyverse?.verse_text}</td>
              <td>
                <Link
                  href={`/verses/${dailyverse?.slug}`}
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
  );
}
