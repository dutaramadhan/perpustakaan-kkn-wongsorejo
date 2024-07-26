import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import AddButton from "@/components/AddButton";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSession } from "next-auth/react";
import axios from 'axios';
import { toast } from "react-toastify";
import AddEditCategory from "@/components/modals/AddEditCategory";
import DeleteConfirmation from "@/components/modals/DeleteConfirmation";

export default function AdminCategories() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          }
        });
        setCategories(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
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

  const handleDelete = async (id) => {
    try {
      setLoading(true);
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/delete/${id}`, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        }
      });
      setCategories(categories.filter(category => category._id !== id));
      toast.success("Kategori Berhasil Dihapus")
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleteModalOpen(false);
      setLoading(false);
    }
  };

  const handleAddOrEdit = async (category) => {
    try {
      setLoading(true);
        if (selectedCategory) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/categories/edit/${selectedCategory._id}`, category, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          }
        });
        toast.success("Kategori Berhasil Diperbarui")
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories/add`, category, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          }
        });
        toast.success("Kategori Berhasil Ditambahkan")
      }
      setOpenModal(false);
      setSelectedCategory(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="relative min-h-screen flex flex-col">
      <Navbar Text={"Halaman Admin"} mode={"admin"} />
      <AddEditCategory
        data={selectedCategory}
        isOpen={openModal}
        setOpenModal={setOpenModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddOrEdit}
      />
      <div className="flex-grow flex flex-col items-center py-20">
        <AddButton onClick={() => { setSelectedCategory(null); setOpenModal(true); }} />
        <table className="bg-white border">
          <thead className="bg-blue-300">
            <tr>
              <th className="py-2 px-10 text-center">No</th>
              <th className="py-2 px-10 text-center">Kategori</th>
              <th className="py-2 px-10 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id} className="text-center">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{category.data}</td>
                <td className="py-2">
                  <div className="flex justify-between space-x-4">
                    <button className="text-green-500 px-2" onClick={() => { setSelectedCategory(category); setOpenModal(true); }}>Edit</button>
                    <button className="text-red-500 px-2" onClick={() => { setSelectedCategory(category); setIsDeleteModalOpen(true); }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCategory && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          onClick={() => handleDelete(selectedCategory._id)}
        />
      )}
      <Footer />
    </main>
  );
}