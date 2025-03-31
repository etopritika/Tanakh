/// <reference types="jest" />
import { translateHolidayTitle } from "../translate";

describe("translateHolidayTitle", () => {
  it("translates all patterns from holidayTitleMap", () => {
    const testCases: { input: string; expected: string }[] = [
      { input: "Rosh Hashana", expected: "Рош ха-Шана" },
      { input: "Yom Kippur", expected: "Йом Кипур" },
      { input: "Erev Yom Kippur", expected: "Накануне Йом Кипур" },
      { input: "Sukkot III (CH’’M)", expected: "Суккот III (Холь а-Моэд)" },
      { input: "Pesach IV (CH’’M)", expected: "Песах IV (Холь а-Моэд)" },
      { input: "Shushan Purim", expected: "Шушан Пурим" },
      { input: "Chanukah: 5 Candles", expected: "Ханука: 5 свечей" },
      { input: "Parashat Tazria-Metzora", expected: "Парашат Тазрия-Мецора" },
      { input: "Rosh Chodesh Tammuz", expected: "Рош Ходеш" },
    ];

    for (const { input, expected } of testCases) {
      expect(translateHolidayTitle(input)).toBe(expected);
    }
  });

  it("returns the original title if there is no match", () => {
    const unknownTitle = "Completely Unknown Holiday";
    const result = translateHolidayTitle(unknownTitle);
    expect(result).toBe(unknownTitle);
  });

  it("correctly handles a partial match header", () => {
    const result = translateHolidayTitle("Erev Yom Kippur");
    expect(result).toBe("Накануне Йом Кипур");
  });
});
