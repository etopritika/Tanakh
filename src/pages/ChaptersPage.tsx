import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { Chapter } from "@/lib/types";
import ChapterList from "@/components/ChapterList";
import { NoChapters } from "@/components/NoChapters";

export default function ChaptersPage() {
  const { sectionName, bookName } = useParams();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadChapters = async () => {
      if (!sectionName || !bookName) {
        setError("Секция или книга не найдена");
        setLoading(false);
        return;
      }

      try {
        const chaptersModule = await import(
          `../lib/book-chapters/${sectionName}/${bookName}-chapters.ts`
        );
        setChapters(chaptersModule.default);
      } catch {
        setError("Не удалось загрузить главы");
      } finally {
        setLoading(false);
      }
    };

    loadChapters();
  }, [sectionName, bookName]);

  if (loading) {
    return (
      <section className="py-6 flex items-center justify-center h-full">
        <div className="flex space-x-2">
          <LoaderCircle className="animate-spin" />
          <p>Загрузка глав...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return <NoChapters error={error} />;
  }

  return (
    <section className="py-6">
      <ChapterList
        chapters={chapters}
        sectionName={sectionName || ""}
        bookName={bookName || ""}
      />
    </section>
  );
}
