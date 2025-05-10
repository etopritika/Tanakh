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
    <section aria-labelledby="calendar-heading" className="space-y-4 pb-4">
      <nav
        aria-label="Навигация по календарю"
        className="space-y-4 md:flex md:flex-row-reverse md:justify-end md:space-y-0 md:py-2"
      >
        <YearPicker selectedDate={selectedDate} onDateSelect={onDateSelect} />
        <div className="flex w-full items-center justify-between md:w-3/5">
          <Button onClick={prevMonth} aria-label="Предыдущий месяц">
            <ChevronLeft aria-hidden="true" focusable="false" />
          </Button>

          <h3 id="calendar-heading" className="text-lg font-semibold">
            {gregorianMonthNames[month]} {year}
          </h3>

          <Button onClick={nextMonth} aria-label="Следующий месяц">
            <ChevronRight aria-hidden="true" focusable="false" />
          </Button>
        </div>
      </nav>

      <div className="space-y-4 md:flex md:space-y-0">
        <div className="md:w-3/5">
          <ul
            className="grid grid-cols-7 gap-1 text-center font-medium"
            aria-hidden="true"
          >
            {weekDays.map((day) => (
              <li key={day}>{day}</li>
            ))}
          </ul>

          <ol
            className="grid grid-cols-7 gap-1"
            aria-label={`Календарь на ${gregorianMonthNames[month]} ${year}`}
          >
            {Array(firstDayIndex)
              .fill(null)
              .map((_, idx) => (
                <li key={`empty-${idx}`} aria-hidden="true" />
              ))}

            {Array(daysInMonth)
              .fill(null)
              .map((_, idx) => {
                const dayNum = idx + 1;
                return (
                  <li key={dayNum}>
                    <CalendarDay
                      year={year}
                      month={month}
                      day={dayNum}
                      onSelect={onDateSelect}
                      isSelected={isSelected(dayNum)}
                      isToday={isToday(dayNum)}
                    />
                  </li>
                );
              })}
          </ol>
        </div>

        <div className="flex flex-col space-y-4 md:mx-auto md:w-2/5 md:px-3">
          <GoToTodayButton onClick={() => onDateSelect(new Date())} />
          <HolidayCard />
        </div>
      </div>
    </section>
  );
}
