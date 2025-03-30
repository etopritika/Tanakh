import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ShabbatDatePicker } from "./ShabbatDatePicker";
import {
  extractTime24h,
  formatDate,
  formatJewishDateRu,
} from "../utils/calendar-utils/format";
import { getUserCoordinates } from "../utils/calendar-utils/geo";
import { translateHolidayTitle } from "../utils/calendar-utils/translate";
import { parashatLinks } from "../utils/parashatLinks";

import { useShabbatTimes } from "@/lib/api/fetchShabbatTimes";

const DEFAULT_COORDS = {
  latitude: 32.0853,
  longitude: 34.7818,
};

const ShabbatTimes: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [coords, setCoords] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    getUserCoordinates()
      .then((res) =>
        setCoords({ latitude: res.latitude, longitude: res.longitude }),
      )
      .catch(() => setCoords(DEFAULT_COORDS));
  }, []);

  const { data, error, isLoading } = useShabbatTimes(
    coords.latitude,
    coords.longitude,
    selectedDate,
  );

  if (isLoading || !data)
    return (
      <div className="flex h-full items-center justify-center py-6">
        <LoaderCircle className="animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex h-full items-center justify-center py-6">
        <p className="text-danger">
          Невозможно получить данные шаббата. Попробуйте позже.
        </p>
      </div>
    );

  if (data.items.length === 0) {
    return (
      <div className="flex h-full items-center justify-center py-6">
        <p className="text-muted-foreground">
          Нет данных для отображения шаббата на выбранную дату.
        </p>
      </div>
    );
  }

  return (
    <div
      aria-label="Время шаббата"
      className="space-y-4 rounded-md border bg-white p-6 shadow"
    >
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-text">
          Время шаббата
          {data.location ? ` для ${data.location}` : ""}
        </h1>
        <div className="flex flex-col items-start justify-between space-y-2 border-b pb-2 text-sm text-gray-600 md:flex-row md:space-y-0">
          <span>Зажигание свечей за 18 минут до заката | Местное время</span>
          <ShabbatDatePicker
            selectedDate={selectedDate}
            onDateChange={(date) => setSelectedDate(date)}
          />
        </div>
      </header>

      <div className="mt-4 space-y-10" aria-label="Список шаббатов">
        {data.items.map((item, idx) => (
          <section
            key={idx}
            className="space-y-4 border-b pb-4 last:border-none"
          >
            {item.parsha && (
              <p className="text-lg font-medium text-gray-800">
                Шаббат, недельная глава:{" "}
                {parashatLinks[item.parsha] ? (
                  <Link
                    to={parashatLinks[item.parsha]}
                    className="font-semibold text-blue-600"
                  >
                    {translateHolidayTitle(item.parsha)}
                  </Link>
                ) : (
                  <span className="font-semibold text-text">
                    {translateHolidayTitle(item.parsha)}
                  </span>
                )}
              </p>
            )}

            <article className="flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-medium text-gray-800">
                  🕯 Зажигание свечей
                </h2>
                {item.candleDate && (
                  <div className="text-sm text-gray-500">
                    <time dateTime={item.candleDate}>
                      {formatDate(item.candleDate)}
                    </time>
                    <br />
                    <span className="text-[13px] italic text-gray-400">
                      {formatJewishDateRu(item.candleDate)}
                    </span>
                  </div>
                )}
              </div>
              <time
                dateTime={item.candleLighting ?? ""}
                className="mt-2 text-lg font-bold text-text"
              >
                {item.candleLighting
                  ? extractTime24h(item.candleLighting)
                  : "—"}
              </time>
            </article>

            {item.havdalah && (
              <article className="flex items-center justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-medium text-gray-800">
                    ✡ Окончание шаббата
                  </h2>
                  {item.havdalahDate && (
                    <div className="text-sm text-gray-500">
                      <time dateTime={item.havdalahDate}>
                        {formatDate(item.havdalahDate)}
                      </time>
                      <br />
                      <span className="text-[13px] italic text-gray-400">
                        {formatJewishDateRu(item.havdalahDate)}
                      </span>
                    </div>
                  )}
                </div>
                <time
                  dateTime={item.havdalah ?? ""}
                  className="mt-2 text-lg font-bold text-text"
                >
                  {extractTime24h(item.havdalah)}
                </time>
              </article>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default ShabbatTimes;
