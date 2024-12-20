import { z } from "zod";
import { bemidbar, beresheet, dvarim, schmot, vaikra } from "@/data/tanah";
import yehoshua from "@/data/neviim/obj-yehoshua";

export const booksMap: Record<string, Verse[][]> = {
  tanah: [beresheet, schmot, vaikra, bemidbar, dvarim],
  neviim: [yehoshua],
};

export const BookInfoMap: Record<
  number,
  { section: string; bookName: string }
> = {
  0: { section: "tanah", bookName: "beresheet" },
  1: { section: "tanah", bookName: "schmot" },
  2: { section: "tanah", bookName: "vaikra" },
  3: { section: "tanah", bookName: "bemidbar" },
  4: { section: "tanah", bookName: "dvarim" },
  5: { section: "neviim", bookName: "yehoshua" },
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
    .min(5, "Запрос должен содержать не менее 5 символов.")
    .trim(),
});

export type SearchFormData = z.infer<typeof searchSchema>;
