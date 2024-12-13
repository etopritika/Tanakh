import { Verse } from "./types";

export const fetchVersesData = async (
  section: string,
  book: string,
  chapterId: string
): Promise<{ result: Verse[]; error: string | null }> => {
  try {
    const module = await import(`../data/${section}/obj-${book}.js`);
    const bookData = module.default;

    const chaptersModule = await import(
      `../lib/book-chapters/${section}/${book}-chapters.ts`
    );
    const chapters = chaptersModule.default;

    const chapter = chapters.find(
      (ch: { key: number; start: number; end: number; verses: number }) =>
        String(ch.key) === chapterId
    );

    if (!chapter) {
      throw new Error(`Глава ${chapterId} не найдена.`);
    }

    const versesData = bookData.slice(chapter.start, chapter.end + 1);
    return { result: versesData, error: null };
  } catch (error) {
    return {
      result: [],
      error: error instanceof Error ? error.message : "Неизвестная ошибка.",
    };
  }
};
