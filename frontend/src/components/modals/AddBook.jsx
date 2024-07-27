import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading";
import Select from "react-select";

export default function AddBookModal({ isOpen, onClose, setOpenModal, setIsLoading }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState([]);
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/`, {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        });
        setCategories(response.data.map(cat => ({ value: cat._id, label: cat.data })));
      } catch (error) {
        console.error("Gagal untuk Mendapatkan Data", error);
      }
    };
    fetchCategories();
  }, []);

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setCategory([]);
    setPublisher("");
    setYear("");
    setPdfFile(null);
  };
  
  useEffect(() => {
    if(!isOpen){
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category.map(cat => cat.value).join(','));
    formData.append("publisher", publisher);
    formData.append("year", year);
    formData.append("file", pdfFile);

    try {
      console.log(formData)
      setIsLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/books/upload`, formData, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      resetForm();
      setOpenModal(false);
      toast.success("Buku Berhasil Ditambahkan");
    } catch (error) {
      console.log("Error adding book:", error.response || error.message);
      toast.error("Gagal untuk Menambahkan Buku. Silahkan Coba Lagi!");
    } 
    finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-screen h-screen flex justify-center items-center absolute overflow-visible"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="w-full h-full absolute top-0" onClick={() => setOpenModal(false)}></div>
      <div className="bg-white w-[90%] md:w-1/2 lg:w-1/3 p-8 rounded-lg relative z-60 max-h-[90%] overflow-y-auto shadow-lg transform transition-all duration-500 ease-in-out">
        <h1 className="text-black text-3xl font-semibold text-center mb-4">
          Tambah Buku
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-6 rounded-lg text-lg flex flex-col gap-1"
        >
          <label className="flex flex-col gap-1">
            Upload PDF
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="focus:outline-none px-4 py-2 rounded-lg border border-gray-300"
            />
          </label>
          <label className="flex flex-col gap-1">
            Judul Buku
            <input
              className="focus:outline-none px-4 py-2 rounded-lg border border-gray-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            Penulis
            <input
              className="focus:outline-none px-4 py-2 rounded-lg border border-gray-300"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            Kategori
            <Select
              isMulti
              value={category}
              onChange={setCategory}
              options={categories}
              className="focus:outline-none px-4 py-2 rounded-lg border border-gray-300"
            />
          </label>
          <label className="flex flex-col gap-1">
            Penerbit
            <input
              className="focus:outline-none px-4 py-2 rounded-lg border border-gray-300"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            Tahun Terbit
            <input
              className="focus:outline-none px-4 py-2 rounded-lg border border-gray-300"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
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
