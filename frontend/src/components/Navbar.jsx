import Image from "next/image";
import Link from "next/link";
import Hamburger from "./Hamburger";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Navbar({Text}) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleHamburgerBar = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <nav className="z-50 bg-blue-500 fixed top-0 py-5 px-[20px] md:px-[50px] lg:px-[30px] flex h-[70px] w-full text-black items-center">
      <Hamburger onClick={toggleHamburgerBar} />
      <Sidebar isOpen={isHamburgerOpen} onClick={toggleHamburgerBar} />
      <Link href="/">
        <div className="px-3 flex font-medium text-black items-center gap-2">
          <h1 className="text-shadow-2 text-[18px] md:text-[25px] font-bold">
            {Text}
          </h1>
        </div>
      </Link>
    </nav>
  );
}
