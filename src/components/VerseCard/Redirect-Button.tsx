import { Link } from "react-router";

import { bookNameMap, SectionName, sectionNameMap } from "@/lib/types";

export default function RedirectButton({
  redirectLink,
}: {
  redirectLink: string;
}) {
  let section = "";
  let book = "";
  let chapter = "";
  let verse = "";
  let isValidFormat = false;

  const url = new URL(redirectLink);
  const parts = url.pathname.split("/");

  if (parts[1] === "books" && url.hash.startsWith("#verse-")) {
    const sectionKey = parts[2] as SectionName;
    section = sectionNameMap[sectionKey] ?? parts[2];
    book = bookNameMap[parts[3]] ?? parts[3];
    chapter = parts[4];
    verse = url.hash.split("-")[1];
    isValidFormat = true;
  }

  return (
    <Link
      to={redirectLink}
      className="not-italic text-blue-600 underline hover:text-blue-800"
      target="_blank"
      rel="noopener noreferrer"
    >
      {isValidFormat ? `${section} ${book} ${chapter}:${verse}` : redirectLink}
    </Link>
  );
}
