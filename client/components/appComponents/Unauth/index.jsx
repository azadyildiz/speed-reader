'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import config from '@/config';

export default function Unauth({ message, statusCode }) {
  const router = useRouter();
  useEffect(() => {
    toast.error(message, config.TOASTIFY_CONFIG);
    setTimeout(() => {
      if(statusCode === 429) { 
        router.push('/app');
      }
      else{
        router.push('/login');
      }
    }, 1500);
  });

  return <></>;
}
