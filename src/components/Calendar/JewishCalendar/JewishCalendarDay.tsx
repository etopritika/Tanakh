import clsx from "clsx";
import { useEffect, useMemo } from "react";

import { translateHolidayTitle } from "../utils/calendar-utils";

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

  const holidayEvents = useMemo(() => {
    return holidaysByJewishDate?.[dateKey] || [];
  }, [holidaysByJewishDate, dateKey]);

  const hasHoliday = holidayEvents.length > 0;

  const handleClick = () => {
    onSelect(gregorianDate);
    if (hasHoliday) {
      setSelectedHoliday(holidayEvents);
    } else setSelectedHoliday([]);
  };

  useEffect(() => {
    if (!isSelected) return;

    setSelectedHoliday(hasHoliday ? holidayEvents : []);
  }, [isSelected, hasHoliday, holidayEvents, setSelectedHoliday]);

  const classes = clsx(
    "relative flex flex-col h-12 sm:h-16 justify-center items-center rounded-md border cursor-pointer transition-all",
    isSelected && "bg-brown-dark text-white font-bold",
    isToday && "underline font-bold bg-brown-light text-white",
  );

  const dotClasses = clsx(
    "absolute bottom-1 w-2 h-2 sm:bottom-2 sm:h-2.5 sm:w-2.5 rounded-full",
    isToday || isSelected ? "bg-white" : "bg-brown-light",
  );

  const content = (
    <div onClick={handleClick} className={classes}>
      <div className="text-center">{day}</div>

      {hasHoliday && <div className={dotClasses} />}
    </div>
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
