import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReadingState {
  lastRead: {
    pathname: string | null;
    chapterName: string | null;
  };
  setLastRead: (chapterName: string, pathname: string) => void;
}

export const useReadingStore = create<ReadingState>()(
  persist(
    (set) => ({
      lastRead: { pathname: null, chapterName: null },
      setLastRead: (chapterName, pathname) =>
        set({ lastRead: { pathname, chapterName } }),
    }),
    { name: "reading-storage" }
  )
);
