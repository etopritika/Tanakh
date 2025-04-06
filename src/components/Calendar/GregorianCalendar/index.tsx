import { ChevronLeft, ChevronRight } from "lucide-react";

import CalendarDay from "./CalendarDay";
import { Button } from "../../ui/button";
import GoToTodayButton from "../common/GoToTodayButton";
import HolidayCard from "../common/HolidayCard";
import YearPicker from "../common/YearPicker";
import { getGregorianMonthData } from "../utils/calendar-utils/gregorian";
import { gregorianMonthNames, weekDays } from "../utils/constants";

/**
 * GregorianCalendar component renders a visual representation
 * of the Gregorian calendar for the given `selectedDate`.
 *
 * Users can:
 *  - Navigate between months (using the "prev" and "next" buttons).
 *  - Select a specific day in the calendar.
 *  - View the current date highlighted (today).
 *  - View the selected date highlighted.
 *
 * Props:
 * @param selectedDate - The currently selected Date object.
 * @param onDateSelect - A callback function that updates the selected date when the user clicks on a day or navigates months.
 */
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
    <div className="space-y-4 pb-4">
      <nav
        aria-label="Month navigation"
        className="space-y-4 md:flex md:flex-row-reverse md:justify-end md:space-y-0 md:py-2"
      >
        <YearPicker selectedDate={selectedDate} onDateSelect={onDateSelect} />
        <div className="flex w-full items-center justify-between md:w-3/5">
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
      </nav>
      <div className="space-y-4 md:flex md:space-y-0">
        <div className="grid grid-cols-7 gap-1 md:w-3/5">
          {weekDays.map((day) => (
            <div key={day} className="text-center font-medium">
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

              return (
                <CalendarDay
                  key={dayNum}
                  year={year}
                  month={month}
                  day={dayNum}
                  onSelect={onDateSelect}
                  isSelected={isSelected(dayNum)}
                  isToday={isToday(dayNum)}
                />
              );
            })}
        </div>
        <div className="flex flex-col space-y-4 md:mx-auto md:w-2/5 md:px-3">
          <GoToTodayButton onClick={() => onDateSelect(new Date())} />
          <HolidayCard />
        </div>
      </div>
    </div>
  );
}
