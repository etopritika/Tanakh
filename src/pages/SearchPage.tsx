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
import { X } from "lucide-react";

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

  const handleClear = () => {
    form.setValue("query", "");
    setResults([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="py-6 space-y-4 h-full">
      <h1 className="text-xl font-bold">Поиск стихов</h1>
      <Form {...form}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField
            name="query"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Введите запрос:</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Поиск..."
                      className="bg-white pr-10"
                      {...field}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    {form.getValues("query") && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label="Очистить поле ввода"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
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
