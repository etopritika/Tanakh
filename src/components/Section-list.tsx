import { Section } from "@/lib/types";
import { Link } from "react-router-dom";

interface SectionListProps {
  sections: Section[];
}

export function SectionList({ sections }: SectionListProps) {
  return (
    <ul className="space-y-4 flex flex-col items-center">
      {sections.map((section) => (
        <li key={section.href} className="w-full md:w-1/2">
          <Link
            className="inline-block bg-brown-dark text-white py-2 px-4 rounded-lg min-w-[100px] w-full text-center"
            to={section.href}
          >
            {section.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
