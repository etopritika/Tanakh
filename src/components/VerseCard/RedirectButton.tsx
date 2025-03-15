import { Link } from "react-router";

import ketuvimChapters from "@/lib/book-chapters/ketuvim";
import * as neviimChapters from "@/lib/book-chapters/neviim";
import * as toraChapters from "@/lib/book-chapters/tora";
import { bookNameMap, Chapter, SectionName } from "@/lib/types";

export type ChaptersRecord = Record<string, Chapter[]>;
type Sections = Record<SectionName, ChaptersRecord>;

const sectionMappings: Sections = {
  [SectionName.tora]: toraChapters,
  [SectionName.neviim]: neviimChapters,
  [SectionName.ketuvim]: ketuvimChapters,
};

const getFullChapterName = (
  section: SectionName,
  book: string,
  chapter: number,
  subChapter: number,
) => {
  return (
    sectionMappings[section]?.[`${book}Chapters`]?.find(
      (c) => c.key === chapter && c.subKey === subChapter,
    )?.chapterName || null
  );
};

export default function RedirectButton({
  redirectLink,
}: {
  redirectLink: string;
}) {
  const url = new URL(redirectLink);
  const parts = url.pathname.split("/");

  if (parts[1] !== "books" || !url.hash.startsWith("#verse-")) {
    const domain = url.hostname.replace("www.", "");

    return (
      <Link
        to={redirectLink}
        className="break-all not-italic text-blue-600 underline hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        {domain}
      </Link>
    );
  }

  const section = parts[2] as SectionName;
  const bookKey = parts[3];
  const book = bookNameMap[bookKey] ?? bookKey;
  const chapter = Number(parts[4]);
  const subChapter = Number(parts[5]) || 1;
  const verse = url.hash.split("-")[1];
  const formattedBookName =
    getFullChapterName(section, bookKey, chapter, subChapter) || book;

  const isValidFormat = Boolean(formattedBookName && chapter && verse);

  return (
    <Link
      to={redirectLink}
      className="not-italic text-blue-600 underline hover:text-blue-800"
      target="_blank"
      rel="noopener noreferrer"
    >
      {isValidFormat
        ? `${formattedBookName} ${chapter}:${verse}`
        : redirectLink}
    </Link>
  );
}
