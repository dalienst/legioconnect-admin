/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function BibleDetail() {
  const [version, setVersion] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  const fetchVersion = async () => {
    try {
      const response = await fetch(
        `https://api.scripture.api.bible/v1/bibles/${id}/books?include-chapters=true`,
        {
          method: "GET",
          headers: {
            "api-key": "ec154d957ebe133d3aa9840c7d951dc8",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response?.json();
      setVersion(data);
    } catch (error) {
      console.error("Error fetching version:", error);
    }
  };

  useEffect(() => {
    fetchVersion();
  }, []);

  console.log(version)

  if (!version?.data) return <div className="text-center mt-8">Loading...</div>;

  const toggleBook = (bookId) => {
    setExpandedBook((prevExpandedBookId) =>
      prevExpandedBookId === bookId ? null : bookId
    );
  };

  const handleChapterClick = (chapterId) => {
    router.push(`/${id}/${chapterId}`);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 text-black">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Books - 
        </h2>
        <div>
          {version?.data?.map((book) => (
            <div key={book?.id} className="mb-4">
              <div
                className="cursor-pointer bg-gray-100 px-4 py-2 rounded-md shadow-sm hover:bg-gray-200 transition"
                onClick={() => toggleBook(book?.id)}
              >
                <h3 className="text-lg font-medium">{book?.name}</h3>
              </div>

              {expandedBook === book.id && (
                <div className="mt-2 pl-6 flex flex-row flex-wrap">
                  {book?.chapters?.map((chapter) => (
                    <div
                      key={chapter?.id}
                      className="cursor-pointer text-black m-3 p-2 border-2 border-gray-300 rounded-md shadow-sm hover:bg-gray-200 transition"
                      onClick={() => handleChapterClick(chapter.id)}
                    >
                      {chapter?.number}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
