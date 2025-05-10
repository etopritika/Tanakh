import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toJewishDate } from "jewish-date";

import { jewishMonthsLeapRu, jewishMonthsNonLeapRu } from "../constants";
import { isJewishLeapYear } from "./jewish";

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

export const getWeekDayName = (year: number, month: number, day: number) => {
  const weekdayNames = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const date = new Date(year, month, day);
  return weekdayNames[date.getDay()];
};

export const getJewishWeekDayName = (gregorianDate: Date) => {
  const weekdayNames = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  return weekdayNames[gregorianDate.getDay()];
};
