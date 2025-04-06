import { Verse } from "@/lib/types";

export const groupVersesByChapterSorted = (
  verses: Verse[],
): Record<string, Verse[]> => {
  const groups: Record<string, Verse[]> = {};

  for (const verse of verses) {
    const key = `${verse.id_book}-${verse.id_chapter}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(verse);
  }

  return Object.fromEntries(
    Object.entries(groups).sort(([a], [b]) => {
      const [aBook, aChapter] = a.split("-").map(Number);
      const [bBook, bChapter] = b.split("-").map(Number);
      return aBook === bBook ? aChapter - bChapter : aBook - bBook;
    }),
  );
};
