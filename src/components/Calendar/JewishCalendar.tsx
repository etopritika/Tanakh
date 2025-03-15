import { JewishMonth, toGregorianDate, toJewishDate } from "jewish-date";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  getJewishMonthData,
  getMonthsByLeapYear,
  isSameMonth,
  normalizeMonth,
} from "./calendar-utils";
import { weekDays } from "./constants";
import { Button } from "../ui/button";

export default function JewishCalendar({
  selectedDate,
  onDateSelect,
}: {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}) {
  const todayJewish = toJewishDate(new Date());
  const { year, monthName, monthNameRu, days, firstDayOfWeek, selectedDay } =
    getJewishMonthData(selectedDate);

  const months = getMonthsByLeapYear(year);
  const currentMonthIdx = months.findIndex((m) => isSameMonth(m, monthName));

  const prevMonth = () => {
    let newMonthIdx = currentMonthIdx - 1;
    let newYear = year;

    if (newMonthIdx < 0) {
      newYear--;
      const prevMonths = getMonthsByLeapYear(newYear);
      newMonthIdx = prevMonths.length - 1;
    }

    const monthEnum =
      JewishMonth[
        normalizeMonth(
          getMonthsByLeapYear(newYear)[newMonthIdx],
        ) as keyof typeof JewishMonth
      ];

    const newGregorianDate = toGregorianDate({
      year: newYear,
      monthName: monthEnum,
      day: 1,
    });

    onDateSelect(new Date(newGregorianDate));
  };

  const nextMonth = () => {
    let newMonthIdx = currentMonthIdx + 1;
    let newYear = year;

    const monthCount = getMonthsByLeapYear(newYear).length;

    if (newMonthIdx >= monthCount) {
      newYear++;
      newMonthIdx = 0;
    }

    const monthEnum =
      JewishMonth[
        normalizeMonth(
          getMonthsByLeapYear(newYear)[newMonthIdx],
        ) as keyof typeof JewishMonth
      ];

    const newGregorianDate = toGregorianDate({
      year: newYear,
      monthName: monthEnum,
      day: 1,
    });

    onDateSelect(new Date(newGregorianDate));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button onClick={prevMonth}>
          <ChevronLeft />
        </Button>
        <div className="text-lg font-semibold">
          {monthNameRu} {year}
        </div>
        <Button onClick={nextMonth}>
          <ChevronRight />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-center font-medium">
            {day}
          </div>
        ))}

        {Array(firstDayOfWeek)
          .fill(null)
          .map((_, idx) => (
            <div key={`empty-${idx}`} />
          ))}

        {days.map((dayNum, idx) => {
          const isTodayJewish =
            dayNum === todayJewish.day &&
            isSameMonth(monthName, todayJewish.monthName) &&
            year === todayJewish.year;

          const isSelected = dayNum === selectedDay;

          const monthEnum =
            JewishMonth[normalizeMonth(monthName) as keyof typeof JewishMonth];
          const gregDate = toGregorianDate({
            year,
            monthName: monthEnum,
            day: dayNum,
          });

          const classes = [
            "flex h-12 items-center justify-center rounded-md border cursor-pointer",
            isSelected ? "bg-brown-dark text-white font-bold" : "",
            isTodayJewish
              ? "underline font-bold text-lg bg-brown-light text-white"
              : "",
          ].join(" ");

          return (
            <div
              key={idx}
              onClick={() => onDateSelect(new Date(gregDate))}
              className={classes}
            >
              {dayNum}
            </div>
          );
        })}
      </div>
    </div>
  );
}
