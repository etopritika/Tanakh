import BookPagination from "@/components/Book-pagination";
import { Card, CardContent } from "@/components/ui/card";
import { fetchChapterData } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VersesPage() {
  const { bookName, sectionName, chapterId, poemPage } = useParams<{
    bookName: string | undefined;
    sectionName: string | undefined;
    poemPage: string | undefined;
    chapterId: string | undefined;
  }>();

  const [verses, setVerses] = useState([]);
  const poemsPerPage = 5;

  useEffect(() => {
    const loadChapter = async () => {
      const data = await fetchChapterData(sectionName, bookName, chapterId);
      setVerses(data);
    };

    loadChapter();
  }, [sectionName, bookName, chapterId]);

  const page = parseInt(poemPage || "1", 10);
  const startIndex = (page - 1) * poemsPerPage;
  const endIndex = startIndex + poemsPerPage;

  const totalVerses = verses.length;
  const totalPages = Math.ceil(totalVerses / poemsPerPage);

  const versesToRender = verses.slice(startIndex, endIndex);

  return (
    <section className="py-6 space-y-4">
      <h1>{verses[0]?.chapter}</h1>
      <ul className="space-y-4">
        {versesToRender.map((verse, index) => (
          <li key={startIndex + index}>
            <Card className="bg-white">
              <CardContent className="pt-6 space-y-2">
                <p>{verse.verse}</p>
                <p>{verse.verse_ivrit}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <BookPagination
        currentPage={page}
        totalPages={totalPages}
        sectionName={sectionName}
        bookName={bookName}
        chapterId={chapterId}
      />
    </section>
  );
}
