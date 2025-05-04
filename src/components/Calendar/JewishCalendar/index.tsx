import { JewishMonth, toGregorianDate, toJewishDate } from "jewish-date";
import { ChevronLeft, ChevronRight } from "lucide-react";

import JewishCalendarDay from "./JewishCalendarDay";
import { Button } from "../../ui/button";
import GoToTodayButton from "../common/GoToTodayButton";
import HolidayCard from "../common/HolidayCard";
import YearPicker from "../common/YearPicker";
import {
  getJewishMonthData,
  getMonthsByLeapYear,
  isSameMonth,
  normalizeMonth,
} from "../utils/calendar-utils/jewish";
import { weekDays } from "../utils/constants";

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
    <section
      aria-labelledby="jewish-calendar-heading"
      className="space-y-4 pb-4"
    >
      <nav
        aria-label="Навигация по месяцам"
        className="space-y-4 md:flex md:flex-row-reverse md:justify-end md:space-y-0 md:py-2"
      >
        <YearPicker selectedDate={selectedDate} onDateSelect={onDateSelect} />
        <div className="flex w-full items-center justify-between md:w-3/5">
          <Button onClick={prevMonth} aria-label="Предыдущий месяц">
            <ChevronLeft aria-hidden="true" focusable="false" />
          </Button>

          <h3 id="jewish-calendar-heading" className="text-lg font-semibold">
            {monthNameRu} {year}
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
            aria-label={`Еврейский календарь на ${monthNameRu} ${year}`}
          >
            {Array(firstDayOfWeek)
              .fill(null)
              .map((_, idx) => (
                <li key={`empty-${idx}`} aria-hidden="true" />
              ))}

            {days.map((dayNum) => {
              const isTodayJewish =
                dayNum === todayJewish.day &&
                isSameMonth(monthName, todayJewish.monthName) &&
                year === todayJewish.year;

              const isSelected = dayNum === selectedDay;

              const monthEnum =
                JewishMonth[
                  normalizeMonth(monthName) as keyof typeof JewishMonth
                ];

              const gregDate = toGregorianDate({
                year,
                monthName: monthEnum,
                day: dayNum,
              });

              return (
                <li key={dayNum}>
                  <JewishCalendarDay
                    year={year}
                    month={monthName}
                    day={dayNum}
                    gregorianDate={new Date(gregDate)}
                    isToday={isTodayJewish}
                    isSelected={isSelected}
                    onSelect={onDateSelect}
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
