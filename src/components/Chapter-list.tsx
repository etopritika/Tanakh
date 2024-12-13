import { Chapter } from "@/lib/types";
import { Link } from "react-router-dom";

interface ChapterListProps {
  chapters: Chapter[];
  sectionName: string;
  bookName: string;
}

export function ChapterList({
  chapters,
  sectionName,
  bookName,
}: ChapterListProps) {
  return (
    <ul className="space-y-4">
      {chapters.map((chapter) => (
        <li key={chapter.key}>
          <Link
            to={`/sections/${sectionName}/books/${bookName}/chapter/${chapter.key}/verses/1`}
            className="inline-block bg-brown-dark text-white py-2 px-4 rounded-lg w-full text-center"
          >
            {chapter.chapterName} | {chapter.key}
          </Link>
        </li>
      ))}
    </ul>
  );
}
