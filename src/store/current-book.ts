import { create } from "zustand";

type CurrentBookState = {
  id: string | null;
  file: string | null;
  setBook: (id: string, file: string) => void;
};

const useCurrentBookStore = create<CurrentBookState>((set) => ({
  id: null,
  file: null,
  setBook: (id, file) => set({ id, file }),
}));

export default useCurrentBookStore;
