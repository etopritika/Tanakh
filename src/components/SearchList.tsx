import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BookInfoMap } from "@/lib/types";
import { useSearchStore } from "@/store/use-search-store";

export default function SearchList() {
  const { storeResults } = useSearchStore();
  return (
    <ul className="space-y-4">
      {storeResults.map((verse) => {
        const bookInfo = BookInfoMap[verse.id_book];
        const to = `/${bookInfo.section}/${bookInfo.bookName}/${verse.id_chapter}#verse-${verse.poemNumber}`;

        return (
          <li key={`${verse.id_book}-${verse.id_chapter}-${verse.poemNumber}`}>
            <Link to={to}>
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">{verse.chapter}</CardTitle>
                </CardHeader>
                <CardContent className="space-x-2 flex text-sm">
                  <span className="font-bold">{verse.poemNumber}</span>
                  <div className="space-y-2 w-full">
                    <p>{verse.verse}</p>
                    <p className="rtl text-right">{verse.verse_ivrit}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
