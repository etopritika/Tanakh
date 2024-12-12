import beresheetChapters from "@/lib/book-chapters/tora/beresheet-chapters";
import bemidbarChapters from "@/lib/book-chapters/tora/bemidbar-chapters";
import dvarimChapters from "@/lib/book-chapters/tora/dvarim-chapters";
import schmotChapters from "@/lib/book-chapters/tora/schmot-chapters";
import vaikraChapters from "@/lib/book-chapters/tora/vaikra-chapters";
import { Link, useParams } from "react-router-dom";

const chaptersMap: Record<
  string,
  { key: number; start: number; end: number; verses: number }[]
> = {
  beresheet: beresheetChapters,
  bemidbar: bemidbarChapters,
  dvarim: dvarimChapters,
  schmot: schmotChapters,
  vaikra: vaikraChapters,
};

export default function ChaptersPage() {
  const { chapterPage, bookName, sectionName } = useParams<{
    chapterPage: string;
    bookName: string;
    sectionName: string;
  }>();

  if (!bookName || !chaptersMap[bookName]) {
    return (
      <section className="py-6">
        <div className="flex space-y-2 flex-col items-center">
          <span className="text-danger">Главы отсутствуют</span>
          <Link
            className="inline-block bg-brown-dark text-white py-2 px-4 rounded-lg min-w-[150px] text-center"
            to={`/sections/${sectionName}/books`}
          >
            Назад
          </Link>
        </div>
      </section>
    );
  }

  const chapters = chaptersMap[bookName];

  const page = parseInt(chapterPage || "1", 10);

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
