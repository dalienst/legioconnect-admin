/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";

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

export default function Home() {
  const [chapterData, setChapterData] = useState(null);
  const [separatedVerses, setSeparatedVerses] = useState([]);
  const liveChapterUrl =
    "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/chapters/NUM.2?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Highlighting and Bookmarking</h3>

          <h4 className="mb-2 text-orange-500 font-bold text-xl">
            {chapterData?.reference}
          </h4>

          <div className="content">
            {separatedVerses.map((verse, index) => (
              <div key={index} className="mb-4 cursor-pointer" onClick={() => console.log(verse)}>
                <div className="verse-item">
                  <span className="verse-number text-red-600 font-bold">
                    {verse?.verseNumber}:
                  </span>
                  <span className="verse-text ml-2">{verse?.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
