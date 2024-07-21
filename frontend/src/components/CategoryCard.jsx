import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link href={`/categories/${category._id}`}>
      <div className="flex justify-center items-center flex-col text-white">
        <div className="bg-gradient-to-br from-red-400 to-yellow-500 aspect-square w-[120px] rounded-full grid place-items-center">
          <h1 className="text-center">{category.data}</h1>
        </div>
      </div>
    </Link>
  );
}
