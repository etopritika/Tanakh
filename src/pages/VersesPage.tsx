import AppPagination from "@/components/App-pagination";
import { NoVerses } from "@/components/No-verses";
import VerseList from "@/components/VerseList";
import { fetchVersesData } from "@/lib/api";
import { bookNameMap, Verse } from "@/lib/types";
import { useReadingStore } from "@/store/use-reading-store";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function VersesPage() {
  const { pathname } = useLocation();
  const { bookName, sectionName, chapterId } = useParams<{
    bookName: string | undefined;
    sectionName: string | undefined;
    chapterId: string | undefined;
  }>();
  const setLastRead = useReadingStore((state) => state.setLastRead);

  const [verses, setVerses] = useState<Verse[]>([]);
  const [totalChapters, setTotalChapters] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fullChapterName = `${verses[0]?.chapter || ""} : ${chapterId}`;
  const lastReadChapter = `${bookNameMap[bookName || ""]} : ${chapterId}`;

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
      setLastRead(lastReadChapter, pathname);
    };
  }, [pathname, setLastRead, lastReadChapter]);

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
    return <NoVerses error={error} />;
  }

  return (
    <section className="space-y-6 py-2 flex flex-col justify-between">
      <div className="space-y-2">
        <h1 className="font-bold">{fullChapterName}</h1>
        <VerseList verses={verses} />
      </div>
      <AppPagination
        currentPage={page}
        totalPages={totalChapters}
        sectionName={sectionName || ""}
        bookName={bookName || ""}
      />
    </section>
  );
}
