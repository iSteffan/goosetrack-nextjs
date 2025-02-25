'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    } else {
      console.log('token found');
    }
  }, [router]);

  return (
    <>
      <div>calendar page</div>
    </>
  );
}
