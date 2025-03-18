import { JewishMonth, toGregorianDate, toJewishDate } from "jewish-date";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  getJewishMonthData,
  getMonthsByLeapYear,
  isSameMonth,
  normalizeMonth,
} from "./calendar-utils";
import { weekDays } from "./constants";
import GoToTodayButton from "./GoToTodayButton";
import JewishCalendarDay from "./JewishCalendarDay";
import { Button } from "../ui/button";

/**
 * JewishCalendar component renders a visual representation
 * of the Jewish (Hebrew) calendar for the given `selectedDate`.
 *
 * Users can:
 *  - Navigate between months (using the "prev" and "next" buttons).
 *  - Select a specific day in the Jewish calendar.
 *  - View the current Jewish date highlighted (today).
 *  - View the selected Jewish date highlighted.
 *
 * Props:
 * @param selectedDate - The currently selected Gregorian Date object.
 * @param onDateSelect - A callback function that updates the selected Gregorian date when the user clicks on a day or navigates months.
 *
 * Note:
 * This component converts between Jewish dates and Gregorian dates to ensure synchronization.
 */
export default function JewishCalendar({
  selectedDate,
  onDateSelect,
}: {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}) {
  // Get the current Jewish date (today)
  const todayJewish = toJewishDate(new Date());

  // Get details for the currently displayed Jewish month based on the selected Gregorian date
  const { year, monthName, monthNameRu, days, firstDayOfWeek, selectedDay } =
    getJewishMonthData(selectedDate);

  // Get the list of Jewish months depending on whether the year is a leap year
  const months = getMonthsByLeapYear(year);

  // Find index of the currently displayed Jewish month
  const currentMonthIdx = months.findIndex((m) => isSameMonth(m, monthName));

  /**
   * Handles navigation to the previous Jewish month.
   * Converts to Gregorian date at the start of the new month.
   */
  const prevMonth = () => {
    let newMonthIdx = currentMonthIdx - 1;
    let newYear = year;

    // If we go back beyond the first month, switch to previous year
    if (newMonthIdx < 0) {
      newYear--;
      const prevMonths = getMonthsByLeapYear(newYear);
      newMonthIdx = prevMonths.length - 1;
    }

    // Convert the new Jewish month to Gregorian date
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

    // Update the selected Gregorian date
    onDateSelect(new Date(newGregorianDate));
  };

  /**
   * Handles navigation to the next Jewish month.
   * Converts to Gregorian date at the start of the new month.
   */
  const nextMonth = () => {
    let newMonthIdx = currentMonthIdx + 1;
    let newYear = year;

    const monthCount = getMonthsByLeapYear(newYear).length;

    // If we go past the last month, switch to next year
    if (newMonthIdx >= monthCount) {
      newYear++;
      newMonthIdx = 0;
    }

    // Convert the new Jewish month to Gregorian date
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

    // Update the selected Gregorian date
    onDateSelect(new Date(newGregorianDate));
  };

  return (
    <div className="space-y-4">
      {/* Navigation Header */}
      <nav
        aria-label="Month navigation"
        className="flex items-center justify-between"
      >
        <Button onClick={prevMonth}>
          <ChevronLeft />
        </Button>

        <div className="text-lg font-semibold">
          {monthNameRu} {year}
        </div>

        <Button onClick={nextMonth}>
          <ChevronRight />
        </Button>
      </nav>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Weekday headers */}
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-center font-medium">
            {day}
          </div>
        ))}

        {/* Empty slots before the first day of the month */}
        {Array(firstDayOfWeek)
          .fill(null)
          .map((_, idx) => (
            <div key={`empty-${idx}`} />
          ))}

        {/* Render days of the Jewish month */}
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

          return (
            <JewishCalendarDay
              key={idx}
              year={year}
              month={monthName}
              day={dayNum}
              gregorianDate={new Date(gregDate)}
              isToday={isTodayJewish}
              isSelected={isSelected}
              onSelect={(date) => onDateSelect(date)}
            />
          );
        })}
      </div>
      <GoToTodayButton onClick={() => onDateSelect(new Date())} />
    </div>
  );
}
