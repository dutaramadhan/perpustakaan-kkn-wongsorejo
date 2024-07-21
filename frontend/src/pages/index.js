import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import Sidebar from "@/components/Sidebar";
import Loading from "@/components/Loading";

export default function Home() {
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              setError('Error fetching data');
          } finally {
              setLoading(false);
          }
      };

      fetchBooks();
  }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

  return (
    <main>
      <Navbar Text={"Perpustakaan Digital"} />
      <div className="z-10 flex min-h-screen flex-col items-center py-20">
        <div className="flex-grow">
          <div className="grid grid-cols-2 gap-5 p-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}