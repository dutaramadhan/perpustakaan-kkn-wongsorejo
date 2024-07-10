import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('admin/auth/login');
    }
  }, []);

  return (
    <main>
      <Navbar Text={"Halaman Admin"}/>
    </main>
  );
}

