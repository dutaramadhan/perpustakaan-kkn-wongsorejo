import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";

export default function BookByCategoryPage(){
    const router = useRouter();
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);


    useEffect(() =>{
        const fetchBookByCategory = async() =>{
            try{
            const bookResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/books/files/categories/${router.query.id}`, 
                {
                  headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
                  },
                }
              );
              setBooks(bookResponse.data);
            }
            catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        }
        if (router.isReady) {
            fetchBookByCategory();
          }
    }, [router.isReady, router.query.id])
    if (loading){
        return <Loading />
    }
    if (error){
        return <p>{error}</p>;
    }

    return (
        <main>
            <Navbar Text={"Kategori"} />
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
    )
}