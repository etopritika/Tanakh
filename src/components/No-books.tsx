import { Link } from "react-router-dom";

export default function NoBooks() {
  return (
    <section className="py-6 flex items-center justify-center flex-col space-y-2 h-full">
      <p className="text-red-500">Книги не найдены</p>
      <Link
        className="inline-block bg-brown-dark text-white py-2 px-4 rounded-lg min-w-[150px] text-center"
        to={"/sections"}
      >
        Назад
      </Link>
    </section>
  );
}
