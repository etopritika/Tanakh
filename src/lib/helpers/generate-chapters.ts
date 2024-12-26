import { Verse } from "../types";

/**
 * `generateChaptersByPoemNumber` function creates indexed chapters and subchapters
 * from an array of book verses.
 *
 * Each verse in the array contains information about the chapter (`id_chapter`)
 * and subchapter (`id_chapter_two`, defaults to 1 if missing). The function groups
 * the verses into chapters and subchapters, providing detailed information about
 * each chapter.
 *
 * @param {Verse[]} bookData - An array of verse objects, where each object contains:
 *  - `id_chapter`: Chapter number
 *  - `id_chapter_two`: Subchapter number (optional, defaults to 1)
 *  - `chapter`: Chapter name
 * @returns {Array<{ key: number; subKey: number; chapterName: string; start: number; end: number; verses: number }>}
 * An array of chapter objects, each containing:
 *  - `key`: Chapter number
 *  - `subKey`: Subchapter number
 *  - `chapterName`: Chapter name
 *  - `start`: Index of the first verse in the chapter in the original array
 *  - `end`: Index of the last verse in the chapter in the original array
 *  - `verses`: Total number of verses in the chapter
 *
 * @example
 * // Book data
 * const bookData = [
 *   { id_chapter: 1, id_chapter_two: 1, chapter: "Chapter 1", ... },
 *   { id_chapter: 1, id_chapter_two: 1, chapter: "Chapter 1", ... },
 *   { id_chapter: 1, id_chapter_two: 2, chapter: "Chapter 1.2", ... },
 *   { id_chapter: 2, id_chapter_two: 1, chapter: "Chapter 2", ... },
 * ];
 *
 * // Call the function
 * const chapters = generateChaptersByPoemNumber(bookData);
 *
 * // Log the result in a readable format
 * console.log(JSON.stringify(chapters, null, 2));
 *
 * // Result in console
 * [
 *   {
 *     "key": 1,
 *     "subKey": 1,
 *     "chapterName": "Chapter 1",
 *     "start": 0,
 *     "end": 1,
 *     "verses": 2
 *   },
 *   {
 *     "key": 1,
 *     "subKey": 2,
 *     "chapterName": "Chapter 1.2",
 *     "start": 2,
 *     "end": 2,
 *     "verses": 1
 *   },
 *   {
 *     "key": 2,
 *     "subKey": 1,
 *     "chapterName": "Chapter 2",
 *     "start": 3,
 *     "end": 3,
 *     "verses": 1
 *   }
 * ];
 */

export default function generateChaptersByPoemNumber(bookData: Verse[]) {
  const indexedChapters = [];
  let currentChapter = null;
  let currentSubChapter = null;
  let currentChapterName = "";
  let startIndex = 0;

  for (let i = 0; i < bookData.length; i++) {
    const verse = bookData[i];
    const chapterId = verse.id_chapter;
    const subChapterId = verse.id_chapter_two ?? 1;

    if (currentChapter !== chapterId || currentSubChapter !== subChapterId) {
      if (currentChapter !== null) {
        indexedChapters.push({
          key: currentChapter,
          subKey: currentSubChapter,
          chapterName: currentChapterName,
          start: startIndex,
          end: i - 1,
          verses: i - startIndex,
        });
      }

      currentChapter = chapterId;
      currentSubChapter = subChapterId;
      currentChapterName = verse.chapter;
      startIndex = i;
    }
  }

  if (currentChapter !== null) {
    indexedChapters.push({
      key: currentChapter,
      subKey: currentSubChapter,
      chapterName: currentChapterName,
      start: startIndex,
      end: bookData.length - 1,
      verses: bookData.length - startIndex,
    });
  }

  return indexedChapters;
}
