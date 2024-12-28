import { Chapter } from "@/lib/types";
import { useReadingStore } from "@/store/use-reading-store";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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

        const href = `/${sectionName}/${bookName}/${isSubChapter}`;
        const isActive = lastPathname === href;
        const isLast = index === chapters.length - 1;

        return (
          <li key={isSubChapter}>
            <Link
              to={href}
              className={`flex px-4 py-2 rounded-lg text-text ${
                isLast ? "" : "border-b"
              }`}
            >
              <span className={isActive ? "font-bold" : ""}>
                {chapter.chapterName.split(" (")[0].trim()}
              </span>
              &nbsp;
              <span>({chapter.chapterName.split(" (")[1]?.trim() || ""}</span>:{" "}
              {chapter.key}
              <ChevronRight className="ml-auto" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
