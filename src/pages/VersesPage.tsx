import AppPagination from "@/components/App-pagination";
import { NoVerses } from "@/components/NoVerses";
import VerseList from "@/components/VerseList";
import { fetchVersesData } from "@/lib/api";
import { bookNameMap, Chapter, Verse } from "@/lib/types";
import { useReadingStore } from "@/store/use-reading-store";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function VersesPage() {
  const { pathname } = useLocation();
  const { bookName, sectionName, chapterId, subChapterId } = useParams<{
    bookName: string | undefined;
    sectionName: string | undefined;
    chapterId: string | undefined;
    subChapterId: string | undefined;
  }>();
  const setLastRead = useReadingStore((state) => state.setLastRead);

  const [verses, setVerses] = useState<Verse[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [chapterMain, chapterComment] = (verses[0]?.chapter || "").split(" (");
  const fullChapterName = {
    main: chapterMain.trim(),
    comment: chapterComment ? chapterComment.replace(")", "").trim() : "",
    id: chapterId,
  };
  const lastReadChapter = `${bookNameMap[bookName || ""]} : ${chapterId}`;

  useEffect(() => {
    const loadChapter = async () => {
      if (!sectionName || !bookName || !chapterId) {
        setError("Отсутствуют обязательные параметры");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const { verses, chapters, error } = await fetchVersesData(
        sectionName,
        bookName,
        chapterId,
        subChapterId || "1"
      );

      setVerses(verses);
      setChapters(chapters);
      setError(error);
      setIsLoading(false);
    };

    loadChapter();
  }, [sectionName, bookName, chapterId, subChapterId]);

  useEffect(() => {
    return () => {
      setLastRead(lastReadChapter, pathname);
    };
  }, [pathname, setLastRead, lastReadChapter]);

  const page = parseInt(chapterId || "1", 10);
  const subPage = parseInt(subChapterId || "1", 10);

  if (isLoading) {
    return (
      <section className="py-6 flex items-center justify-center h-full">
        <div className="flex space-x-2">
          <LoaderCircle className="animate-spin" />
          <p>Загрузка стихов...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return <NoVerses error={error} />;
  }

  return (
    <section className="space-y-4 py-2 flex flex-col justify-between">
      <AppPagination
        currentPage={page}
        subPage={subPage}
        chapters={chapters}
        sectionName={sectionName || ""}
        bookName={bookName || ""}
      />
      <div className="space-y-2 pb-8">
        <h1>
          <span className="font-bold">{fullChapterName.main}</span>
          {fullChapterName.comment && (
            <span> ({fullChapterName.comment})</span>
          )}{" "}
          {fullChapterName.id}
        </h1>
        <VerseList verses={verses} />
      </div>
      <AppPagination
        currentPage={page}
        subPage={subPage}
        chapters={chapters}
        sectionName={sectionName || ""}
        bookName={bookName || ""}
      />
    </section>
  );
}
