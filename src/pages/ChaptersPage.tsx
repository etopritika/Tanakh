import { beresheetChapters } from "@/lib/book-chapters/tora/beresheet-chapters";
import { Link, useParams } from "react-router-dom";

export default function ChaptersPage() {
  const { pageNumber, bookName, sectionName } = useParams<{
    pageNumber: string;
    bookName: string;
    sectionName: string;
  }>();

  const chapters = beresheetChapters;

  const page = parseInt(pageNumber || "1", 10);

  const chaptersPerPage = 10;
  const totalChapters = chapters.length;

  const startIndex = (page - 1) * chaptersPerPage;
  const endIndex = Math.min(startIndex + chaptersPerPage, totalChapters);

  const chaptersToRender = chapters.slice(startIndex, endIndex);

  return (
    <section className="py-6">
      <ul className="space-y-4">
        {chaptersToRender.map((chapter) => (
          <li key={chapter.key}>
            <Link
              to={`/sections/${sectionName}/books/${bookName}/chapter/${chapter.key}/verses/1`}
              className="inline-block bg-brown-dark text-white py-2 px-4 rounded-lg min-w-[150px] text-center"
            >
              Глава {chapter.key}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
