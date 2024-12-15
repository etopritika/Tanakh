import bemidbar from "@/data/tora/obj-bemidbar";
import beresheet from "@/data/tora/obj-beresheet";
import dvarim from "@/data/tora/obj-dvarim";
import schmot from "@/data/tora/obj-schmot";
import vaikra from "@/data/tora/obj-vaikra";
import { Verse } from "@/lib/types";
import { poemsPerPage } from "../settings";

const booksMap: Record<string, Record<string, Verse[]>> = {
  tora: {
    beresheet,
    schmot,
    vaikra,
    bemidbar,
    dvarim,
  },
};

export function getVersePage(
  sectionName: string,
  bookName: string,
  chapterId: number,
  poemNumber: number
): number {
  const sectionBooks = booksMap[sectionName];
  if (!sectionBooks) {
    return -1;
  }

  const book = sectionBooks[bookName];
  if (!book) {
    return -1;
  }

  const chapterVerses = book.filter((verse) => verse.id_chapter === chapterId);
  if (!chapterVerses.length) {
    return -1;
  }

  const verseIndex = chapterVerses.findIndex(
    (verse) => verse.poemNumber === poemNumber
  );

  if (verseIndex === -1) {
    return -1;
  }

  return Math.floor(verseIndex / poemsPerPage) + 1;
}
