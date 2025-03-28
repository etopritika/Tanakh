import { HebcalResponse, ShabbatData } from "@/lib/types";

export const fetchShabbatTimes = async (
  lat: number,
  lon: number,
): Promise<ShabbatData> => {
  const response = await fetch(
    `https://www.hebcal.com/shabbat/?cfg=json&latitude=${lat}&longitude=${lon}`,
  );

  const result: HebcalResponse = await response.json();

  const candleItem = result.items.find((item) => item.category === "candles");
  const havdalahItem = result.items.find(
    (item) => item.category === "havdalah",
  );
  const parsha = result.items.find(
    (item) => item.category === "parashat",
  )?.title;
  const location = result.location?.tzid?.split("/")[1] || null;

  return {
    candleLighting: candleItem?.title || null,
    havdalah: havdalahItem?.title || null,
    parsha: parsha || null,
    location,
    candleDate: candleItem?.date || null,
    havdalahDate: havdalahItem?.date || null,
  };
};
