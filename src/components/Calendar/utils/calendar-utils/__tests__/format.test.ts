/// <reference types="jest" />
import {
  formatDateKey,
  extractTime24h,
  formatDate,
  formatJewishDateRu,
} from "../format";

describe("formatDateKey", () => {
  it("formats Date object as YYYY-MM-DD", () => {
    expect(formatDateKey(new Date("2025-03-31"))).toBe("2025-03-31");
  });
});

describe("extractTime24h", () => {
  it("converts 12-hour AM/PM to 24-hour format", () => {
    expect(extractTime24h("7:10pm")).toBe("19:10");
    expect(extractTime24h("12:00am")).toBe("00:00");
    expect(extractTime24h("12:00pm")).toBe("12:00");
    expect(extractTime24h("3:45am")).toBe("03:45");
  });

  it("returns null for invalid input", () => {
    expect(extractTime24h("invalid")).toBeNull();
  });
});

describe("formatDate", () => {
  it("formats date as long Russian string", () => {
    const result = formatDate("2025-03-29");
    expect(result).toMatch(/суббота, 29 марта 2025/);
  });
});

describe("formatJewishDateRu", () => {
  it("formats ISO date to Jewish date in Russian", () => {
    const result = formatJewishDateRu("2025-03-31");
    expect(result).toMatch(/\d+ \S+ 5785/);
  });
});
