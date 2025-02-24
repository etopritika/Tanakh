import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import AppPagination from "@/components/App-pagination";
import { NoVerses } from "@/components/NoVerses";
import VerseList from "@/components/VerseList";
import { toast } from "@/hooks/use-toast";
import {
  fetchCommentsByBook,
  fetchVersesByBook,
} from "@/lib/api/fetchFirestoreData";
import { fetchVersesData } from "@/lib/api/fetchVersesData";
import { bookNameMap, Chapter, Verse } from "@/lib/types";
import { useReadingStore } from "@/store/use-reading-store";

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
  const lastReadChapter = `${bookNameMap[bookName || ""]} ${chapterId}`;

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
        subChapterId || "1",
      );

      setVerses(verses);
      setChapters(chapters);
      setError(error);
      setIsLoading(false);
    };

    loadChapter();
  }, [sectionName, bookName, chapterId, subChapterId]);

  useEffect(() => {
    if (!bookName) return;
    const loadData = async () => {
      const results = await Promise.allSettled([
        fetchVersesByBook(bookName),
        fetchCommentsByBook(bookName),
      ]);

      results.forEach((result, index) => {
        if (result.status === "rejected") {
          const errorMessage =
            result.reason instanceof Error
              ? result.reason.message
              : "Неизвестная ошибка";

          toast({
            title:
              index === 0
                ? "Ошибка при загрузке метаданных стихов"
                : "Ошибка при загрузке комментариев",
            description: errorMessage,
            variant: "destructive",
          });
        }
      });
    };

    loadData();
  }, [bookName]);

  useEffect(() => {
    return () => {
      setLastRead(lastReadChapter, pathname);
    };
  }, [pathname, setLastRead, lastReadChapter]);

  const page = parseInt(chapterId || "1", 10);
  const subPage = parseInt(subChapterId || "1", 10);

  if (isLoading) {
    return (
      <section className="flex h-full items-center justify-center py-6">
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
    <section className="flex flex-col justify-between space-y-4 py-2">
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
