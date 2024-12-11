import { Link } from "react-router-dom";

const sections = [
  { name: "Тора", path: "/sections/tora/books" },
  { name: "Невиим", path: "/sections/neviim/books" },
  { name: "Ктувим", path: "/sections/ketuvim/books" },
];

export default function SectionsPage() {
  return (
    <section className="py-6">
      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.path}>
            <Link
              className="inline-block bg-brown-dark text-white py-2 px-4 rounded-lg min-w-[100px] text-center"
              to={section.path}
            >
              {section.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
