import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookInfoMap, SearchFormData, searchSchema, Verse } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDebouncedSearch } from "@/hooks/use-debounce-search";
import { X } from "lucide-react";

export default function SearchPage() {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
    mode: "onChange",
  });
  const queryValue = form.getValues("query");
  const isFieldFilled = queryValue?.trim();

  const [results, setResults] = useState<Verse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  const debouncedSearch = useDebouncedSearch(
    "",
    (res) => {
      setResults(res);
      setIsSearchComplete(true);
    },
    setError
  );

  const handleChange = (value: string) => {
    form.setValue("query", value);
    if (!form.formState.errors.query) {
      setIsSearchComplete(false);
      debouncedSearch({ query: value });
    } else {
      setResults([]);
      setIsSearchComplete(false);
    }
  };

  const handleClear = () => {
    form.setValue("query", "");
    setResults([]);
    setIsSearchComplete(false);
  };

  return (
    <section className="px-1 space-y-4">
      <h1 className="text-xl font-bold">Поиск стихов</h1>
      <Form {...form}>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange(e.target.value);
                      }}
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
                {isFieldFilled && <FormMessage className="text-danger" />}
              </FormItem>
            )}
          />
        </form>
      </Form>

      {error && <p className="text-red-500">{error}</p>}
      {isSearchComplete && results.length === 0 && (
        <div className="flex justify-center">
          <span>Нет результатов.</span>
        </div>
      )}
      <ul className="space-y-4">
        {results.map((verse) => {
          const bookInfo = BookInfoMap[verse.id_book];
          const to = `/${bookInfo.section}/${bookInfo.bookName}/${verse.id_chapter}#verse-${verse.poemNumber}`;

          return (
            <li key={`${verse.id_chapter}-${verse.poemNumber}`}>
              <Link to={to}>
                <Card className="bg-white relative shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">{verse.chapter}</CardTitle>
                    <span className="absolute top-2 right-3">
                      {verse.poemNumber}
                    </span>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
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
