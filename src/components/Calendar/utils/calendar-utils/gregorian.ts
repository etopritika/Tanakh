import {
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  startOfMonth,
} from "date-fns";

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
