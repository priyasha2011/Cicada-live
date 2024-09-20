'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const fakeUrls = [
  "final-enigma",
  "last-cipher",
  "ultimate-puzzle",
  "end-game",
  "final-destination"
];

const domainExtensions = [".com", ".net", ".org", ".io", ".tech", ".xyz"];

const generateRandomDomain = () => {
  const adjectives = ["cryptic", "enigmatic", "mysterious", "secret", "hidden", "arcane"];
  const nouns = ["realm", "portal", "gateway", "domain", "nexus", "hub"];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomExtension = domainExtensions[Math.floor(Math.random() * domainExtensions.length)];
  
  return `https://${randomAdjective}${randomNoun}${randomExtension}`;
};

const MysteriousSeven: React.FC = () => {
  const router = useRouter();
  const [fakeUrl, setFakeUrl] = useState('');
  const [randomDomain, setRandomDomain] = useState('');

  useEffect(() => {
    // Choose a random fake URL and generate a random domain
    const randomUrl = fakeUrls[Math.floor(Math.random() * fakeUrls.length)];
    setFakeUrl(randomUrl);
    setRandomDomain(generateRandomDomain());
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push('/correctPage');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <a 
        href="#" 
        onClick={handleClick}
        className="text-green-500 no-underline text-lg px-5 py-2.5 border border-green-500 rounded hover:bg-green-500 hover:text-black transition-colors duration-300"
      >
        {`${randomDomain}/${fakeUrl}`}
      </a>
    </div>
  )
}

export default MysteriousSeven