import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Verse } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVersePage } from "@/lib/helpers/get-verse-page";
import { useDebouncedSearch } from "@/hooks/use-debounce-search";

const BookNameMap: Record<number, string> = {
  0: "beresheet",
  1: "schmot",
  2: "vaikra",
  3: "bemidbar",
  4: "dvarim",
};

const searchSchema = z.object({
  query: z.string(),
});

export type SearchFormData = z.infer<typeof searchSchema>;

export default function SearchPage() {
  const { sectionName = "" } = useParams<{ sectionName: string }>();
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });

  const [results, setResults] = useState<Verse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebouncedSearch(sectionName, setResults, setError);

  const handleChange = (value: string) => {
    form.setValue("query", value);
    debouncedSearch({ query: value });
  };

  return (
    <section className="py-6 space-y-4">
      <h1 className="text-xl font-bold">Поиск стихов</h1>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            name="query"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Введите запрос:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Поиск..."
                    className="bg-white"
                    {...field}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {results.map((verse) => {
          const bookName = BookNameMap[verse.id_book];
          const versePage = getVersePage(
            sectionName,
            bookName,
            verse.id_chapter,
            verse.poemNumber
          );
          const to = `/sections/${sectionName}/books/${bookName}/chapter/${verse.id_chapter}/verses/${versePage}#verse-${verse.poemNumber}`;

          return (
            <li key={`${verse.id_chapter}-${verse.poemNumber}`}>
              <Link to={to}>
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>{verse.chapter}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>{verse.verse}</p>
                    <p>{verse.verse_ivrit}</p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
