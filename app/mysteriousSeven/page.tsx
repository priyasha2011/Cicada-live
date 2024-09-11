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

const MysteriousSeven = () => {
  const router = useRouter();
  const [fakeUrl, setFakeUrl] = useState('');

  useEffect(() => {
    // Choose a random fake URL
    const randomUrl = fakeUrls[Math.floor(Math.random() * fakeUrls.length)];
    setFakeUrl(randomUrl);
  }, []);

  const handleClick = () => {
    router.push('/correctPage');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#000'
    }}>
      <a 
        href="#" 
        onClick={handleClick}
        style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '18px',
          padding: '10px 20px',
          border: '1px solid #fff',
          borderRadius: '5px'
        }}
      >
        {`http://localhost:3000/${fakeUrl}`}
      </a>
    </div>
  )
}

export default MysteriousSeven