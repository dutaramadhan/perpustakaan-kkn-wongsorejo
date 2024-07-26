import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import AddButton from "@/components/AddButton";
import AddBookModal from "@/components/modals/AddBook"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSession } from "next-auth/react";
import axios from 'axios';
import { toast } from "react-toastify";

export default function Admin() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
      const fetchBooks = async () => {
          try {
              const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/files/`, {
                  headers: {
                      'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
                  }
              });
              setBooks(response.data);
          } catch (error) {
              toast.error(error.message);
          } finally {
              setLoading(false);
          }
      };

      fetchBooks();
  }, [openModal]);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/admin/auth/login');
      }
    };
    checkSession();
  }, [router]);


  if (loading) {
      return <Loading />;
  }

  return (
    <main className="relative min-h-screen flex flex-col">
    <AddBookModal isOpen={openModal} setOpenModal={setOpenModal} setIsLoading={setLoading}/>
    <Navbar Text={"Halaman Admin"} mode={"admin"} />
    <div className="flex-grow flex flex-col items-center py-20">
      <div className="w-full flex-grow overflow-auto">
        <div className="grid grid-cols-2 gap-5 p-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {books.map((book) => (
            <BookCard key={book._id} book={book} href={`/admin/books/${book._id}`}/>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    <AddButton onClick={() => setOpenModal(true)}/>
  </main>
  );
}