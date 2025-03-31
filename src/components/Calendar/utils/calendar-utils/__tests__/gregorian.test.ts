/// <reference types="jest" />
import { getGregorianMonthData } from "../gregorian";

describe("getGregorianMonthData", () => {
  it("returns correct data for January 2024", () => {
    const result = getGregorianMonthData(new Date("2024-01-01"));

    expect(result.year).toBe(2024);
    expect(result.month).toBe(0);
    expect(result.daysInMonth).toBe(31);
    expect(result.firstDayIndex).toBe(0);
  });

  it("returns correct data for February 2024 (leap year)", () => {
    const result = getGregorianMonthData(new Date("2024-02-01"));

    expect(result.year).toBe(2024);
    expect(result.month).toBe(1);
    expect(result.daysInMonth).toBe(29);
    expect(result.firstDayIndex).toBe(3);
  });

  it("returns correct data for December 2025", () => {
    const result = getGregorianMonthData(new Date("2025-12-01"));

    expect(result.year).toBe(2025);
    expect(result.month).toBe(11);
    expect(result.daysInMonth).toBe(31);
    expect(result.firstDayIndex).toBe(0);
  });
});
