/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [bible, setBible] = useState([]);
  const url = `https://api.scripture.api.bible/v1/bibles?language=eng&include-full-details=false`;

  const fetchBible = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "api-key": "ec154d957ebe133d3aa9840c7d951dc8",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setBible(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBible();
  }, []);

  console.log(bible);

  if (!bible) return <div>Loading...</div>;

  return (
    <div className="min-h-screen py-8 px-8">
      <div className="card bg-base-300">
        <div className="card-body">
          <h2 className="card-title">Select Bible</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-black">
                  <th>Abbr</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bible?.data?.map((bible) => (
                  <tr key={bible?.id}>
                    <td>{bible?.abbreviationLocal}</td>
                    <td>{bible?.name}</td>
                    <td>
                      <Link
                        href={`/${bible?.id}`}
                        className="btn btn-primary btn-sm btn-outline"
                      >
                        Select
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
