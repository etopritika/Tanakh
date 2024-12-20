import { Verse } from "@/lib/types";
import VerseCard from "./VerseCard";

export default function VerseList({ verses }: { verses: Verse[] }) {
  if (!verses.length) {
    return <p className="text-center text-danger">Список стихов пуст.</p>;
  }
  return (
    <ul className="space-y-4">
      {verses.map((verse) => (
        <VerseCard key={verse.poemNumber} verse={verse} />
      ))}
    </ul>
  );
}
