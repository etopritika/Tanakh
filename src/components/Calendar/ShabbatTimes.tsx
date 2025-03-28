import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  extractTime24h,
  formatDate,
  formatJewishDateRu,
  getUserCoordinates,
  translateHolidayTitle,
} from "./utils/calendar-utils";
import { parashatLinks } from "./utils/parashatLinks";

import { fetchShabbatTimes } from "@/lib/api/fetchShabbatTimes";
import { ShabbatData } from "@/lib/types";

const DEFAULT_COORDS = {
  latitude: 32.0853,
  longitude: 34.7818,
};

const ShabbatTimes: React.FC = () => {
  const [data, setData] = useState<ShabbatData>({
    candleLighting: null,
    havdalah: null,
    parsha: null,
    location: null,
    candleDate: null,
    havdalahDate: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const loadShabbatTimes = async () => {
      const today = new Date();
      setCurrentDate(
        today.toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      );

      try {
        const { latitude, longitude } = await getUserCoordinates().catch(
          () => DEFAULT_COORDS,
        );
        const result = await fetchShabbatTimes(latitude, longitude);
        setData(result);
      } catch {
        setError("Невозможно получить данные шаббата. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    loadShabbatTimes();
  }, []);

  if (loading)
    return (
      <div className="flex h-full items-center justify-center py-6">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  if (error)
    return (
      <div className="flex h-full items-center justify-center py-6">
        <p className="text-danger">{error}</p>
      </div>
    );

  return (
    <div
      aria-label="Время шаббата"
      className="space-y-4 rounded-md border bg-white p-6 shadow"
    >
      <header>
        <h1 className="text-2xl font-bold text-text">
          Время шаббата
          {data.location ? ` для ${data.location}` : ""}
        </h1>
        <div className="mt-1 flex items-center justify-between border-b pb-2 text-sm text-gray-600">
          <span>Зажигание свечей за 18 минут до заката | Местное время</span>
          <time dateTime={new Date().toISOString()}>
            Сегодня: <strong>{currentDate}</strong>
          </time>
        </div>
      </header>

      {data.parsha && (
        <p className="pt-4 text-lg font-medium text-gray-800">
          Шаббат, недельная глава:{" "}
          {parashatLinks[data.parsha] ? (
            <Link
              to={parashatLinks[data.parsha]}
              className="font-semibold text-blue-600"
            >
              {translateHolidayTitle(data.parsha)}
            </Link>
          ) : (
            <span className="font-semibold text-text">
              {translateHolidayTitle(data.parsha)}
            </span>
          )}
        </p>
      )}

      <div className="mt-4 space-y-6" aria-label="Шаббат расписание">
        {data.candleLighting && (
          <article className="flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-medium text-gray-800">
                🕯 Зажигание свечей
              </h2>
              {data.candleDate && (
                <div className="text-sm text-gray-500">
                  <time dateTime={data.candleDate}>
                    {formatDate(data.candleDate)}
                  </time>
                  <br />
                  <span className="text-[13px] italic text-gray-400">
                    {formatJewishDateRu(data.candleDate)}
                  </span>
                </div>
              )}
            </div>
            <time
              dateTime={data.candleLighting ?? ""}
              className="mt-2 text-lg font-bold text-text"
            >
              {extractTime24h(data.candleLighting)}
            </time>
          </article>
        )}

        {data.havdalah && (
          <article className="flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-medium text-gray-800">
                ✡ Окончание шаббата
              </h2>
              {data.havdalahDate && (
                <div className="text-sm text-gray-500">
                  <time dateTime={data.havdalahDate}>
                    {formatDate(data.havdalahDate)}
                  </time>
                  <br />
                  <span className="text-[13px] italic text-gray-400">
                    {formatJewishDateRu(data.havdalahDate)}
                  </span>
                </div>
              )}
            </div>
            <time
              dateTime={data.havdalah ?? ""}
              className="mt-2 text-lg font-bold text-text"
            >
              {extractTime24h(data.havdalah)}
            </time>
          </article>
        )}
      </div>
    </div>
  );
};

export default ShabbatTimes;
