import { z } from "zod";

import yehoshua from "@/data/neviim/obj-yehoshua";
import { bemidbar, beresheet, dvarim, schmot, vaikra } from "@/data/tora";

export enum SectionName {
  tora = "tora",
  neviim = "neviim",
  ketuvim = "ketuvim",
}

export const sectionNameMap: Record<SectionName, string> = {
  [SectionName.tora]: "Тора",
  [SectionName.neviim]: "Невиим",
  [SectionName.ketuvim]: "Ктувим",
};

export const booksMap: Record<string, Verse[][]> = {
  tora: [beresheet, schmot, vaikra, bemidbar, dvarim],
  neviim: [yehoshua],
};

export const bookNameMap: Record<string, string> = {
  beresheet: "Берешит",
  schmot: "Шмот",
  vaikra: "Ваикра",
  bemidbar: "Бемидбар",
  dvarim: "Дварим",
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
  documentId?: string;
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

export type FirestoreComment = {
  id: string;
  uid: string;
  verseId: string;
  text: string;
  createdAt: Date;
  redirectLink: string;
};

export interface VersesMetadata {
  id: string;
  uid: string;
  verseId: string;
  highlightColor: string;
}

export interface HolidayItem {
  title: string;
  date: string;
  hdate?: string;
  category?: string;
  subcat?: string;
  hebrew?: string;
  link?: string;
  memo?: string;
}

export type ShabbatItem = {
  location: string | null;
  candleLighting: string | null;
  havdalah: string | null;
  parsha: string | null;
  candleDate: string | null;
  havdalahDate: string | null;
};

export interface ShabbatResponse {
  location: string | null;
  items: ShabbatItem[];
}

export interface HebcalItem {
  title: string;
  date: string;
  category: "candles" | "havdalah" | "parashat" | string;
}

export interface HebcalResponse {
  items: HebcalItem[];
  location?: {
    tzid?: string;
  };
}
