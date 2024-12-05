"use client";
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
          </tr>
        </thead>
        <tbody>
          {dailyverses?.map((dailyverse, index) => (
            <tr key={dailyverse?.id}>
              <th scope="row">{index + 1}</th>
              <td>{dailyverse?.active_date}</td>
              <td>{dailyverse?.verse_reference}</td>
              <td>{dailyverse?.verse_text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
