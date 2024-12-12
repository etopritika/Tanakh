export const fetchChapterData = async (
  section: string,
  book: string,
  chapterId: string
) => {
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

    const chapterData = bookData.slice(chapter.start, chapter.end + 1);
    return chapterData;
  } catch (error) {
    console.error("Помилка завантаження глави:", error);
    return [];
  }
};
