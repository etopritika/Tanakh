import { getChapterPage } from "@/lib/helpers/get-chapter-page";
import { Link } from "react-router-dom";

type NoVersesProps = {
  error: string | null;
  sectionName: string;
  bookName: string;
  chapterId: string;
};

export function NoVerses({
  error,
  sectionName,
  bookName,
  chapterId,
}: NoVersesProps) {
  return (
    <section className="py-6 flex items-center justify-center h-full">
      <div className="flex space-y-2 flex-col items-center">
        <span className="text-danger">{error}</span>
        <Link
          className="inline-block bg-brown-dark text-white py-2 px-4 rounded-lg min-w-[150px] text-center"
          to={`/sections/${sectionName}/books/${bookName}/chapters/${getChapterPage(
            bookName || "",
            chapterId || "1"
          )}`}
        >
          Назад
        </Link>
      </div>
    </section>
  );
}
