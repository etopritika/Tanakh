import { Verse } from "@/lib/types";
import { Card, CardContent } from "./ui/card";

export default function VerseList({ verses }: { verses: Verse[] }) {
  if (!verses.length) {
    return <p className="text-center text-danger">Список стихов пуст.</p>;
  }
  return (
    <ul className="space-y-4">
      {verses.map((verse) => (
        <li key={verse.poemNumber}>
          <Card className="bg-white">
            <CardContent className="pt-6 space-y-2">
              <p>{verse.verse}</p>
              <p>{verse.verse_ivrit}</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
