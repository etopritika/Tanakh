import clsx from "clsx";
import { useEffect, useMemo } from "react";

import { getJewishWeekDayName } from "../utils/calendar-utils/format";
import { translateHolidayTitle } from "../utils/calendar-utils/translate";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHolidayStore } from "@/store/use-holiday-store";

interface JewishCalendarDayProps {
  year: number;
  month: string;
  day: number;
  onSelect: (date: Date) => void;
  gregorianDate: Date;
  isSelected: boolean;
  isToday: boolean;
}

export default function JewishCalendarDay({
  year,
  month,
  day,
  gregorianDate,
  onSelect,
  isSelected,
  isToday,
}: JewishCalendarDayProps) {
  const { holidaysByJewishDate, setSelectedHoliday } = useHolidayStore();

  const dateKey = `${day} ${month} ${year}`;
  const isoDate = gregorianDate.toISOString().split("T")[0];

  const holidayEvents = useMemo(
    () => holidaysByJewishDate?.[dateKey] || [],
    [holidaysByJewishDate, dateKey],
  );
  const hasHoliday = holidayEvents.length > 0;

  const handleClick = () => {
    onSelect(gregorianDate);
    setSelectedHoliday(hasHoliday ? holidayEvents : []);
  };

  useEffect(() => {
    if (isSelected) {
      setSelectedHoliday(hasHoliday ? holidayEvents : []);
    }
  }, [isSelected, hasHoliday, holidayEvents, setSelectedHoliday]);

  const classes = clsx(
    "w-full relative flex flex-col h-11 md:h-13 justify-center items-center rounded-md border cursor-pointer transition-all focus:outline focus:outline-2 focus:outline-black",
    isSelected && "bg-brown-light text-white font-bold",
    isToday && "underline font-bold bg-brown-dark text-white",
  );

  const dotClasses = clsx(
    "absolute bottom-1 w-2 h-2 rounded-full",
    isToday || isSelected ? "bg-white" : "bg-brown-light",
  );

  const labelText = `${getJewishWeekDayName(gregorianDate)} ${day}${hasHoliday ? ", есть события" : ""}`;

  const content = (
    <button
      onClick={handleClick}
      className={classes}
      aria-label={labelText}
      aria-pressed={isSelected}
    >
      <time dateTime={isoDate} className="text-center">
        {day}
      </time>
      {hasHoliday && <div className={dotClasses} />}
    </button>
  );

  return hasHoliday ? (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="top" className="bg-white">
        <ul className="space-y-1">
          {holidayEvents.map((holiday, index) => (
            <li key={index} className="text-sm">
              {translateHolidayTitle(holiday.title)}
            </li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  ) : (
    content
  );
}
