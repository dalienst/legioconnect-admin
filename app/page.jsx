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
    } catch (error) {
      console.error("Error fetching Bibles:", error);
    }
  };

  useEffect(() => {
    fetchBible();
  }, []);

  if (!bible) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-semibold text-black mb-4">
          Select Bible
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 border-b border-gray-200">
                  Abbr
                </th>
                <th className="text-left px-4 py-2 border-b border-gray-200">
                  Name
                </th>
                <th className="text-left px-4 py-2 border-b border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bible?.data?.map((bible) => (
                <tr
                  key={bible?.id}
                  className="hover:bg-gray-50 transition duration-150 text-black"
                >
                  <td className="px-4 py-2 border-b border-gray-200">
                    {bible?.abbreviationLocal}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {bible?.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <Link
                      href={`/${bible?.id}`}
                      className="text-blue-600 hover:text-blue-800 transition duration-150 underline"
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
  );
}
