import { HolidayItem } from "../types";

import { normalizeJewishMonthName } from "@/components/Calendar/calendar-utils";
import { useHolidayStore } from "@/store/use-holiday-store";

export async function fetchAndStoreHolidays(year: number) {
  const { holidays, setHolidays } = useHolidayStore.getState();

  if (holidays[year]) {
    return;
  }

  const url = `https://www.hebcal.com/hebcal?year=${year}&v=1&cfg=json&maj=on&min=on&mod=on&nx=on&s=on`;
  const holidaysByDate: Record<string, HolidayItem[]> = {};
  const holidaysByJewishDate: Record<string, HolidayItem[]> = {};

  try {
    const response = await fetch(url);
    const data = await response.json();

    data.items.forEach((holiday: HolidayItem) => {
      const date = holiday.date;
      const hdate = holiday.hdate;

      if (!holidaysByDate[date]) {
        holidaysByDate[date] = [];
      }
      holidaysByDate[date].push(holiday);

      if (!hdate) return;

      const [dayStr, monthRaw, yearStr] = hdate.split(" ");
      const normalizedMonth = normalizeJewishMonthName(monthRaw);
      const hdateKey = `${dayStr} ${normalizedMonth} ${yearStr}`;

      if (!holidaysByJewishDate[hdateKey]) {
        holidaysByJewishDate[hdateKey] = [];
      }

      holidaysByJewishDate[hdateKey].push(holiday);
    });

    setHolidays(year, holidaysByDate, holidaysByJewishDate);
  } catch {
    throw new Error("Не удалось загрузить праздники. Попробуйте позже.");
  }
}
