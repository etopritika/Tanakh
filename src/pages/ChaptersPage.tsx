import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRight, LoaderCircle } from "lucide-react";
import { useReadingStore } from "@/store/use-reading-store";
import { Chapter } from "@/lib/types";

export default function ChaptersPage() {
  const { sectionName, bookName } = useParams();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { lastPathname } = useReadingStore((state) => state.lastRead);

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
    return (
      <section className="py-6 flex items-center justify-center h-full">
        <span className="text-danger">{error}</span>
      </section>
    );
  }

  return (
    <section className="py-6">
      <ul className="space-y-2">
        {chapters.map((chapter, index) => {
          const href = `/${sectionName}/${bookName}/${chapter.key}`;
          const isActive = lastPathname === href;
          const isLast = index === chapters.length - 1;
          console.log(isLast);
          return (
            <li key={chapter.key}>
              <Link
                to={href}
                className={`flex px-4 py-2 rounded-lg text-text hover:underline ${
                  isActive ? "underline font-bold" : ""
                } ${isLast ? "" : "border-b"}`}
              >
                {chapter.chapterName} : {chapter.key}
                <ChevronRight className="ml-auto" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
