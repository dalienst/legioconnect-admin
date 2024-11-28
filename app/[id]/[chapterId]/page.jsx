/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// Function to render content items as plain text
const renderContentAsText = (items) => {
  return items
    .map((item) => {
      switch (item.type) {
        case "tag":
          if (item.name === "verse") {
            return `${item.attrs.number} `;
          } else if (item.name === "char") {
            return item.items && renderContentAsText(item.items);
          }
          break;
        case "text":
          return item.text;
        default:
          return null;
      }
    })
    .filter(Boolean)
    .join("");
};

export default function ChapterDetail() {
  const { id, chapterId } = useParams();
  const [chapterData, setChapterData] = useState(null);
  const [separatedVerses, setSeparatedVerses] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const liveChapterUrl = `https://api.scripture.api.bible/v1/bibles/${id}/chapters/${chapterId}?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`;

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

      // Extract and separate verses after data is fetched
      if (chapterData?.content) {
        const fullText = chapterData.content
          .map((para) => para.items && renderContentAsText(para.items))
          .join(" ");
        const separatedVerses = separateVerses(fullText);
        setSeparatedVerses(separatedVerses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChapter();
  }, []);

  // Function to separate the text based on verse numbers
  const separateVerses = (text) => {
    const verseRegex = /(\d+)\s+([^\d]+)/g;
    let verses = [];
    let match;

    while ((match = verseRegex.exec(text)) !== null) {
      const verseNumber = match[1];
      const verseText = match[2].trim();

      if (verses[verseNumber]) {
        verses[verseNumber] += ` ${verseText}`;
      } else {
        verses[verseNumber] = verseText;
      }
    }

    return Object.entries(verses).map(([verseNumber, text]) => ({
      verseNumber: parseInt(verseNumber, 10),
      text,
    }));
  };

  const toggleHighlight = (verse) => {
    const isHighlighted = highlights.some(
      (h) => h.verseNumber === verse.verseNumber
    );

    let updatedHighlights;
    if (isHighlighted) {
      // Remove highlight if already highlighted
      updatedHighlights = highlights.filter(
        (h) => h.verseNumber !== verse.verseNumber
      );
    } else {
      // Add highlight if not already highlighted
      updatedHighlights = [...highlights, verse];
    }

    setHighlights(updatedHighlights);

    // Store updated highlights in localStorage
    localStorage.setItem("highlights", JSON.stringify(updatedHighlights));
  };

  if (!chapterData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="px-10">
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-orange-500">
              {chapterData?.reference}
            </h3>

            <div className="content">
              {separatedVerses.map((verse, index) => (
                <div
                  key={index}
                  className={`mb-4 cursor-pointer ${
                    highlights.some((h) => h.verseNumber === verse.verseNumber)
                      ? "bg-yellow-200"
                      : ""
                  }`}
                  onClick={() => toggleHighlight(verse)}
                >
                  <div className="verse-item">
                    <span
                      className={`verse-number font-bold ${
                        highlights.some(
                          (h) => h.verseNumber === verse.verseNumber
                        )
                          ? "text-yellow-700"
                          : "text-red-600"
                      }`}
                    >
                      {verse?.verseNumber}:
                    </span>
                    <span
                      className={`verse-text ml-2 ${
                        highlights.some(
                          (h) => h.verseNumber === verse.verseNumber
                        )
                          ? "text-yellow-800"
                          : ""
                      }`}
                    >
                      {verse?.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
