import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import AppPagination from "@/components/App-pagination";
import CopyControls from "@/components/Copy-Controls";
import { NoVerses } from "@/components/NoVerses";
import VerseList from "@/components/VerseList";
import { toast } from "@/hooks/use-toast";
import {
  fetchCommentsByBook,
  fetchVersesByBook,
} from "@/lib/api/fetchFirestoreData";
import { fetchVersesData } from "@/lib/api/fetchVersesData";
import { bookNameMap, Chapter, Verse } from "@/lib/types";
import { useCopyStore } from "@/store/use-copy-store";
import { useReadingStore } from "@/store/use-reading-store";

export default function VersesPage() {
  const { pathname } = useLocation();
  const {
    bookName,
    sectionName,
    chapterId,
    subChapterId = "1",
  } = useParams<{
    bookName?: string;
    sectionName?: string;
    chapterId?: string;
    subChapterId?: string;
  }>();
  const setLastRead = useReadingStore((state) => state.setLastRead);
  const { cancelSelection } = useCopyStore();

  const [state, setState] = useState<{
    verses: Verse[];
    chapters: Chapter[];
    isLoading: boolean;
    error: string | null;
  }>({
    verses: [],
    chapters: [],
    isLoading: true,
    error: null,
  });

  const fullChapterName = (() => {
    const [main, comment] = (state.verses[0]?.chapter || "").split(" (");
    return {
      main: main.trim(),
      comment: comment ? comment.replace(")", "").trim() : "",
      id: chapterId,
    };
  })();

  const lastReadChapter = `${bookNameMap[bookName || ""]} ${chapterId}`;

  useEffect(() => {
    if (!sectionName || !bookName || !chapterId) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Отсутствуют обязательные параметры",
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));

    fetchVersesData(sectionName, bookName, chapterId, subChapterId).then(
      ({ verses, chapters, error }) => {
        setState({ verses, chapters, isLoading: false, error });
      },
    );
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
          toast({
            title:
              index === 0
                ? "Ошибка при загрузке метаданных стихов"
                : "Ошибка при загрузке комментариев",
            description:
              result.reason instanceof Error
                ? result.reason.message
                : "Неизвестная ошибка",
            variant: "destructive",
          });
        }
      });
    };

    loadData();
  }, [bookName]);

  useEffect(() => {
    return () => {
      cancelSelection();
      setLastRead(lastReadChapter, pathname);
    };
  }, [pathname, setLastRead, lastReadChapter, cancelSelection]);

  const page = parseInt(chapterId || "1", 10);
  const subPage = parseInt(subChapterId || "1", 10);

  if (state.isLoading) {
    return (
      <section className="flex h-full items-center justify-center py-6">
        <div className="flex space-x-2">
          <LoaderCircle className="animate-spin" />
          <p>Загрузка стихов...</p>
        </div>
      </section>
    );
  }

  if (state.error) {
    return <NoVerses error={state.error} />;
  }

  return (
    <section className="relative flex flex-col justify-between space-y-4 py-2">
      <AppPagination
        currentPage={page}
        subPage={subPage}
        chapters={state.chapters}
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
        <VerseList verses={state.verses} />
      </div>
      <AppPagination
        currentPage={page}
        subPage={subPage}
        chapters={state.chapters}
        sectionName={sectionName || ""}
        bookName={bookName || ""}
      />
      <CopyControls />
    </section>
  );
}
