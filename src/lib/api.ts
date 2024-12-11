export const fetchChapterData = async (
  section: string,
  book: string,
  chapter: { key: number; start: number; end: number }
) => {
  try {
    const module = await import(`../data/${section}/obj-${book}.js`);

    const bookData = module.default;

    const chapterData = bookData.slice(chapter.start, chapter.end + 1);
    return chapterData;
  } catch (error) {
    console.error("Помилка завантаження глави:", error);
    return [];
  }
};
