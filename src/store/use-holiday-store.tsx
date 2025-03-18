import { create } from "zustand";

import { HolidayItem } from "@/lib/types";

interface HolidayStore {
  holidays: Record<number, Record<string, HolidayItem[]>>;
  holidaysByJewishDate: Record<string, HolidayItem[]>;

  selectedHoliday: HolidayItem[];

  setHolidays: (
    year: number,
    holidaysByDate: Record<string, HolidayItem[]>,
    holidaysByJewishDate: Record<string, HolidayItem[]>,
  ) => void;

  setSelectedHoliday: (holidays: HolidayItem[]) => void;
}

export const useHolidayStore = create<HolidayStore>((set) => ({
  holidays: {},
  holidaysByJewishDate: {},

  selectedHoliday: [],

  setHolidays: (year, holidaysByDate, holidaysByJewishDate) =>
    set((state) => ({
      holidays: {
        ...state.holidays,
        [year]: holidaysByDate,
      },
      holidaysByJewishDate: {
        ...state.holidaysByJewishDate,
        ...holidaysByJewishDate,
      },
    })),

  setSelectedHoliday: (holidays) => set({ selectedHoliday: holidays }),
}));
