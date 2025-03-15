import { JewishMonth, toGregorianDate, toJewishDate } from "jewish-date";

import {
  JewishMonthName,
  jewishMonthsLeapRu,
  jewishMonthsNonLeapRu,
} from "./constants";

// =================== UTILS ===================

/**
 * Determines if a given Jewish year is a leap year.
 * In the Jewish calendar, leap years occur 7 times in a 19-year cycle.
 * @param year - Jewish year
 * @returns true if the year is a leap year, false otherwise
 */
const isJewishLeapYear = (year: number): boolean => (7 * year + 1) % 19 < 7;

/**
 * Normalizes a month name by removing all whitespace.
 * Helps with comparison between month names (e.g., "Adar I" vs "AdarI").
 * @param name - Month name to normalize
 * @returns Normalized month name
 */
export const normalizeMonth = (name: string): string =>
  name.replace(/\s+/g, "");

/**
 * Compares two month names for equality, ignoring whitespace differences.
 * @param a - First month name
 * @param b - Second month name
 * @returns true if both month names refer to the same month
 */
export const isSameMonth = (a: string, b: string): boolean =>
  normalizeMonth(a) === normalizeMonth(b);

/**
 * Returns an array of Jewish month names based on whether the provided year is a leap year.
 * Leap years include an extra month: "Adar I" and "Adar II".
 * @param year - Jewish year
 * @returns Array of Jewish month names for the year
 */
export const getMonthsByLeapYear = (year: number): JewishMonthName[] =>
  isJewishLeapYear(year)
    ? [
        "Tishri",
        "Cheshvan",
        "Kislev",
        "Tevet",
        "Shevat",
        "Adar I",
        "Adar II",
        "Nisan",
        "Iyyar",
        "Sivan",
        "Tammuz",
        "Av",
        "Elul",
      ]
    : [
        "Tishri",
        "Cheshvan",
        "Kislev",
        "Tevet",
        "Shevat",
        "Adar",
        "Nisan",
        "Iyyar",
        "Sivan",
        "Tammuz",
        "Av",
        "Elul",
      ];

/**
 * Returns the Russian names of the Jewish months for the given year,
 * considering if the year is a leap year.
 * @param year - Jewish year
 * @returns Array of Jewish month names in Russian
 */
export const getMonthsRuByLeapYear = (year: number): string[] =>
  isJewishLeapYear(year) ? jewishMonthsLeapRu : jewishMonthsNonLeapRu;

// =================== CALENDAR DATA FUNCTIONS ===================

/**
 * Generates Gregorian calendar data for a given date.
 * Provides the year, month, number of days in the month, and the index of the first day of the week.
 * @param selectedDate - The date representing the month to get data for
 * @returns Object containing year, month index, total days, and the starting day index of the month
 */
export function getGregorianMonthData(selectedDate: Date) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

  return { year, month, daysInMonth, firstDayIndex };
}

/**
 * Generates Jewish calendar data based on a given Gregorian date.
 * Provides the Jewish year, month names (Hebrew and Russian), days in the month,
 * index of the first day of the week, and the selected day.
 * @param selectedDate - The Gregorian date to map to the Jewish calendar
 * @returns Object containing Jewish year, month names, list of days, and the first day index
 */
export function getJewishMonthData(selectedDate: Date) {
  const jewishDate = toJewishDate(selectedDate);

  const months = getMonthsByLeapYear(jewishDate.year);
  const monthsRu = getMonthsRuByLeapYear(jewishDate.year);

  const currentMonthIdx = months.findIndex((m) =>
    isSameMonth(m, jewishDate.monthName),
  );

  const monthEnum =
    JewishMonth[
      normalizeMonth(months[currentMonthIdx]) as keyof typeof JewishMonth
    ];

  const firstGregorianDate = toGregorianDate({
    year: jewishDate.year,
    monthName: monthEnum,
    day: 1,
  });

  const days: number[] = [];
  const date = new Date(firstGregorianDate);

  for (let i = 0; i < 32; i++) {
    const jd = toJewishDate(date);

    if (!isSameMonth(jd.monthName, months[currentMonthIdx])) break;

    days.push(jd.day);
    date.setDate(date.getDate() + 1);
  }

  const rawFirstDay = new Date(firstGregorianDate).getDay();
  const firstDayOfWeek = (rawFirstDay + 6) % 7;

  return {
    year: jewishDate.year,
    monthName: months[currentMonthIdx],
    monthNameRu: monthsRu[currentMonthIdx],
    days,
    firstDayOfWeek,
    selectedDay: jewishDate.day,
  };
}
