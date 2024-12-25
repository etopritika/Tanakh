import { books } from "@/lib/routes";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function BooksPage() {
  const { sectionName } = useParams();

  if (!sectionName) {
    return (
      <section className="py-6 flex items-center justify-center h-full">
        <span className="text-danger">Секция не найдена</span>
      </section>
    );
  }

  return (
    <section className="py-6">
      <ul>
        {books[sectionName || ""].map(({ name, href }, index) => {
          const isLast = index === books[sectionName || ""].length - 1;
          return (
            <li>
              <Link
                to={href}
                className={`flex px-4 py-2 rounded-lg text-text ${
                  isLast ? "" : "border-b"
                }`}
              >
                {name}
                <ChevronRight className="ml-auto" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
