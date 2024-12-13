import { Verse } from "../types";

export default function generateChaptersByPoemNumber(bookData: Verse[]) {
  const indexedChapters = [];
  let currentChapter = null;
  let currentChapterName = "";
  let startIndex = 0;

  for (let i = 0; i < bookData.length; i++) {
    const verse = bookData[i];
    const chapterId = verse.id_chapter;

    if (currentChapter !== chapterId) {
      if (currentChapter !== null) {
        indexedChapters.push({
          key: currentChapter,
          chapterName: currentChapterName,
          start: startIndex,
          end: i - 1,
          verses: i - startIndex,
        });
      }

      currentChapter = chapterId;
      currentChapterName = verse.chapter;
      startIndex = i;
    }
  }

  if (currentChapter !== null) {
    indexedChapters.push({
      key: currentChapter,
      chapterName: currentChapterName,
      start: startIndex,
      end: bookData.length - 1,
      verses: bookData.length - startIndex,
    });
  }

  return indexedChapters;
}
