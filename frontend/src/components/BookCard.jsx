import Link from "next/link";

export default function BookCard({ book, href }) {
  return (
    <Link href={href} className="transition w-full block cursor-pointer hover:drop-shadow-[0_0_10px_rgb(139,92,246)]">
      <div className="relative w-full aspect-[3/4] h-[250px] bg-gradient-to-br from-violet-500 to-blue-500 shadow-xl border-solid border-2">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(data:image/jpeg;base64,${book.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute bottom-0 bg-gradient-to-b from-transparent from-[30%] to-white/90 w-full pt-10 px-2 pb-1">
            <h1 className="text-center font-bold">{book.title}</h1>
            <h2>{book.author}</h2>
            <h2>{book.year}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}
