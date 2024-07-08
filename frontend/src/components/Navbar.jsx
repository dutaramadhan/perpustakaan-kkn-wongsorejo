import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  return (
    <nav
      className={
        "bg-blue-500 fixed top-0 py-3 md:py-5 px-[20px] md:px-[50px] lg:px-[30px] flex w-full  text-black items-center"
      }
    >
      <Link href="/">
        <div className="flex font-medium text-black items-center gap-2">
          <h1 className="text-shadow-2 text-[18px] md:text-[25px] font-bold">
            Perpustakaan Digital
          </h1>
        </div>
      </Link>
    </nav>
  );
}