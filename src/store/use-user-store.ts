import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "admin" | "user";

interface UserState {
  name: string | null;
  role: Role;
  setUserName: (name: string | null) => void;
  clearUserName: () => void;
  setUserRole: (role: Role) => void;
  clearUserRole: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: null,
      role: "user",
      setUserName: (name) => set({ name }),
      clearUserName: () => set({ name: null }),
      setUserRole: (role) => set({ role }),
      clearUserRole: () => set({ role: "user" }),
    }),
    {
      name: "user-storage",
    },
  ),
);
