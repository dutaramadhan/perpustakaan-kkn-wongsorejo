import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function BookPage() {
  const router = useRouter();
  const [book, setBook] = useState({});
  const [categoryNames, setCategoryNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/books/files/${router.query.id}`, 
          {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        setBook(bookResponse.data);

        const categoryIds = bookResponse.data.category;
        const categoryPromises = categoryIds.map(id => 
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            }
          })
        );

        const categoryResponses = await Promise.all(categoryPromises);
        console.log(categoryResponses)
        const categoryNames = categoryResponses.map(response => response.data.data);

        setCategoryNames(categoryNames);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchBook();
    }
  }, [router.isReady, router.query.id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="flex flex-col items-center min-h-screen py-10">
      <div className="w-[150px] aspect-[3/4] grid place-items-center" style={{ backgroundImage: `url(data:image/png;base64,${book.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="w-1/4">
        <h1 className="font-bold text-center text-[20px] mb-3">{book.title}</h1>
        <h2 className="text-center text-[16px] font-semibold">Penulis</h2>
        <h2 className="text-center text-[16px]">{book.author}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Penerbit</h2>
        <h2 className="text-center text-[16px]">{book.publisher}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Tahun Terbit</h2>
        <h2 className="text-center text-[16px]">{book.year}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Kategori</h2>
        <h2 className="text-center text-[16px]">{categoryNames.join(", ")}</h2>
        <hr className="my-1" />
        <button 
          className="w-full bg-green-400 py-2 mt-10 cursor-pointer hover:bg-green-500 rounded-md"
          onClick={async () => {
            try {
              router.push(`${process.env.NEXT_PUBLIC_API_URL}/books/file/${book._id}`)
            } catch (error) {
              console.log(error);
              toast.error("An error occurred. Please try again.");
            }
          }}
        >
          Baca
        </button>
      </div>
    </main>
  );
}
