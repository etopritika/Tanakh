import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";

import CalendarDay from "./CalendarDay";
import { Button } from "../../ui/button";
import GoToTodayButton from "../common/GoToTodayButton";
import HolidayCard from "../common/HolidayCard";
import YearPicker from "../common/YearPicker";
import { getGregorianMonthData } from "../utils/calendar-utils";
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
  // Get today's date for comparison
  const today = new Date();

  // Extract year, month, number of days, and the index of the first day of the week from the selectedDate
  const { year, month, daysInMonth, firstDayIndex } =
    getGregorianMonthData(selectedDate);

  // Handlers for switching months
  const prevMonth = () => onDateSelect(new Date(year, month - 1, 1));
  const nextMonth = () => onDateSelect(new Date(year, month + 1, 1));

  // Check if a given day matches today's date
  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  // Check if a given day is the selected date
  const isSelected = (day: number) =>
    day === selectedDate.getDate() &&
    month === selectedDate.getMonth() &&
    year === selectedDate.getFullYear();

  return (
    <TooltipProvider>
      <div className="space-y-4 pb-4">
        {/* Navigation Header */}
        <nav aria-label="Month navigation" className="space-y-4">
          <YearPicker selectedDate={selectedDate} onDateSelect={onDateSelect} />
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
        </nav>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Weekday headers */}
          {weekDays.map((day) => (
            <div key={day} className="text-center font-medium">
              {day}
            </div>
          ))}

          {/* Empty slots before the first day of the month */}
          {Array(firstDayIndex)
            .fill(null)
            .map((_, idx) => (
              <div key={`empty-${idx}`} />
            ))}

          {/* Render days of the month */}
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
        <GoToTodayButton onClick={() => onDateSelect(new Date())} />
        <HolidayCard />
      </div>
    </TooltipProvider>
  );
}
