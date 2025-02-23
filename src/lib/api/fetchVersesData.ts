import { Chapter, Verse } from "../types";

const errorMessages: Record<string, string> = {
  MODULE_NOT_FOUND: "Данные для указанной книги не найдены.",
  CHAPTER_NOT_FOUND: "Указанная глава не найдена.",
  UNKNOWN_ERROR: "Произошла неизвестная ошибка.",
};

const getErrorMessage = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return errorMessages.UNKNOWN_ERROR;
  }

  if (error.message.includes("Unknown variable")) {
    return errorMessages.MODULE_NOT_FOUND;
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
    const moduleUrl = new URL(
      `../../data/${section}/obj-${book}.ts`,
      import.meta.url,
    ).href;
    const module = await import(moduleUrl);
    const bookData = module.default;

    const chaptersModuleUrl = new URL(
      `../book-chapters/${section}/${book}-chapters.ts`,
      import.meta.url,
    ).href;
    const chaptersModule = await import(chaptersModuleUrl);
    const chapters = chaptersModule.default;

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
