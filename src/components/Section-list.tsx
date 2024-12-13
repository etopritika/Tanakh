import { Section } from "@/lib/types";
import { Link } from "react-router-dom";

interface SectionListProps {
  sections: Section[];
}

export function SectionList({ sections }: SectionListProps) {
  return (
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
  );
}
