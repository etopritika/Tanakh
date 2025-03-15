import { ChevronLeft, ChevronRight } from "lucide-react";

import { getGregorianMonthData } from "./calendar-utils";
import { gregorianMonthNames, weekDays } from "./constants";
import { Button } from "../ui/button";

export default function GregorianCalendar({
  selectedDate,
  onDateSelect,
}: {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}) {
  const today = new Date();
  const { year, month, daysInMonth, firstDayIndex } =
    getGregorianMonthData(selectedDate);

  const prevMonth = () => onDateSelect(new Date(year, month - 1, 1));
  const nextMonth = () => onDateSelect(new Date(year, month + 1, 1));

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const isSelected = (day: number) =>
    day === selectedDate.getDate() &&
    month === selectedDate.getMonth() &&
    year === selectedDate.getFullYear();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button onClick={prevMonth}>
          <ChevronLeft />
        </Button>
        <div className="text-lg font-semibold">
          {gregorianMonthNames[month]} {year}
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

        {Array(firstDayIndex)
          .fill(null)
          .map((_, idx) => (
            <div key={`empty-${idx}`} />
          ))}

        {Array(daysInMonth)
          .fill(null)
          .map((_, idx) => {
            const dayNum = idx + 1;
            const classes = [
              "flex h-12 items-center justify-center rounded-md border cursor-pointer",
              isSelected(dayNum) ? "bg-brown-dark text-white font-bold" : "",
              isToday(dayNum)
                ? "underline font-bold text-lg bg-brown-light text-white"
                : "",
            ].join(" ");

            return (
              <div
                key={idx}
                onClick={() => onDateSelect(new Date(year, month, dayNum))}
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
