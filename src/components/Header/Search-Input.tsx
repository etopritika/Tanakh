import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchFormData, searchSchema, Verse } from "@/lib/types";
import { X } from "lucide-react";
import { useState } from "react";
import {
  Command,
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

  const [results, setResults] = useState<Verse[]>([]);
  const [, setError] = useState<string | null>(null);

  const debouncedSearch = useDebouncedSearch("", setResults, setError);

  const handleChange = (value: string) => {
    form.setValue("query", value);
    debouncedSearch({ query: value });
  };

  const handleClear = () => {
    form.setValue("query", "");
    setResults([]);
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative w-80">
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

                    <CommandList className="absolute top-full left-0 w-full z-50 bg-white shadow-lg rounded-md">
                      {results.length > 0 && (
                        <CommandGroup>
                          <div className="px-2 py-1.5">
                            <Link
                              to={"/search"}
                              className="w-full cursor-pointer"
                            >
                              <Card className="bg-white">
                                <CardContent className="p-3">
                                  Расширенный поиск
                                </CardContent>
                              </Card>
                            </Link>
                          </div>
                          {results.map((item) => (
                            <CommandItem
                              key={`${item.verse}-${item.poemNumber}`}
                              value={item.verse || ""}
                              className="flex flex-col items-start"
                            >
                              <Link to={"#"} className="w-full">
                                <Card className="bg-white">
                                  <CardHeader className="p-4">
                                    <CardTitle className="text-sm">
                                      {item.chapter}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-2 p-4 pt-0">
                                    <p>{item.verse}</p>
                                    <p>{item.verse_ivrit}</p>
                                  </CardContent>
                                </Card>
                              </Link>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
