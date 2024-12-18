import { z } from "zod";

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

export type BreadcrumbSegment = {
  label: string;
  href: (segments: string[]) => string;
};

export const searchSchema = z.object({
  query: z.string(),
});

export type SearchFormData = z.infer<typeof searchSchema>;
