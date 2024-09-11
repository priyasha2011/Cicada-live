'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function ImageClickHandler({ children, index }) {
  const router = useRouter();

  const handleImageClick = () => {
    if (index === 6) { // 0-based index, so 6 is the 7th image
      router.push('/mysteriousSeven');
    } else {
      router.push('/blank-page');
    }
  };

  return (
    <div onClick={handleImageClick}>
      {children}
    </div>
  );
}