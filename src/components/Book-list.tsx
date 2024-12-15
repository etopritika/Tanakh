import { Book } from "@/lib/types";
import { Link } from "react-router-dom";

type BooksListProps = {
  books: Book[];
};

export default function BooksList({ books }: BooksListProps) {
  return (
    <ul className="space-y-4 flex flex-col items-center">
      {books.map((book) => (
        <li key={book.id} className="w-full md:w-1/2">
          <Link
            to={book.href}
            className={`inline-block text-white py-2 px-4 rounded-lg min-w-[150px] w-full text-center ${
              book.disabled ? "bg-muted cursor-not-allowed" : "bg-brown-dark"
            }`}
          >
            {book.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
