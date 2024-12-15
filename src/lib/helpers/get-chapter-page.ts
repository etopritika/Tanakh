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
    console.error(`Книга с именем ${bookName} не найдена`);
    return 1;
  }

  const chapterIndex = chapters.findIndex(
    (chapter) => chapter.key === Number(chapterId)
  );

  if (chapterIndex === -1) {
    console.error(
      `Глава с идентификатором ${chapterId} не найдена в книге ${bookName}`
    );
    return 1;
  }

  return Math.floor(chapterIndex / chaptersPerPage) + 1;
}
