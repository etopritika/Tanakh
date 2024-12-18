import AppPagination from "@/components/App-pagination";
import { NoVerses } from "@/components/No-verses";
import ScrollUpButton from "@/components/Scroll-up-button";
import VerseList from "@/components/VerseList";
import { fetchVersesData } from "@/lib/api";
import { Verse } from "@/lib/types";
import { useReadingStore } from "@/store/use-reading-store";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function VersesPage() {
  const { pathname } = useLocation();
  const { bookName, sectionName, chapterId } = useParams<{
    bookName: string | undefined;
    sectionName: string | undefined;
    chapterId: string | undefined;
  }>();
  const setLastRead = useReadingStore((state) => state.setLastRead);
  const containerRef = useRef<HTMLElement | null>(null);

  const [verses, setVerses] = useState<Verse[]>([]);
  const [totalChapters, setTotalChapters] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const chapterName = `Глава ${chapterId} | ${verses[0]?.chapter}`;

  useEffect(() => {
    const loadChapter = async () => {
      if (!sectionName || !bookName || !chapterId) {
        setError("Отсутствуют обязательные параметры");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const { result, totalChapters, error } = await fetchVersesData(
        sectionName,
        bookName,
        chapterId
      );

      setVerses(result);
      setTotalChapters(totalChapters);
      setError(error);
      setIsLoading(false);
    };

    loadChapter();
  }, [sectionName, bookName, chapterId]);

  useEffect(() => {
    return () => {
      setLastRead(chapterName, pathname);
    };
  }, [pathname, setLastRead, chapterName]);

  const page = parseInt(chapterId || "1", 10);

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
    return (
      <NoVerses
        error={error}
        sectionName={sectionName || ""}
        bookName={bookName || ""}
        chapterId={chapterId || ""}
      />
    );
  }

  return (
    <section
      ref={containerRef}
      className="space-y-6 flex flex-col justify-between h-full overflow-y-auto"
    >
      <div className="space-y-2">
        <h1>{chapterName}</h1>
        <VerseList verses={verses} scrollRef={containerRef} />
      </div>
      <AppPagination
        currentPage={page}
        totalPages={totalChapters}
        sectionName={sectionName || ""}
        bookName={bookName || ""}
      />
      <ScrollUpButton scrollRef={containerRef} />
    </section>
  );
}
