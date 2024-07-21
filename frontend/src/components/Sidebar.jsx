import Link from "next/link";

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`fixed top-[70px] bottom-[64px] left-0 lg:w-[20%] w-[35%] h-[calc(100%-133px)] bg-blue-500 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="text-black text-[18px]">
        <ul>
        <li className="mt-[1px] px-4 py-2 border-b border-t">
            <Link href="/" >Beranda</Link>
          </li>
          <li className="mt-[1px] px-4 py-2 border-b">
            <Link href="/categories" >Kategori</Link>
          </li>
          <li className="px-4 py-2 border-b">
            <Link href="/admin/auth/login" >Admin</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
