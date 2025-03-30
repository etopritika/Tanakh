/**
 * Returns a range of 28 days (4 weeks) starting from the given date.
 * Uses date-fns for formatting.
 * @param date - The start date
 * @returns Object with `start` and `end` in `YYYY-MM-DD` format
 */

import { addDays, format, startOfWeek, subDays } from "date-fns";

export const getMonthRangeStrings = (
  date: Date,
): { start: string; end: string } => {
  const start = format(date, "yyyy-MM-dd");
  const end = format(addDays(date, 28), "yyyy-MM-dd");

  return { start, end };
};

/**
 * Generates a cache key for SWR based on the provided date and coordinates.
 *
 * The goal is to reuse cached Shabbat data for dates that fall within a specific time window:
 * from the **Sunday of the previous week** up to the **Friday of the current week**.
 *
 * This ensures that navigating between days during the week (especially Mon–Fri)
 * does not trigger redundant fetches, while still allowing fresh data when needed.
 *
 * @param date - The selected date
 * @param lat - Latitude of the location
 * @param lon - Longitude of the location
 * @returns A string cache key for SWR (e.g., `shabbat:32.0853:34.7818:2025-05-18`)
 */

export function getShabbatKeyForSWR(
  date: Date,
  lat: number,
  lon: number,
): string {
  const thisSunday = startOfWeek(date, { weekStartsOn: 0 });

  const lastSunday = subDays(thisSunday, 7);

  const fridayThisWeek = addDays(thisSunday, 5);

  const inRange = date >= lastSunday && date <= fridayThisWeek;
  const keyDate = inRange ? lastSunday : date;

  return `shabbat:${lat}:${lon}:${format(keyDate, "yyyy-MM-dd")}`;
}
