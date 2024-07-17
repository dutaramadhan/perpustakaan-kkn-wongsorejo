import { LoadingContext } from "@/contexts/LoadingContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsCaretDownFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function BookDetailsAdminPage() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState({
    bookname: "",
    authorname: "",
    publishername: "",
    publicationyear: "",
    genres: [],
    pages: "",
    price: "",
  });
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("isAuthenticated")) {
      if (id) {
        axios
          .get(`${apiUrl}/books/${id}`)
          .then((res) => {
            if (book.publishername == "") {
              setBook(res.data);
              console.log(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      toast.error("Admin resources, access denied.");
      router.push("/admin");
    }
  }, [id]);

  useEffect(() => {
    if (book.publishername != "") {
      axios
        .get(`${apiUrl}/authors`)
        .then((res) => {
          const authors = res.data;
          const currentAuthor = authors.find(
            (author) => author.authorname == book.authorname
          );
          setAuthors([
            currentAuthor,
            ...authors.filter(
              (author) => author.authorname !== book.authorname
            ),
          ]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occured. Please try again.");
          setLoading(false);
        });

      axios
        .get(`${apiUrl}/publishers`)
        .then((res) => {
          console.log(res.data);
          const publishers = res.data;
          const currentPublisher = publishers.find(
            (publisher) => publisher.publishername == book.publishername
          );
          setPublishers([
            currentPublisher,
            ...publishers.filter(
              (publisher) => publisher.publishername !== book.publishername
            ),
          ]);
          console.log([
            currentPublisher,
            ...publishers.filter(
              (publisher) => publisher.publishername !== book.publishername
            ),
          ]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occured. Please try again.");
          setLoading(false);
        });
    }
  }, [book]);

  return (
    <main className="flex flex-col items-center min-h-screen py-10">
      <div className="w-1/4">
        <form>
          <div>
            <h1>Book ID : {book.bookid}</h1>
          </div>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Book Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Book Name"
              value={book.bookname}
              onChange={(e) => setBook({ ...book, bookname: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Author
            </label>
            <div className="relative flex justify-center items-center">
              <select
                className="shadow appearance-none border rounded cursor-pointer w-full py-2 px-3 text-gray-700 bg-transparent relative z-[2]"
                onChange={(e) => {
                  setBook({ ...book, authorid: e.target.value });
                }}
              >
                {authors.map((author) => (
                  <option key={author?.authorid} value={author?.authorid}>
                    {author?.authorname}
                  </option>
                ))}
              </select>
              <BsCaretDownFill className="absolute right-[10px] opacity-75" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Publisher
            </label>
            <div className="relative flex justify-center items-center">
              <select
                className="shadow appearance-none border rounded cursor-pointer w-full py-2 px-3 text-gray-700 bg-transparent relative z-[2]"
                onChange={(e) => {
                  setBook({ ...book, publishername: e.target.value });
                }}
              >
                {publishers.map((publisher) => (
                  <option
                    key={publisher?.publishername}
                    value={publisher?.publishername}
                  >
                    {publisher?.publishername}
                  </option>
                ))}
              </select>
              <BsCaretDownFill className="absolute right-[10px] opacity-75" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Publication Year
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Publication Year"
              value={book.publicationyear}
              onChange={(e) =>
                setBook({ ...book, publicationyear: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price ($)
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Price"
              value={book.price}
              onChange={(e) => setBook({ ...book, price: e.target.value })}
            />
          </div>
        </form>

        <button
          className="w-full bg-green-400 py-2 mt-10 cursor-pointer hover:bg-green-500 rounded-md"
          onClick={() => {
            axios
              .post(`${apiUrl}/books/update/${id}`, book)
              .then((res) => {
                toast.success("Book updated successfully");
                router.push("/admin/books");
              })
              .catch((err) => {
                console.log(err);
                toast.error("An error occured. Please try again.");
              });
          }}
        >
          Update
        </button>
        <button
          className="w-full bg-red-400 py-2 mt-5 cursor-pointer hover:bg-red-500 rounded-md"
          onClick={() => {
            axios
              .delete(`${apiUrl}/books/delete/${id}`)
              .then((res) => {
                toast.success("Book deleted successfully");
                router.push("/admin/books");
              })
              .catch((err) => {
                toast.error("An error occured. Please try again.");
                console.log(err);
              });
          }}
        >
          Delete
        </button>
        <button
          className="w-full bg-blue-400 py-2 mt-5 cursor-pointer hover:bg-blue-500 rounded-md"
          onClick={() => router.push("/admin/books")}
        >
          &larr; Back
        </button>
      </div>
    </main>
  );
}
