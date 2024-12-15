import {
  beresheetChapters,
  bemidbarChapters,
  dvarimChapters,
  schmotChapters,
  vaikraChapters,
} from "@/lib/book-chapters/tora";
import { useParams } from "react-router-dom";
import AppPagination from "@/components/App-pagination";
import { NoChapters } from "@/components/No-chapters";
import { ChapterList } from "@/components/Chapter-List";

const chaptersMap: Record<
  string,
  {
    key: number;
    start: number;
    end: number;
    verses: number;
    chapterName: string;
  }[]
> = {
  beresheet: beresheetChapters,
  bemidbar: bemidbarChapters,
  dvarim: dvarimChapters,
  schmot: schmotChapters,
  vaikra: vaikraChapters,
};

export default function ChaptersPage() {
  const { chapterPage, bookName, sectionName } = useParams<{
    chapterPage: string | undefined;
    bookName: string | undefined;
    sectionName: string | undefined;
  }>();

  if (!bookName || !chaptersMap[bookName] || !sectionName) {
    return <NoChapters sectionName={sectionName || ""} />;
  }

  const chapters = chaptersMap[bookName];

  const page = parseInt(chapterPage || "1", 10);

  const chaptersPerPage = 10;
  const totalChapters = chapters.length;
  const totalPages = Math.ceil(totalChapters / chaptersPerPage);

  const startIndex = (page - 1) * chaptersPerPage;
  const endIndex = Math.min(startIndex + chaptersPerPage, totalChapters);

  const chaptersToRender = chapters.slice(startIndex, endIndex);

  return (
    <section className="py-6 space-y-6 h-full flex flex-col justify-between overflow-y-auto">
      <ChapterList
        chapters={chaptersToRender}
        sectionName={sectionName}
        bookName={bookName}
      />
      <AppPagination
        currentPage={page}
        totalPages={totalPages}
        sectionName={sectionName}
        bookName={bookName}
      />
    </section>
  );
}
