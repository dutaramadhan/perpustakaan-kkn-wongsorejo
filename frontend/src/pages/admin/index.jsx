import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getSession } from "next-auth/react";

export default function Admin() {
  const router = useRouter();
  
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/admin/auth/login');
      }
    };
    checkSession();
  }, [router]);

  return (
    <main>
      <Navbar Text={"Halaman Admin"}/>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/admin/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

