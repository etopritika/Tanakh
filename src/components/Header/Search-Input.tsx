import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookInfoMap, SearchFormData, searchSchema, Verse } from "@/lib/types";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDebouncedSearch } from "@/hooks/use-debounce-search";

export default function SearchInput() {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
    mode: "onChange",
  });
  const queryValue = form.getValues("query");
  const isFieldFilled = queryValue?.trim();

  const [results, setResults] = useState<Verse[]>([]);
  const [, setError] = useState<string | null>(null);
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
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-96">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Command className="rounded-lg border bg-white shadow-md">
                    <CommandInput
                      placeholder="Поиск..."
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleChange(value);
                      }}
                      className="w-full border-none focus:ring-0"
                    />
                    {field.value && (
                      <button
                        onClick={handleClear}
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label="Очистити пошук"
                      >
                        <X size={20} />
                      </button>
                    )}

                    <CommandList className="absolute top-full left-0 w-full z-50 bg-white shadow-md rounded-md">
                      {isSearchComplete && results.length === 0 && (
                        <div>
                          <Link
                            to={"/search"}
                            className="cursor-pointer flex justify-center items-center text-sm hover:underline px-2 py-1.5"
                          >
                            Расширенный поиск
                            <SlidersHorizontal className="ml-2" size={15} />
                          </Link>
                          <CommandEmpty>Нет результатов.</CommandEmpty>
                        </div>
                      )}
                      {results.length > 0 && (
                        <CommandGroup>
                          <Link
                            to={"/search"}
                            className="cursor-pointer flex justify-center items-center text-sm hover:underline px-2 py-1.5"
                          >
                            Расширенный поиск
                            <SlidersHorizontal className="ml-2" size={15} />
                          </Link>

                          {results.map((item) => {
                            const bookInfo = BookInfoMap[item.id_book];
                            const to = `/${bookInfo.section}/${bookInfo.bookName}/${item.id_chapter}#verse-${item.poemNumber}`;
                            return (
                              <CommandItem
                                key={`${item.verse}-${item.poemNumber}`}
                                value={item.verse || ""}
                                className="flex flex-col items-start"
                              >
                                <Link
                                  to={to}
                                  className="w-full"
                                  onClick={handleClear}
                                >
                                  <Card className="bg-white">
                                    <CardHeader className="p-4">
                                      <CardTitle className="text-sm">
                                        {item.chapter}
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-x-3 p-4 pt-0 flex">
                                      <span className="font-bold">
                                        {item.poemNumber}
                                      </span>
                                      <div className="space-y-2 w-full">
                                        <p>{item.verse}</p>
                                        <p className="rtl text-right">
                                          {item.verse_ivrit}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </Link>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </div>
              </FormControl>
              {isFieldFilled && (
                <FormMessage className="text-danger bg-white p-4 rounded-md shadow-md" />
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
