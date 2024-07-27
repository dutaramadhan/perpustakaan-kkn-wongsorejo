import axios from "axios";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import Select from "react-select";
import DeleteConfirmation from "@/components/modals/DeleteConfirmation";
import EditConfirmation from "@/components/modals/EditConfirmation";

export default function BookPage() {
  const router = useRouter();
  const [book, setBook] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({
    title: "",
    author: "",
    publisher: "",
    year: "",
    category: [],
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookAndCategories = async () => {
      try {
        setLoading(true);
        const bookResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/books/files/${router.query.id}`,
          {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        const bookData = bookResponse.data;
        setBook(bookData);

        const categoryIds = bookData.category;
        const categoryPromises = categoryIds.map(id =>
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            }
          })
        );

        const categoryResponses = await Promise.all(categoryPromises);
        const categoryNames = categoryResponses.map(response => response.data.data);
        setCategoryNames(categoryNames);

        const allCategoriesResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          },
        });
        const allCategories = allCategoriesResponse.data.map(cat => ({ value: cat._id, label: cat.data }));
        setCategories(allCategories);

        setEditedBook({
          title: bookData.title,
          author: bookData.author,
          publisher: bookData.publisher,
          year: bookData.year,
          category: allCategories.filter(cat => categoryIds.includes(cat.value)),
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchBookAndCategories();
    }
  }, [router.isReady, router.query.id, isEditing]);

  const handleDelete = async () => {
    try {
        setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/books/files/${router.query.id}`, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        }
      });
      toast.success("Buku berhasil dihapus");
    } catch (error) {
      toast.error("Gagal Menghapus Buku. Silahkan Coba Lagi.");
    }
    finally {
      router.push("/admin/");
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
        setLoading(true);
      const updatedBook = {
        ...editedBook,
        category: editedBook.category.map(cat => cat.value),
      };
      updatedBook.category = updatedBook.category.join(',')
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/books/files/${router.query.id}`, updatedBook, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        }
      });
      setBook({ ...book, ...updatedBook });
      setIsEditing(false);
      setIsEditModalOpen(false);
      toast.success("Buku Berhasil Diperbarui");
    } catch (error) {
      toast.error("Gagal Memperbarui Buku. Silakan Coba Lagi!");
    } finally {
        setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col items-center min-h-screen py-10">
      <BackButton />
      <div className="w-[150px] aspect-[3/4] grid place-items-center" style={{ backgroundImage: `url(data:image/png;base64,${book.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="w-1/4">
        {isEditing ? (
          <>
            <label>Judul</label>
            <input
              className="w-full mb-2 border p-2"
              type="text"
              value={editedBook.title}
              onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
            />
            <label>Penulis</label>
            <input
              className="w-full mb-2 border p-2"
              type="text"
              value={editedBook.author}
              onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
            />
            <label>Penerbit</label>
            <input
              className="w-full mb-2 border p-2"
              type="text"
              value={editedBook.publisher}
              onChange={(e) => setEditedBook({ ...editedBook, publisher: e.target.value })}
            />
            <label>Tahun Terbit</label>
            <input
              className="w-full mb-2 border p-2"
              type="text"
              value={editedBook.year}
              onChange={(e) => setEditedBook({ ...editedBook, year: e.target.value })}
            />
            <label className="flex flex-col gap-2 mb-2">
              Kategori
              <Select
                isMulti
                value={editedBook.category}
                onChange={(selected) => setEditedBook({ ...editedBook, category: selected })}
                options={categories}
                className="focus:outline-none px-4 py-2 rounded-lg border border-gray-300"
              />
            </label>
            <button
              className="w-full bg-blue-400 py-2 mt-2 cursor-pointer hover:bg-blue-500 rounded-md"
              onClick={() => setIsEditModalOpen(true)}
            >
              Simpan
            </button>
            <button
              className="w-full bg-gray-400 py-2 mt-2 cursor-pointer hover:bg-gray-500 rounded-md mb-10"
              onClick={() => setIsEditing(false)}
            >
              Batal
            </button>
          </>
        ) : (
          <>
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
              className="w-full bg-green-400 py-2 mt-2 cursor-pointer hover:bg-green-500 rounded-md"
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
            <button
              className="w-full bg-yellow-400 py-2 mt-2 cursor-pointer hover:bg-yellow-500 rounded-md"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="w-full bg-red-400 py-2 mt-2 cursor-pointer hover:bg-red-500 rounded-md mb-20"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Hapus
            </button>
          </>
        )}
      </div>
      <Footer />
      <DeleteConfirmation isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} onClick={handleDelete} />
      <EditConfirmation isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} onClick={handleEdit} />
    </main>
  );
}
