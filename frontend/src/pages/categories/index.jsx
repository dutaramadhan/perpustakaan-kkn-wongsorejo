import CategoryCard from "@/components/CategoryCard";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/categories`, 
                {
                    headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
                    },
                }
                );
                setCategories(categoriesResponse.data);
            } catch (error) {
                toast.error(error.messsage);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    },[])

    if (loading) {
        return <Loading />;
    }

  return (
    <>
    <Navbar Text="Perpustakaan Digital"/>
    <main className="flex min-h-screen flex-col py-20">
      <div className="grid grid-cols-2 gap-5 p-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
        {categories.map((category, index) => {
          return <CategoryCard key={category._id} category={category} />;
        })}
      </div>
    </main>
    <Footer />
    </>
  );
}
