import { z } from "zod";
import { bemidbar, beresheet, dvarim, schmot, vaikra } from "@/data/tora";
import yehoshua from "@/data/neviim/obj-yehoshua";

export const booksMap: Record<string, Verse[][]> = {
  tora: [beresheet, schmot, vaikra, bemidbar, dvarim],
  neviim: [yehoshua],
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
    .min(4, "Запрос должен содержать не менее 4 символов.")
    .max(50, "Запрос не должен превышать 50 символов")
    .trim(),
});

export type SearchFormData = z.infer<typeof searchSchema>;
