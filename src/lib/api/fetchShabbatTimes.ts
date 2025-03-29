import { HebcalResponse, ShabbatItem, ShabbatResponse } from "../types";

import { getMonthRangeStrings } from "@/components/Calendar/utils/calendar-utils";

export const fetchShabbatTimes = async (
  lat: number,
  lon: number,
  date: Date = new Date(),
): Promise<ShabbatResponse> => {
  const { start, end } = getMonthRangeStrings(date);

  const response = await fetch(
    `https://www.hebcal.com/hebcal/?v=1&cfg=json&ss=on&geo=pos&latitude=${lat}&longitude=${lon}&start=${start}&end=${end}`,
  );

  const result: HebcalResponse = await response.json();

  const shabbatItems: ShabbatItem[] = [];
  let currentItem: Partial<ShabbatItem> = {};

  for (const item of result.items) {
    if (item.category === "candles") {
      if (Object.keys(currentItem).length > 0) {
        shabbatItems.push(currentItem as ShabbatItem);
        currentItem = {};
      }

      currentItem.candleLighting = item.title;
      currentItem.candleDate = item.date;
    }

    if (item.category === "havdalah") {
      currentItem.havdalah = item.title;
      currentItem.havdalahDate = item.date;
    }

    if (item.category === "parashat") {
      currentItem.parsha = item.title;
    }
  }

  if (Object.keys(currentItem).length > 0) {
    shabbatItems.push(currentItem as ShabbatItem);
  }

  return {
    location: result.location?.tzid?.split("/")[1] || null,
    items: shabbatItems,
  };
};
