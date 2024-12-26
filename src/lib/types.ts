import { z } from "zod";
import { bemidbar, beresheet, dvarim, schmot, vaikra } from "@/data/tora";
import yehoshua from "@/data/neviim/obj-yehoshua";

export const booksMap: Record<string, Verse[][]> = {
  tora: [beresheet, schmot, vaikra, bemidbar, dvarim],
  neviim: [yehoshua],
};

export const bookNameMap: Record<string, string> = {
  beresheet: "Берешит",
  schmot: "Шемот",
  vaikra: "Ваикра",
  bemidbar: "Бемидбар",
  dvarim: "Деварим",
  yehoshua: "Йехошуа",
};

export const BookPathMap: Record<
  number,
  { section: string; bookName: string }
> = {
  0: { section: "tora", bookName: "beresheet" },
  1: { section: "tora", bookName: "schmot" },
  2: { section: "tora", bookName: "vaikra" },
  3: { section: "tora", bookName: "bemidbar" },
  4: { section: "tora", bookName: "dvarim" },
  5: { section: "neviim", bookName: "yehoshua" },
};

export const sectionNameMap: Record<string, string> = {
  tora: "Тора",
  neviim: "Невиим",
};

export type Section = {
  name: string;
  href: string;
};

export type Book = {
  id: string;
  name: string;
  file: string;
  href: string;
  disabled: boolean;
};

export type BooksBySection = {
  [key: string]: Book[];
};

export type Chapter = {
  key: number;
  subKey: number;
  chapterName: string;
  start: number;
  end: number;
  verses: number;
};

export type Verse = {
  name: string;
  chapter: string;
  main?: number;
  main_name?: string;
  id_book: number;
  id_chapter: number;
  id_chapter_two?: number;
  poemNumber: number;
  verse: string;
  verse_ivrit?: string;
  comment?: string;
};

export const searchSchema = z.object({
  query: z
    .string()
    .min(2, "Запрос должен содержать не менее 2 символов.")
    .trim(),
});

export type SearchFormData = z.infer<typeof searchSchema>;
