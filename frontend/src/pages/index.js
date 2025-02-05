import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import { toast } from 'react-toastify';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading) {
      return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Perpustakaan Digital KKN PPM UGM Wongsorejo 2024</title>
        <meta name="description" content="Selamat datang di Perpustakaan Digital KKN PPM UGM Wongsorejo 2024. Temukan berbagai buku di sini." />
        <meta name="keywords" content="perpustakaan digital, KKN UGM, Wongsorejo, buku, penulis, membaca" />
        <meta name="author" content="KKN PPM UGM Wongsorejo 2024" />
      </Head>
      <main>
        <Navbar Text={"Perpustakaan Digital"}/>
        <div className="flex-grow flex flex-col items-center py-20">
          <div className="w-full flex-grow overflow-auto">
            <div className="grid grid-cols-2 gap-5 p-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
              {books.map((book) => (
                <BookCard key={book._id} book={book} href={`/books/${book._id}`}/>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}