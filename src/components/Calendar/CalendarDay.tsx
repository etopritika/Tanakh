import clsx from "clsx";

import { useHolidayStore } from "@/store/use-holiday-store";

interface CalendarDayProps {
  year: number;
  month: number;
  day: number;
  onSelect: (date: Date) => void;
  isSelected: boolean;
  isToday: boolean;
}

export default function CalendarDay({
  year,
  month,
  day,
  onSelect,
  isSelected,
  isToday,
}: CalendarDayProps) {
  const { holidays, setSelectedHoliday } = useHolidayStore();

  const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const holidayEvents = holidays[year]?.[dateKey] || [];
  const hasHoliday = holidayEvents.length > 0;

  const handleClick = () => {
    onSelect(new Date(year, month, day));
    if (hasHoliday) {
      setSelectedHoliday(holidayEvents);
    } else setSelectedHoliday([]);
  };

  const classes = clsx(
    "relative flex flex-col h-16 justify-center items-center rounded-md border cursor-pointer transition-all",
    isSelected && "bg-brown-dark text-white font-bold",
    isToday && "underline font-bold bg-brown-light text-white",
  );

  const dotClasses = clsx(
    "absolute bottom-2 h-2.5 w-2.5 rounded-full",
    isToday || isSelected ? "bg-white" : "bg-brown-light",
  );

  return (
    <div onClick={handleClick} className={classes}>
      <div className="text-center">{day}</div>

      {hasHoliday && <div className={dotClasses} />}
    </div>
  );
}
