"use client";
import React from "react";

function capitalizeFirstLetter(text) {
  if (!text || typeof text !== "string") {
    return ""; // Return an empty string or handle the case as needed
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default capitalizeFirstLetter;
