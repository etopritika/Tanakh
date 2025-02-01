import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  name: string | null;
  setUserName: (name: string | null) => void;
  clearUserName: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: null,
      setUserName: (name) => set({ name }),
      clearUserName: () => set({ name: null }),
    }),
    { name: "user-storage" },
  ),
);
