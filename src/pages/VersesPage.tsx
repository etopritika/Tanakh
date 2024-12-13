import AppPagination from "@/components/App-pagination";
import { Card, CardContent } from "@/components/ui/card";
import { fetchVersesData } from "@/lib/api";
import { getChapterPage } from "@/lib/helpers/get-chapter-page";
import { Verse } from "@/lib/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
      <section className="py-6">
        <p>Загрузка...</p>
      </section>
    );
  }

  if (!error) {
    return (
      <section className="py-6">
        <div className="flex space-y-2 flex-col items-center">
          <span className="text-danger">{error}</span>
          <Link
            className="inline-block bg-brown-dark text-white py-2 px-4 rounded-lg min-w-[150px] text-center"
            to={`/sections/${sectionName}/books/${bookName}/chapters/${getChapterPage(
              bookName || "",
              chapterId || "1"
            )}`}
          >
            Назад
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 space-y-4">
      <h1>{verses[0]?.chapter}</h1>
      <ul className="space-y-4">
        {versesToRender.map((verse, index) => (
          <li key={startIndex + index}>
            <Card className="bg-white">
              <CardContent className="pt-6 space-y-2">
                <p>{verse.verse}</p>
                <p>{verse.verse_ivrit}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
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
