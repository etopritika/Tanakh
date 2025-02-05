import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Chapter } from "@/lib/types";
import { useReadingStore } from "@/store/use-reading-store";

export default function ChapterList({
  chapters,
  sectionName,
  bookName,
}: {
  chapters: Chapter[];
  sectionName: string;
  bookName: string;
}) {
  const { lastPathname } = useReadingStore((state) => state.lastRead);

  if (!chapters.length) {
    return <p className="text-center text-danger">Список глав пуст.</p>;
  }

  return (
    <ul className="space-y-2">
      {chapters.map((chapter, index) => {
        const isSubChapter =
          chapter.subKey > 1 ? `${chapter.key}/${chapter.subKey}` : chapter.key;

        const href = `/books/${sectionName}/${bookName}/${isSubChapter}`;
        const isActive = lastPathname === href;
        const isLast = index === chapters.length - 1;

        return (
          <li key={isSubChapter}>
            <Link
              onClick={() => console.log(href)}
              to={href}
              className={`flex rounded-lg px-4 py-2 text-text ${
                isLast ? "" : "border-b"
              } ${isActive ? "bg-brown-light text-white" : ""}`}
            >
              <span className="font-bold">
                {chapter.chapterName.split(" (")[0].trim()}
              </span>
              &nbsp;
              <span className="mr-2">
                ({chapter.chapterName.split(" (")[1]?.trim() || ""}
              </span>
              {chapter.key}
              <ChevronRight className="ml-auto" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
