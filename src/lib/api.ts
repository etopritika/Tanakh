import { Chapter, Verse } from "./types";

export const fetchVersesData = async (
  section: string,
  book: string,
  chapterId: string,
  subChapterId: string
): Promise<{
  verses: Verse[];
  chapters: Chapter[];
  error: string | null;
}> => {
  try {
    const module = await import(`../data/${section}/obj-${book}.ts`);
    const bookData = module.default;

    const chaptersModule = await import(
      `../lib/book-chapters/${section}/${book}-chapters.ts`
    );
    const chapters = chaptersModule.default;

    const chapter = chapters.find(
      (ch: { key: number; subKey: number; start: number; end: number }) =>
        String(ch.key) === chapterId && String(ch.subKey || 1) === subChapterId
    );

    if (!chapter) {
      throw new Error(`Глава ${chapterId} не найдена.`);
    }

    const versesData = bookData.slice(chapter.start, chapter.end + 1);
    return { verses: versesData, chapters, error: null };
  } catch (error) {
    return {
      verses: [],
      chapters: [],
      error: error instanceof Error ? error.message : "Неизвестная ошибка.",
    };
  }
};
