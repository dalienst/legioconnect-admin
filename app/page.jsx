import { chapterJsonFormat } from "@/data/chapterJson";
import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Highlighting and Bookmarking</h3>

          {chapterJsonFormat?.map((chapter, index) => (
            <div key={chapter?.id} className="mb-4">
              <h4 className="mb-2 text-orange-500 font-bold text-xl">{chapter?.reference}</h4>
              {chapter?.content?.map((verse, index) => (
                <div key={index}>
                  <span className="mr-2">{verse?.items[0]?.attrs?.number}</span>
                  <span>
                    {verse?.items[1]?.text} {verse?.items[2]?.items[0]?.text}{" "}
                    {verse?.items[3]?.text} {verse?.items[4]?.items[0]?.text}{" "}
                    {verse?.items[5]?.text} {verse?.items[6]?.items[0]?.text}
                    {verse?.items[7]?.text}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
