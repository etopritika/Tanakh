import { holidayTitleMap } from "../holiday-title-map";

/**
 * Translates the holiday title from English to Russian.
 * @param title - The holiday title in English.
 * @returns The translated title in Russian, or the original if no match is found.
 */
export function translateHolidayTitle(title: string): string {
  const rule = holidayTitleMap.find(({ pattern }) => pattern.test(title));
  return rule ? rule.translation : title;
}
