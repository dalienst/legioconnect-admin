"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [chapterData, setChapterData] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const liveChapterUrl =
    "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/chapters/PSA.3?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false";

  const fetchChapter = async () => {
    try {
      const response = await fetch(liveChapterUrl, {
        method: "GET",
        headers: {
          "api-key": "ec154d957ebe133d3aa9840c7d951dc8",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const chapterData = data?.data;
      setChapterData(chapterData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChapter();
  }, []);

  if (!chapterData) {
    return <div>Loading...</div>;
  }

  const { content, reference } = chapterData;

  // Function to filter valid verses
  const getValidVerseText = (verse) => {
    if (!verse || !verse.items) return null;

    // Concatenate all text from the verse's items
    return verse.items
      .filter((item) => item?.text || item?.items?.[0]?.text) // Ensure the item has text
      .map((item) => item?.text || item?.items?.[0]?.text) // Get the text
      .join(" "); // Join the text together
  };

  // bookmarks
  const toggleBookmark = (verse) => {
    const verseId = verse?.items[0]?.attrs?.sid;
    if (!verseId) return;

    setBookmarks((prevBookmarks) => {
      const isBookmarked = prevBookmarks.some((b) => b?.id === verseId);
      if (isBookmarked) {
        return prevBookmarks.filter((b) => b?.id !== verseId);
      } else {
        return [...prevBookmarks, { id: verseId, verse }];
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Highlighting and Bookmarking</h3>

          <h4 className="mb-2 text-orange-500 font-bold text-xl">
            {reference}
          </h4>

          {content?.map((verse, index) => {
            const verseText = getValidVerseText(verse);

            if (!verseText) return null;

            const verseId = verse?.items[0]?.attrs?.sid;

            return (
              <div key={index} className="mb-4">
                <span>{verseText}</span>
                <button
                  onClick={() => toggleBookmark(verse)}
                  className={`ml-2 px-2 py-1 text-sm rounded ${
                    bookmarks.some((b) => b?.id === verseId)
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {bookmarks.some((b) => b?.id === verseId)
                    ? "Remove Bookmark"
                    : "Bookmark"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
