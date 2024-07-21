import CategoryCard from "@/components/CategoryCard";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

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
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    },[])

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

  return (
    <>
    <Navbar Text="Kategori"/>
    <main className="flex min-h-screen flex-col py-20">
      <div className="grid grid-cols-4 gap-5">
        {categories.map((category, index) => {
          return <CategoryCard key={category._id} category={category} />;
        })}
      </div>
    </main>
    </>
  );
}
