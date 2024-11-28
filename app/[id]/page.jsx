/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function BibleDetail() {
  const [version, setVersion] = useState([]);
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);

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
        console.log(error)
    }
  };

  useEffect(() => {
    fetchVersion();
  }, []);

  console.log(version);

  if (!version) return <div>Loading...</div>;

  return <div>BibleDetail</div>;
}
