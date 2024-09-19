'use client'

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sum from './sum/page';
import Footer from "./components/footer";

export default function App() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      router.push('/sum');
    }
  }, [pathname, router]);

  return (
    <div className="min-h-screen relative pb-16">
      {pathname === '/sum' && <Sum />}
      <Footer />
    </div>
  );
}