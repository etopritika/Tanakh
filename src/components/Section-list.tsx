import { Section } from "@/lib/types";
import { useReadingStore } from "@/store/use-reading-store";
import { Album } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionListProps {
  sections: Section[];
}

export function SectionList({ sections }: SectionListProps) {
  const { pathname, chapterName } = useReadingStore((state) => state.lastRead);

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
      {pathname && chapterName && (
        <li key={pathname} className="w-full md:w-1/2">
          <Link
            to={pathname}
            className="bg-brown-light text-white py-2 px-4 rounded-lg min-w-[100px] flex items-center justify-center"
          >
            {chapterName}
            <Album className="ml-3" />
          </Link>
        </li>
      )}
    </ul>
  );
}
