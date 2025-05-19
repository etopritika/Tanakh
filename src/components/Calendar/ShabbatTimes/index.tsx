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

import { toast } from "@/hooks/use-toast";
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
      .catch(() => {
        setCoords(DEFAULT_COORDS);
        toast({
          title: "Геолокация недоступна",
          description:
            "Не удалось получить геолокацию. Использованы координаты по умолчанию.",
          variant: "destructive",
        });
      });
  }, []);

  const { data, error, isLoading } = useShabbatTimes(
    coords.latitude,
    coords.longitude,
    selectedDate,
  );

  if (isLoading || !data)
    return (
      <div
        className="flex h-full items-center justify-center py-6"
        role="status"
      >
        <LoaderCircle
          className="animate-spin"
          aria-hidden="true"
          focusable="false"
        />
        <span className="sr-only">Загрузка данных шаббата...</span>
      </div>
    );

  if (error)
    return (
      <div
        className="flex h-full items-center justify-center py-6"
        role="status"
      >
        <p role="alert" className="text-danger">
          Невозможно получить данные шаббата. Попробуйте позже.
        </p>
      </div>
    );

  if (data.items.length === 0) {
    return (
      <div
        className="flex h-full items-center justify-center py-6"
        role="status"
      >
        <p className="text-muted-foreground">
          Нет данных для отображения шаббата на выбранную дату.
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Время шаббата"
      className="space-y-4 rounded-md border bg-white p-6 shadow"
    >
      <header className="space-y-3" aria-labelledby="shabbat-heading">
        <h3
          id="shabbat-heading"
          className="text-2xl font-bold text-text"
          aria-describedby="shabbat-description"
        >
          Время шаббата
          {data.location && (
            <span className="ml-1 font-normal text-gray-700" aria-live="polite">
              для {data.location}
            </span>
          )}
        </h3>

        <div
          id="shabbat-description"
          className="flex flex-col items-start justify-between space-y-2 border-b pb-2 text-sm text-gray-600 md:flex-row md:space-y-0"
        >
          <p className="max-w-prose">
            Зажигание свечей за 18 минут до заката | Местное время
          </p>
          <ShabbatDatePicker
            selectedDate={selectedDate}
            onDateChange={(date) => setSelectedDate(date)}
          />
        </div>
      </header>

      <div className="mt-4 space-y-10" aria-label="Список шаббатов">
        {data.items.map((item, idx) => {
          const candleId = `candle-label-${idx}`;
          const havdalahId = `havdalah-label-${idx}`;

          return (
            <article
              key={idx}
              className="space-y-4 border-b pb-4 last:border-none"
              aria-labelledby={
                item.havdalah ? `${candleId} ${havdalahId}` : candleId
              }
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

              <dl className="flex items-center justify-between">
                <dt
                  id={candleId}
                  className="flex flex-col gap-1 text-lg font-medium text-gray-800"
                >
                  <span className="flex items-center gap-2">
                    🕯 Зажигание свечей
                  </span>
                  {item.candleDate && (
                    <>
                      <time
                        dateTime={item.candleDate}
                        className="text-sm font-normal text-gray-500"
                      >
                        {formatDate(item.candleDate)}
                      </time>
                      <time
                        dateTime={item.candleDate}
                        className="text-[13px] font-normal italic text-gray-500"
                      >
                        {formatJewishDateRu(item.candleDate)}
                      </time>
                    </>
                  )}
                </dt>

                <dd className="mt-2 text-lg font-bold text-text">
                  <time dateTime={item.candleLighting ?? ""}>
                    {item.candleLighting
                      ? extractTime24h(item.candleLighting)
                      : "—"}
                  </time>
                </dd>
              </dl>

              {item.havdalah && (
                <dl className="flex items-center justify-between">
                  <dt
                    id={havdalahId}
                    className="flex flex-col gap-1 text-lg font-medium text-gray-800"
                  >
                    <span className="flex items-center gap-2">
                      ✡ Окончание шаббата
                    </span>
                    {item.havdalahDate && (
                      <>
                        <time
                          dateTime={item.havdalahDate}
                          className="text-sm font-normal text-gray-500"
                        >
                          {formatDate(item.havdalahDate)}
                        </time>
                        <time
                          dateTime={item.havdalahDate}
                          className="text-[13px] font-normal italic text-gray-500"
                        >
                          {formatJewishDateRu(item.havdalahDate)}
                        </time>
                      </>
                    )}
                  </dt>
                  <dd className="mt-2 text-lg font-bold text-text">
                    <time dateTime={item.havdalah ?? ""}>
                      {extractTime24h(item.havdalah)}
                    </time>
                  </dd>
                </dl>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ShabbatTimes;
