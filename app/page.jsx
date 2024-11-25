"use client";
import { chapterJsonFormat } from "@/data/chapterJson";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [chapterData, setChapterData] = useState(null);
  const liveChapterUrl =
    "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/chapters/PSA.107?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false";

  const fetchChapter = async () => {
    try {
      const response = await fetch(liveChapterUrl, {
        method: "GET",
        headers: {
          "api-key": "c04f03399850bd27c204a9a904a59198",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const chapterData = data?.data;
      setChapterData(chapterData); // Store the fetched chapter data in state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChapter();
  }, []);

  console.log(chapterData);
  if (!chapterData) {
    return <div>Loading...</div>; // Show loading message until data is fetched
  }

  const { content, reference } = chapterData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Highlighting and Bookmarking</h3>

          <h4 className="mb-2 text-orange-500 font-bold text-xl">
            {reference}
          </h4>

          {content?.map((verse, index) => (
            <div key={index}>
              <span className="mr-2">{verse?.items[0]?.attrs?.number}</span>
              <span>
                {/* {verse?.items[0]?.items?.[0]?.text || ""} */}
                {verse?.items[1]?.items?.[0]?.text || ""}
                {verse?.items[1]?.text}{" "}
                {verse?.items[2]?.items?.[0]?.text || ""}{" "}
                {verse?.items[3]?.text}{" "}
                {verse?.items[4]?.items?.[0]?.text || ""}{" "}
                {verse?.items[5]?.text}{" "}
                {verse?.items[6]?.items?.[0]?.text || ""}{" "}
                {verse?.items[7]?.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
