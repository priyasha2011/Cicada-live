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

const domainExtensions = [".com", ".net", ".org", ".io", ".tech", ".xyz"];

const generateRandomDomain = () => {
  const adjectives = ["mysterious", "secret", "hidden", "enigmatic", "puzzling", "cryptic"];
  const nouns = ["realm", "portal", "gateway", "domain", "nexus", "hub"];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomExtension = domainExtensions[Math.floor(Math.random() * domainExtensions.length)];
  
  return `https://${randomAdjective}${randomNoun}${randomExtension}`;
};

export default function BlankPage() {
  const router = useRouter();
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [randomizedUrls, setRandomizedUrls] = useState<string[]>([]);
  const [randomDomain, setRandomDomain] = useState("");

  useEffect(() => {
    setRandomizedUrls(shuffleArray([...fakeUrls]));
    setRandomDomain(generateRandomDomain());
  }, []);

  const shuffleArray = (array: string[]) => {
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
      setRandomDomain(generateRandomDomain());
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
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <button
        onClick={handleClick}
        className="px-5 py-2.5 bg-transparent text-green-500 border border-green-500 rounded hover:bg-green-500 hover:text-black transition-colors duration-300"
      >
        {currentUrlIndex < fakeUrls.length - 1
          ? `${randomDomain}/${randomizedUrls[currentUrlIndex + 1]}`
          : "Back to Start"}
      </button>
    </div>
  );
}