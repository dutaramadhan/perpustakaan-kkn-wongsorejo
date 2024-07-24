import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading";

export default function AddBookModal({
  isOpen,
  onClose,
  setOpenModal
}) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [publisher, setPublisher] = useState("");
    const [year, setYear] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/`, {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                },
                });
            setCategories(response.data);
          } catch (error) {
            console.error("Failed to fetch categories", error);
          }
        };
        fetchCategories();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("category", category);
        formData.append("publisher", publisher);
        formData.append("year", year);
        formData.append("file", pdfFile);

        try {
            setLoading(true);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/books/upload`, formData, {
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            },
            });
            toast.success("Book added successfully!");
            setOpenModal(false);
        } catch (error) {
            toast.error("Failed to add book. Please try again.");
        }
        finally{
            setLoading(false);
        }
    };

    if(loading){
        return <Loading />
    }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-screen h-screen flex justify-center items-center absolute z-50 overflow-visible"
    >
      <div className="w-full h-full absolute top-0" onClick={() => setOpenModal(false)}></div>
      <div className="bg-blue-500 w-[90%] md:w-1/2 md:max-w-[600px] lg:max-w-[800px] p-8 rounded-[10px] relative z-[10]">
        <h1 className="text-yellow text-[30px] font-semibold text-center">
          Tambah Buku
        </h1>
        <form onSubmit={handleSubmit} 
            className="bg-yellow px-8 rounded-[5px] text-[17px] flex flex-col gap-4">
            <label className="flex flex-col gap-2">
                Upload PDF
                <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="focus:outline px-2 py-1 rounded-[4px]"
                />
            </label>
          <label className="flex flex-col gap-2">
            Judul Buku
            <input
              className="focus:outline px-2 py-1 rounded-[4px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2">
            Penulis
            <input
              className="focus:outline px-2 py-1 rounded-[4px]"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2">
            Kategori
            <select
              className="focus:outline px-2 py-1 rounded-[4px]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.data}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            Penerbit
            <input
              className="focus:outline px-2 py-1 rounded-[4px]"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2">
            Tahun Terbit
            <input
              className="focus:outline px-2 py-1 rounded-[4px]"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <div className="flex justify-end">
            <button
              className="w-max rounded-[10px] py-2 px-3 bg-purple-200 hover:bg-[#9676B0] transition duration-200 font-semibold text-black"
              type="submit"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
