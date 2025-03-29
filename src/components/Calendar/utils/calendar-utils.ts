import {
  addDays,
  format,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  startOfMonth,
} from "date-fns";
import { ru } from "date-fns/locale";
import { JewishMonth, toGregorianDate, toJewishDate } from "jewish-date";

import {
  JewishMonthName,
  jewishMonthsLeapRu,
  jewishMonthsNonLeapRu,
} from "./constants";
import { holidayTitleMap } from "./holiday-title-map";

// =================== TRANSLATIONS ===================

/**
 * Translates the holiday title from English to Russian.
 * @param title - The holiday title in English.
 * @returns The translated title in Russian, or the original if no match is found.
 */
export function translateHolidayTitle(title: string): string {
  const rule = holidayTitleMap.find(({ pattern }) => pattern.test(title));
  return rule ? rule.translation : title;
}

// =================== DATE FORMAT HELPERS ===================

/**
 * Formats a Date object as a string in `YYYY-MM-DD` format using date-fns.
 * @param date - The Date object
 * @returns A formatted date string
 */
export const formatDateKey = (date: Date): string => format(date, "yyyy-MM-dd");

/**
 * Converts a time string like "7:10pm" into 24-hour format (e.g., "19:10").
 * @param title - Time string containing AM/PM
 * @returns Time in 24-hour format or null if parsing fails
 */
export const extractTime24h = (title: string): string | null => {
  const timeMatch = title.match(/(\d{1,2}):(\d{2})(am|pm)/i);
  if (!timeMatch) return null;

  const [, hours, minutes, period] = timeMatch;
  let hrs = parseInt(hours, 10);

  if (period.toLowerCase() === "pm" && hrs !== 12) {
    hrs += 12;
  } else if (period.toLowerCase() === "am" && hrs === 12) {
    hrs = 0;
  }

  return `${hrs.toString().padStart(2, "0")}:${minutes}`;
};

/**
 * Formats a date string into a long, localized Russian format using date-fns.
 * Example: "суббота, 29 марта 2025 г."
 * @param dateStr - ISO date string
 * @returns Formatted Russian date string
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return format(date, "eeee, d MMMM yyyy", { locale: ru });
};

/**
 * Converts an ISO date string to a formatted Jewish date in Russian.
 * @param isoDate - ISO date string
 * @returns Jewish date in Russian format: `1 Нисан 5784`
 */
export const formatJewishDateRu = (isoDate: string): string => {
  const jd = toJewishDate(new Date(isoDate));
  const { day, year, month } = jd;

  const monthName = isJewishLeapYear(year)
    ? jewishMonthsLeapRu[month - 1]
    : jewishMonthsNonLeapRu[month - 1];

  return `${day} ${monthName} ${year}`;
};

// =================== JEWISH CALENDAR HELPERS ===================

/**
 * Determines if a given Jewish year is a leap year.
 * In the Jewish calendar, leap years occur 7 times in a 19-year cycle.
 * @param year - Jewish year
 * @returns true if the year is a leap year, false otherwise
 */
export const isJewishLeapYear = (year: number): boolean =>
  (7 * year + 1) % 19 < 7;

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

/**
 * Normalizes the name of a Jewish month returned by Hebcal to match the expected JewishMonthName type.
 * This function fixes inconsistencies in the month names between different data sources.
 * @param month - The raw month name from the API (Hebcal)
 * @returns Normalized month name that matches JewishMonthName
 */
export function normalizeJewishMonthName(month: string): JewishMonthName {
  switch (month) {
    case "Tishrei":
      return "Tishri";
    case "Sh'vat":
      return "Shevat";
    case "Tamuz":
      return "Tammuz";
    default:
      return month as JewishMonthName;
  }
}

// =================== CALENDAR DATA FUNCTIONS ===================

/**
 * Generates Gregorian calendar data for a given date.
 * Provides the year, month, number of days in the month, and the index of the first day of the week.
 * @param selectedDate - The date representing the month to get data for
 * @returns Object containing year, month index, total days, and the starting day index of the month
 */
export function getGregorianMonthData(selectedDate: Date) {
  const year = getYear(selectedDate);
  const month = getMonth(selectedDate);
  const daysInMonth = getDaysInMonth(selectedDate);

  const firstDayIndex = (getDay(startOfMonth(selectedDate)) + 6) % 7;

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

/**
 * Returns a range of 28 days (4 weeks) starting from the given date.
 * Uses date-fns for formatting.
 * @param date - The start date
 * @returns Object with `start` and `end` in `YYYY-MM-DD` format
 */

export const getMonthRangeStrings = (
  date: Date,
): { start: string; end: string } => {
  const start = format(date, "yyyy-MM-dd");
  const end = format(addDays(date, 28), "yyyy-MM-dd");

  return { start, end };
};

// =================== GEO ===================

/**
 * Returns user's coordinates via browser geolocation API.
 * Falls back to error if denied or unavailable.
 * @returns Promise with GeolocationCoordinates
 */
export const getUserCoordinates = (): Promise<GeolocationCoordinates> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords),
        reject,
      );
    }
  });
