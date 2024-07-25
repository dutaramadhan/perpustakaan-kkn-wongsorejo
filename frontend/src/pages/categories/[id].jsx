import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { toast } from "react-toastify";

export default function BookByCategoryPage(){
    const router = useRouter();
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true); 

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
                toast.error(error.message);
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

    return (
        <main>
            <Navbar Text={"Kategori"} />
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
    )
}