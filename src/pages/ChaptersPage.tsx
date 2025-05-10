import { LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ChapterList from "@/components/ChaptersPage/ChapterList";
import { NoChapters } from "@/components/ChaptersPage/NoChapters";
import { Chapter } from "@/lib/types";

export default function ChaptersPage() {
  const { sectionName, bookName } = useParams();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadChapters = async () => {
      if (!sectionName || !bookName) {
        setError("Секция или книга не найдена");
        setIsLoading(false);
        return;
      }

      try {
        const chaptersModule = await import(
          `../lib/book-chapters/${sectionName}/${bookName}-chapters.ts`
        );
        setChapters(chaptersModule.default);
      } catch {
        setError(
          `Не удалось загрузить главы для книги "${bookName}" в разделе "${sectionName}".`,
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadChapters();
  }, [sectionName, bookName]);

  if (isLoading) {
    return (
      <section className="flex h-full items-center justify-center py-6">
        <div className="flex space-x-2" role="status">
          <LoaderCircle
            className="animate-spin"
            aria-hidden="true"
            focusable="false"
          />
          <p>Загрузка глав...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return <NoChapters error={error} />;
  }

  return (
    <section className="py-6" aria-labelledby="chapters-title">
      <h1 id="chapters-title" className="sr-only">
        Список глав
      </h1>
      <ChapterList
        chapters={chapters}
        sectionName={sectionName || ""}
        bookName={bookName || ""}
      />
    </section>
  );
}
