'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function ImageClickHandler({ children }) {
  const router = useRouter();

  const handleImageClick = () => {
    router.push('/blank-page');
  };

  return (
    <div onClick={handleImageClick}>
      {children}
    </div>
  );
}