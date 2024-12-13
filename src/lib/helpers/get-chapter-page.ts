import {
  beresheetChapters,
  bemidbarChapters,
  dvarimChapters,
  schmotChapters,
  vaikraChapters,
} from "@/lib/book-chapters/tora";

const chaptersMap: Record<string, { key: number | string }[]> = {
  beresheet: beresheetChapters,
  bemidbar: bemidbarChapters,
  dvarim: dvarimChapters,
  schmot: schmotChapters,
  vaikra: vaikraChapters,
};

export function getChapterPage(bookName: string, chapterId: string): number {
  const chapters = chaptersMap[bookName];
  const chaptersPerPage = 10;

  if (!chapters) {
    console.error(`Книга з іменем ${bookName} не знайдена`);
    return 1;
  }

  const chapterIndex = chapters.findIndex(
    (chapter) => chapter.key === Number(chapterId)
  );

  if (chapterIndex === -1) {
    console.error(
      `Глава з ідентифікатором ${chapterId} не знайдена у книзі ${bookName}`
    );
    return 1;
  }

  return Math.floor(chapterIndex / chaptersPerPage) + 1;
}
