import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar({ isOpen, mode }) {
  const router = useRouter();
  const { pathname } = router;

  const isActive = (route) => pathname === route;

  return (
    <div
      className={`fixed top-[70px] bottom-[64px] left-0 lg:w-[20%] w-[35%] h-[calc(100%-133px)] bg-blue-500 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 flex flex-col justify-between`}
    >

          {mode !== "admin" && (
            <>
            <div className="text-black text-[18px] border-white">
            <ul>
              <Link
                href="/"
                className={`relative flex flex-row items-center h-11 text-black focus:outline-none hover:bg-blue-300 hover:text-gray-800 pr-6 ${
                  isActive("/") ? "bg-blue-200 text-black" : ""
                }`}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Beranda</span>
              </Link>
              <Link
                href="/categories"
                className={`relative flex flex-row items-center h-11 text-black focus:outline-none hover:bg-blue-300 hover:text-gray-800 pr-6 ${
                  isActive("/categories") ? "bg-blue-200 text-black" : ""
                }`}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Kategori</span>
              </Link>
              </ul>
              </div>
              <Link
        href="/admin/auth/login"
        className="relative flex flex-row items-center h-11 text-black focus:outline-none hover:bg-blue-300 hover:text-gray-800 border-l-4 border-transparent pr-6 mb-1"
      >
        <span className="inline-flex justify-center items-center ml-4">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">Admin</span>
      </Link>
      </>
          )}
          {mode === "admin" && (
            <>
        <div className="text-black text-[18px] border-white">
          <ul>
            <Link
              href="/admin/"
              className={`relative flex flex-row items-center h-11 text-black focus:outline-none hover:bg-blue-300 hover:text-gray-800 pr-6 ${
                isActive("/admin") ? "bg-blue-200 text-black" : ""
              }`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Admin Beranda</span>
            </Link>
            <Link
              href="/admin/categories"
              className={`relative flex flex-row items-center h-11 text-black focus:outline-none hover:bg-blue-300 hover:text-gray-800 pr-6 ${
                isActive("/admin/categories") ? "bg-blue-200 text-black" : ""
              }`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Admin Kategori</span>
            </Link>
            </ul>
            </div>
            <Link href="/" className="relative flex flex-row items-center h-11 text-black focus:outline-none hover:bg-blue-300 hover:text-gray-800 border-l-4 border-transparent pr-6 mb-1">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </span>
        <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
      </Link>
        </>
      )}
    </div>
  );
}
