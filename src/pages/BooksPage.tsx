import { useParams } from "react-router";
import { books } from "@/lib/routes";
import BooksList from "@/components/BookList";
import NoBooks from "@/components/No-books";

export default function BooksPage() {
  const { sectionName } = useParams<{ sectionName: string | undefined }>();

  if (!sectionName) {
    return <NoBooks />;
  }

  return (
    <section className="py-6">
      <BooksList books={books[sectionName]} />
    </section>
  );
}
