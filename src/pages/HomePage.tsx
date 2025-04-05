import { useEffect, useState } from "react";

import HomepageVerseCard from "@/components/Homepage/HomepageVerseCard";
import HomepageVerseList from "@/components/Homepage/HomepageVerseList";
import { toast } from "@/hooks/use-toast";
import { fetchHomepageVerses } from "@/lib/api/fetchFirestoreData";
import { Verse } from "@/lib/types";

export default function HomePage() {
  const [verses, setVerses] = useState<Verse[]>([]);

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const data = await fetchHomepageVerses();
        setVerses(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Неизвестная ошибка";
        toast({
          title: "Ошибка",
          description: errorMessage,
          variant: "destructive",
        });
      }
    };

    fetchVerses();
  }, []);

  return (
    <section className="flex h-full justify-center py-6">
      <h1 className="sr-only">Главная страница</h1>
      <HomepageVerseList>
        {verses.map((verse) => (
          <HomepageVerseCard
            key={`${verse.id_book}-${verse.id_chapter}-${verse.id_chapter_two || 1}-${verse.poemNumber}`}
            verse={verse}
            setVerses={setVerses}
          />
        ))}
      </HomepageVerseList>
    </section>
  );
}
