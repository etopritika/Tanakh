import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchFormData, searchSchema, Verse } from "@/lib/types";
import { X } from "lucide-react";
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

const mockData: Verse[] = [
  {
    name: "БЕМИДБАР",
    chapter: "БЕААЛОТХА(Когда будешь возжигать)",
    id_book: 3,
    id_chapter: 8,
    poemNumber: 6,
    verse: "Возьми левитов из среды сынов Израиля и очисти их.",
    verse_ivrit:
      "קַ֚ח אֶת-הַֽלְוִיִּ֔ם מִתּ֖וֹךְ בְּנֵ֣י יִשְׂרָאֵ֑ל וְטִֽהַרְתָּ֖ אֹתָֽם",
  },
  {
    name: "ШМОТ",
    chapter: "ВАЙЕХИ(И было)",
    id_book: 2,
    id_chapter: 10,
    poemNumber: 12,
    verse: "И поднялись они в землю свою...",
    verse_ivrit: undefined,
  },
  {
    name: "БЕМИДБАР",
    chapter: "ДВАРИМ(Слова)",
    id_book: 4,
    id_chapter: 1,
    id_chapter_two: 1,
    poemNumber: 3,
    verse:
      "На сороковой год, в первый день одиннадцатого месяца, Моше возвестил сынам Израиля все, что Господь велел ему [возвестить] им.",
    verse_ivrit:
      "וַיְהִי בְּאַרְבָּעִים שָׁנָה בְּעַשְׁתֵּי-עָשָׂר חֹדֶשׁ בְּאֶחָד לַחֹדֶשׁ דִּבֶּר מֹשֶׁה אֶל-בְּנֵי יִשְׂרָאֵל כְּכֹל אֲשֶׁר צִוָּה יְהוָה אֹתוֹ אֲלֵהֶם",
    comment: "",
  },
];

export default function SearchInput() {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });

  const [results, setResults] = useState<Verse[]>([]);

  const handleSearch = (value: string) => {
    form.setValue("query", value);
    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const matches = mockData.filter(
      (verse: Verse) =>
        verse.verse?.toLowerCase().includes(value.toLowerCase()) ||
        (verse.verse_ivrit &&
          verse.verse_ivrit.toLowerCase().includes(value.toLowerCase()))
    );
    setResults(matches);
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
                      onValueChange={handleSearch}
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
                      {results.length > 0 ? (
                        <CommandGroup heading="Результаты">
                          {results.map((item) => (
                            <CommandItem
                              key={`${item.id_chapter}-${item.poemNumber}`}
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
                          <CommandItem
                            value="Расширенный поиск"
                            className="flex flex-col items-start"
                          >
                            <Link to={"/search"} className="w-full">
                              <Card className="bg-white">
                                <CardHeader className="sr-only">
                                  <CardTitle className="text-sm">
                                    Расширенный поиск
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 p-4">
                                  Расширенный поиск
                                </CardContent>
                              </Card>
                            </Link>
                          </CommandItem>
                        </CommandGroup>
                      ) : field.value.trim() !== "" ? (
                        <CommandEmpty className="p-2">
                          Ничего не найдено.
                        </CommandEmpty>
                      ) : null}
                    </CommandList>
                  </Command>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
