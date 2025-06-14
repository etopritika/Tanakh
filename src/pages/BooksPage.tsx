import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { BOOKS } from "@/lib/routes";
import { SectionName } from "@/lib/types";

export default function BooksPage() {
  const { sectionName } = useParams();

  if (
    !sectionName ||
    !Object.values(SectionName).includes(sectionName as SectionName)
  ) {
    return (
      <section className="flex h-full items-center justify-center py-6">
        <div className="text-center" role="alert">
          <span className="text-danger">Секция не найдена</span>
          <p>Пожалуйста, выберите другую секцию из меню.</p>
        </div>
      </section>
    );
  }

  const sectionBooks = BOOKS[sectionName] || [];

  return (
    <section className="py-6" aria-labelledby="books-list-title">
      <h1 id="books-list-title" className="sr-only">
        Список книг
      </h1>
      <ul>
        {sectionBooks.map(({ name, href }, index) => {
          const isLast = index === sectionBooks.length - 1;
          return (
            <li key={name}>
              <Link
                to={href}
                className={`flex rounded-lg px-4 py-2 text-text ${
                  isLast ? "" : "border-b"
                }`}
                aria-label={`Открыть книгу ${name}`}
              >
                {name}
                <ChevronRight
                  className="ml-auto"
                  aria-hidden="true"
                  focusable="false"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
