"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const fakeUrls = [
  "mysterious-page-1",
  "secret-location-2",
  "hidden-path-3",
  "enigma-4",
  "puzzle-5",
  "labyrinth-6",
  "cipher-7",
  "riddle-8",
  "conundrum-9",
  "final-destination-10",
];

export default function BlankPage() {
  const router = useRouter();
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  const handleClick = () => {
    if (currentUrlIndex < fakeUrls.length - 1) {
      const nextIndex = currentUrlIndex + 1;
      setCurrentUrlIndex(nextIndex);

      window.history.pushState({}, "", fakeUrls[nextIndex]);
    } else {
      router.push("/sum");
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const currentUrl = window.location.pathname.replace("/", "");
      const index = fakeUrls.indexOf(currentUrl);
      if (index >= 0) {
        setCurrentUrlIndex(index);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", fakeUrls[currentUrlIndex]);
    }
  }, [currentUrlIndex]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {currentUrlIndex < fakeUrls.length - 1 ? "Next Page" : "Back to Start"}
      </button>
    </div>
  );
}