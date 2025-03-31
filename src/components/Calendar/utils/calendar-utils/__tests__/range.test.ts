/// <reference types="jest" />
import { getMonthRangeStrings, getShabbatKeyForSWR } from "../range";

describe("getMonthRangeStrings", () => {
  it("returns correct 28-day range from given date", () => {
    const date = new Date("2025-03-31");
    const result = getMonthRangeStrings(date);
    expect(result).toEqual({ start: "2025-03-31", end: "2025-04-28" });
  });

  it("handles leap year correctly", () => {
    const date = new Date("2024-02-01");
    const result = getMonthRangeStrings(date);
    expect(result).toEqual({ start: "2024-02-01", end: "2024-02-29" });
  });

  it("correctly handles year-end transition", () => {
    const date = new Date("2025-12-15");
    const result = getMonthRangeStrings(date);
    expect(result).toEqual({ start: "2025-12-15", end: "2026-01-12" });
  });
});

describe("getShabbatKeyForSWR", () => {
  const lat = 49.4305219;
  const lon = 32.0544487;

  it("returns key based on last Sunday if date is Monday", () => {
    const date = new Date("2025-03-31");
    const result = getShabbatKeyForSWR(date, lat, lon);
    expect(result).toBe("shabbat:49.4305219:32.0544487:2025-03-30");
  });

  it("returns key based on last Sunday if date is Friday", () => {
    const date = new Date("2025-04-04");
    const result = getShabbatKeyForSWR(date, lat, lon);
    expect(result).toBe("shabbat:49.4305219:32.0544487:2025-03-30");
  });

  it("returns key based on last Sunday if date is Sunday", () => {
    const date = new Date("2025-03-30");
    const result = getShabbatKeyForSWR(date, lat, lon);
    expect(result).toBe("shabbat:49.4305219:32.0544487:2025-03-30");
  });

  it("returns key based on the date itself if it's Saturday", () => {
    const date = new Date("2025-04-05");
    const result = getShabbatKeyForSWR(date, lat, lon);
    expect(result).toBe("shabbat:49.4305219:32.0544487:2025-04-05");
  });

  it("returns key based on last Sunday if date is Friday next week", () => {
    const date = new Date("2025-04-11");
    const result = getShabbatKeyForSWR(date, lat, lon);
    expect(result).toBe("shabbat:49.4305219:32.0544487:2025-04-06");
  });

  it("returns key based on the date itself if it's Saturday before Sunday", () => {
    const date = new Date("2025-03-29");
    const result = getShabbatKeyForSWR(date, lat, lon);
    expect(result).toBe("shabbat:49.4305219:32.0544487:2025-03-29");
  });
});
