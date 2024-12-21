import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReadingState {
  lastRead: {
    lastPathname: string | null;
    chapterName: string | null;
  };
  setLastRead: (chapterName: string, lastPathname: string) => void;
}

export const useReadingStore = create<ReadingState>()(
  persist(
    (set) => ({
      lastRead: { lastPathname: null, chapterName: null },
      setLastRead: (chapterName, lastPathname) =>
        set({ lastRead: { lastPathname, chapterName } }),
    }),
    { name: "reading-storage" }
  )
);
