import useSWR from "swr";

import {
  getMonthRangeStrings,
  getShabbatKeyForSWR,
} from "@/components/Calendar/utils/calendar-utils/range";
import { HebcalResponse, ShabbatItem, ShabbatResponse } from "@/lib/types";

const fetcher = async (url: string): Promise<ShabbatResponse> => {
  const response = await fetch(url);
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

export const useShabbatTimes = (
  lat: number | null,
  lon: number | null,
  date: Date = new Date(),
) => {
  const { start, end } = getMonthRangeStrings(date);
  const shouldFetch = lat !== null && lon !== null;

  const url =
    shouldFetch && lat && lon
      ? `https://www.hebcal.com/hebcal/?v=1&cfg=json&ss=on&geo=pos&latitude=${lat}&longitude=${lon}&start=${start}&end=${end}`
      : null;

  const swrKey =
    shouldFetch && lat && lon ? getShabbatKeyForSWR(date, lat, lon) : null;

  const { data, error, isLoading } = useSWR<ShabbatResponse>(swrKey, () =>
    fetcher(url!),
  );

  return {
    data,
    error,
    isLoading,
  };
};
