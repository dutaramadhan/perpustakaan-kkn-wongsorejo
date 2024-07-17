import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <Link href={`/book/${book.bookid}`} className="transition w-full block cursor-pointer hover:drop-shadow-[0_0_10px_rgb(139,92,246)]">
      <div className="relative w-full aspect-[3/4] h-[250px] bg-gradient-to-br from-violet-500 to-blue-500">
        <div className="absolute bottom-0 bg-gradient-to-b from-transparent from-[30%] to-white/90 w-full pt-10 px-2 pb-1">
          <h1 className="text-center font-bold">{book.bookname}</h1>
          <h2>{book.authorname}</h2>
          <h2>{book.price}$</h2>
        </div>
      </div>
    </Link>
  );
}
