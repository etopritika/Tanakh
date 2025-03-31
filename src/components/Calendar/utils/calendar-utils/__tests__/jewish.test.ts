/// <reference types="jest" />
import {
  isJewishLeapYear,
  normalizeMonth,
  isSameMonth,
  getMonthsByLeapYear,
  getMonthsRuByLeapYear,
  normalizeJewishMonthName,
  getJewishMonthData,
} from "../jewish";

describe("isJewishLeapYear", () => {
  it("returns true for year 5782 (leap year)", () => {
    expect(isJewishLeapYear(5782)).toBe(true);
  });

  it("returns false for year 5783 (non-leap year)", () => {
    expect(isJewishLeapYear(5783)).toBe(false);
  });
});

describe("normalizeMonth", () => {
  it("removes spaces from month name", () => {
    expect(normalizeMonth("Adar I")).toBe("AdarI");
  });
});

describe("isSameMonth", () => {
  it("compares month names ignoring spaces", () => {
    expect(isSameMonth("Adar I", "AdarI")).toBe(true);
    expect(isSameMonth("Adar II", "AdarI")).toBe(false);
  });
});

describe("getMonthsByLeapYear", () => {
  it("returns 13 months for a leap year", () => {
    expect(getMonthsByLeapYear(5782)).toHaveLength(13);
    expect(getMonthsByLeapYear(5782)).toContain("Adar I");
    expect(getMonthsByLeapYear(5782)).toContain("Adar II");
  });

  it("returns 12 months for a non-leap year", () => {
    expect(getMonthsByLeapYear(5783)).toHaveLength(12);
    expect(getMonthsByLeapYear(5783)).toContain("Adar");
    expect(getMonthsByLeapYear(5783)).not.toContain("Adar I");
  });
});

describe("getMonthsRuByLeapYear", () => {
  it("returns 13 Russian month names for a leap year", () => {
    expect(getMonthsRuByLeapYear(5782)).toHaveLength(13);
  });

  it("returns 12 Russian month names for a non-leap year", () => {
    expect(getMonthsRuByLeapYear(5783)).toHaveLength(12);
  });
});

describe("normalizeJewishMonthName", () => {
  it("normalizes 'Tishrei' to 'Tishri'", () => {
    expect(normalizeJewishMonthName("Tishrei")).toBe("Tishri");
  });

  it("normalizes 'Sh'vat' to 'Shevat'", () => {
    expect(normalizeJewishMonthName("Sh'vat")).toBe("Shevat");
  });

  it("normalizes 'Tamuz' to 'Tammuz'", () => {
    expect(normalizeJewishMonthName("Tamuz")).toBe("Tammuz");
  });

  it("returns the same value if normalization is not needed", () => {
    expect(normalizeJewishMonthName("Nisan")).toBe("Nisan");
  });
});

describe("getJewishMonthData", () => {
  it("returns correct data for 2025-03-31", () => {
    const date = new Date("2025-03-31");
    const result = getJewishMonthData(date);

    expect(result.year).toBe(5785);
    expect(result.monthName).toBe("Nisan");
    expect(result.selectedDay).toBe(2);
    expect(result.days.length).toBeGreaterThanOrEqual(29);
    expect(result.firstDayOfWeek).toBeGreaterThanOrEqual(0);
    expect(result.firstDayOfWeek).toBeLessThanOrEqual(6);
  });
});
