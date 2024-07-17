import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburgerBar = () => {
    setHamburgerOpen(!isHamburgerOpen);
  };

  const books = [
    {
      bookid: '1',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
    {
      bookid: '2',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
    {
      bookid: '2',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
    {
      bookid: '2',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
    {
      bookid: '2',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
    {
      bookid: '2',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
    {
      bookid: '2',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
    {
      bookid: '2',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
    {
      bookid: '2',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
    {
      bookid: '2',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
    {
      bookid: '2',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
    {
      bookid: '2',
      bookname: 'Tes',
      authorname: 'Duta',
      price: 1000,
    },
  ];

  return (
    <main>
      <Navbar Text={"Perpustakaan Digital"} onClick={toggleHamburgerBar} />
      <Sidebar isOpen={isHamburgerOpen} onClick={toggleHamburgerBar} />
      <div className="z-10 flex min-h-screen flex-col items-center py-20">
        <div className="flex-grow">
          <div className="grid grid-cols-2 gap-5 p-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {books.map((book) => (
              <BookCard key={book.bookid} book={book} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
