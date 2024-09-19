"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const fakeUrls = [
  "mysterious-page",
  "secret-location",
  "hidden-path",
  "enigma",
  "puzzle",
  "labyrinth",
  "cipher",
  "riddle",
  "conundrum",
  "final-destination",
];

export default function BlankPage() {
  const router = useRouter();
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [randomizedUrls, setRandomizedUrls] = useState<string[]>([]);

  useEffect(() => {
    
    setRandomizedUrls(shuffleArray([...fakeUrls]));
  }, []);

  const shuffleArray = (array: string[]): string[] =>{
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleClick = () => {
    if (currentUrlIndex < fakeUrls.length - 1) {
      const nextIndex = currentUrlIndex + 1;
      setCurrentUrlIndex(nextIndex);

      window.history.pushState({}, "", randomizedUrls[nextIndex]);
    } else {
      router.push("/sum");
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const currentUrl = window.location.pathname.replace("/", "");
      const index = randomizedUrls.indexOf(currentUrl);
      if (index >= 0) {
        setCurrentUrlIndex(index);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [randomizedUrls]);

  useEffect(() => {
    if (typeof window !== "undefined" && randomizedUrls.length > 0) {
      window.history.pushState({}, "", randomizedUrls[currentUrlIndex]);
    }
  }, [currentUrlIndex, randomizedUrls]);

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
          background: "#0000",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {currentUrlIndex < fakeUrls.length - 1
          ? "http://localhost:3000/" + randomizedUrls[currentUrlIndex + 1]
          : "Back to Start"}
      </button>
    </div>
  );
}