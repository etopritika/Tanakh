import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchFormData, searchSchema, Verse } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDebouncedSearch } from "@/hooks/use-debounce-search";
import { X } from "lucide-react";

const BookInfoMap: Record<number, { section: string; bookName: string }> = {
  0: { section: "tora", bookName: "beresheet" },
  1: { section: "tora", bookName: "schmot" },
  2: { section: "tora", bookName: "vaikra" },
  3: { section: "tora", bookName: "bemidbar" },
  4: { section: "tora", bookName: "dvarim" },
  5: { section: "neviim", bookName: "yehoshua" },
};

export default function SearchPage() {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });

  const [results, setResults] = useState<Verse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebouncedSearch("", setResults, setError);

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
    <section className="py-6 space-y-4 h-full overflow-y-auto">
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
          const bookInfo = BookInfoMap[verse.id_book];
          const to = `/${bookInfo.section}/${bookInfo.bookName}/${verse.id_chapter}#verse-${verse.poemNumber}`;

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
