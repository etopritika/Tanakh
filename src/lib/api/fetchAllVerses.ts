import { booksMap, Verse } from "@/lib/types";

export const fetchAllVerses = async (): Promise<Verse[]> => {
  const allBookNames = Object.values(booksMap).flat();

  const responses = await Promise.all(
    allBookNames.map(async (bookName) => {
      const res = await fetch(`/data/${bookName}.json`);
      if (!res.ok) return [];
      return (await res.json()) as Verse[];
    }),
  );

  return responses.flat();
};
