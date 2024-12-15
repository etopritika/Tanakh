import {
  beresheetChapters,
  bemidbarChapters,
  dvarimChapters,
  schmotChapters,
  vaikraChapters,
} from "@/lib/book-chapters/tora";
import { chaptersPerPage } from "../settings";

const chaptersMap: Record<string, { key: number | string }[]> = {
  beresheet: beresheetChapters,
  bemidbar: bemidbarChapters,
  dvarim: dvarimChapters,
  schmot: schmotChapters,
  vaikra: vaikraChapters,
};

export function getChapterPage(bookName: string, chapterId: string): number {
  const chapters = chaptersMap[bookName];

  if (!chapters) {
    return 1;
  }

  const chapterIndex = chapters.findIndex(
    (chapter) => chapter.key === Number(chapterId)
  );

  if (chapterIndex === -1) {
    return 1;
  }

  return Math.floor(chapterIndex / chaptersPerPage) + 1;
}
