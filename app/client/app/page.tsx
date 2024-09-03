'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const token = typeof window !== 'undefined' ? getCookie('token') : null;

    if (token) {
      router.push('/topics');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}

