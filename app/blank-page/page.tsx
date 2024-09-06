'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const fakeUrls = [
  'https://example.com/mysterious-page-1',
  'https://example.com/secret-location-2',
  'https://example.com/hidden-path-3',
  'https://example.com/enigma-4',
  'https://example.com/puzzle-5',
  'https://example.com/labyrinth-6',
  'https://example.com/cipher-7',
  'https://example.com/riddle-8',
  'https://example.com/conundrum-9',
  'https://example.com/final-destination-10'
];

export default function BlankPage() {
  const router = useRouter();
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

//   useEffect(() => {
//     window.history.replaceState({}, '', fakeUrls[currentUrlIndex]);
//   }, [currentUrlIndex]);
  const handleClick = () => {
    if (currentUrlIndex < fakeUrls.length - 1) {
      setCurrentUrlIndex(currentUrlIndex + 1);
    } else {
      router.push('/');
    }
  };
//   useEffect(() => {
//     // Only run on the client side
//     if (typeof window !== 'undefined') {
//       window.history.replaceState({}, '', fakeUrls[currentUrlIndex]);
//     }
//   }, [currentUrlIndex]);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button
        onClick={handleClick}
        style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {currentUrlIndex < fakeUrls.length - 1 ? 'Next Page' : 'Back to Start'}
      </button>
    </div>
  );
}