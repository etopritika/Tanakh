import { Chapter, Verse } from "../types";

const errorMessages: Record<string, string> = {
  BOOK_NOT_FOUND: "Данные для указанной книги не найдены.",
  CHAPTER_NOT_FOUND: "Указанная глава не найдена.",
  UNKNOWN_ERROR: "Произошла неизвестная ошибка.",
};

const getErrorMessage = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return errorMessages.UNKNOWN_ERROR;
  }

  if (error.message.includes("404")) {
    return errorMessages.BOOK_NOT_FOUND;
  }

  if (error.message.includes("Указанная")) {
    return error.message;
  }

  return `Произошла ошибка: ${error.message}`;
};

export const fetchVersesData = async (
  section: string,
  book: string,
  chapterId: string,
  subChapterId: string,
): Promise<{
  verses: Verse[];
  chapters: Chapter[];
  error: string | null;
}> => {
  try {
    const res = await fetch(`/data/${book}.json`);
    if (!res.ok) throw new Error(`${res.status}`);
    const bookData: Verse[] = await res.json();

    const { default: chapters } = await import(
      `../book-chapters/${section}/${book}-chapters.ts`
    );

    const chapter = chapters.find(
      (ch: { key: number; subKey: number; start: number; end: number }) =>
        String(ch.key) === chapterId && String(ch.subKey || 1) === subChapterId,
    );

    if (!chapter) {
      throw new Error(errorMessages.CHAPTER_NOT_FOUND);
    }

    const versesData = bookData.slice(chapter.start, chapter.end + 1);
    return { verses: versesData, chapters, error: null };
  } catch (error) {
    return {
      verses: [],
      chapters: [],
      error: getErrorMessage(error),
    };
  }
};
