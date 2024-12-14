import AppPagination from "@/components/App-pagination";
import { NoVerses } from "@/components/No-verses";
import VerseList from "@/components/Verse-List";
import { fetchVersesData } from "@/lib/api";
import { Verse } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VersesPage() {
  const { bookName, sectionName, chapterId, poemPage } = useParams<{
    bookName: string | undefined;
    sectionName: string | undefined;
    poemPage: string | undefined;
    chapterId: string | undefined;
  }>();

  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const poemsPerPage = 5;

  useEffect(() => {
    const loadChapter = async () => {
      if (!sectionName || !bookName || !chapterId) {
        setError("Отсутствуют обязательные параметры");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const { result, error } = await fetchVersesData(
        sectionName,
        bookName,
        chapterId
      );

      setVerses(result);
      setError(error);
      setIsLoading(false);
    };

    loadChapter();
  }, [sectionName, bookName, chapterId]);

  const page = parseInt(poemPage || "1", 10);
  const startIndex = (page - 1) * poemsPerPage;
  const endIndex = startIndex + poemsPerPage;

  const totalVerses = verses.length;
  const totalPages = Math.ceil(totalVerses / poemsPerPage);

  const versesToRender = verses.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <section className="py-6 flex items-center justify-center h-full">
        <p>Загрузка стихов...</p>
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
    <section className="py-6 space-y-4">
      <h1>{verses[0]?.chapter}</h1>
      <VerseList verses={versesToRender} />
      <AppPagination
        currentPage={page}
        totalPages={totalPages}
        sectionName={sectionName || ""}
        bookName={bookName || ""}
        chapterId={chapterId}
      />
    </section>
  );
}
