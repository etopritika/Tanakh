import { useParams } from "react-router";
import BooksList from "@/components/Book-list";
import { books } from "@/lib/routes";

export default function BooksPage() {
  const { sectionName } = useParams<{ sectionName: string }>();

  if (!sectionName) {
    return <p className="text-red-500">Книга не найдена</p>;
  }

  return (
    <section className="py-6">
      <BooksList books={books[sectionName]} />
    </section>
  );
}
