import { Link } from "react-router-dom";

const sections = [
  { name: "Тора", href: "/sections/tora/books" },
  { name: "Невиим", href: "/sections/neviim/books" },
  { name: "Ктувим", href: "/sections/ketuvim/books" },
];

export default function SectionsPage() {
  return (
    <section className="py-6">
      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.href}>
            <Link
              className="inline-block bg-brown-dark text-white py-2 px-4 rounded-lg min-w-[100px] text-center"
              to={section.href}
            >
              {section.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
