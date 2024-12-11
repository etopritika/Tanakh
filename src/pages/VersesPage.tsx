import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchChapterData } from "@/lib/api";
import { useEffect, useState } from "react";

export default function VersesPage() {
  const [verses, setVerses] = useState([]);
  // console.log(verses);
  useEffect(() => {
    const loadChapter = async () => {
      const data = await fetchChapterData("tora", "beresheet", {
        key: 7,
        start: 162,
        end: 185,
      });
      setVerses(data);
    };

    loadChapter();
  }, []);

  return (
    <section className="py-6 space-y-4">
      <h1>{verses[0]?.chapter}</h1>
      <ul className="space-y-4">
        <li>
          <Card>
            <CardContent className="pt-6 space-y-2">
              <p>{verses[0]?.verse}</p>
              <p>{verses[0]?.verse_ivrit}</p>
            </CardContent>
          </Card>
        </li>
        <li>
          <Card>
            <CardContent className="pt-6 space-y-2">
              <p>{verses[1]?.verse}</p>
              <p>{verses[1]?.verse_ivrit}</p>
            </CardContent>
          </Card>
        </li>
        <li>
          <Card>
            <CardContent className="pt-6 space-y-2">
              <p>{verses[2]?.verse}</p>
              <p>{verses[2]?.verse_ivrit}</p>
            </CardContent>
          </Card>
        </li>
      </ul>
    </section>
  );
}
