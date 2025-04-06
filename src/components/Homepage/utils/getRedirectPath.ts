import { BookPathMap, Verse } from "@/lib/types";

export const getRedirectPath = (verse: Verse | undefined): string => {
  if (!verse) return "";

  const { id_book, id_chapter, id_chapter_two } = verse;
  const bookPath = BookPathMap[id_book];

  if (!bookPath) {
    console.error(`BookPathMap не содержит запись для id_book: ${id_book}`);
    return "";
  }

  const { section, bookName } = bookPath;
  return `books/${section}/${bookName}/${id_chapter}${id_chapter_two === 2 ? `/${id_chapter_two}` : ""}`;
};
