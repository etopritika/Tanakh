import { ru } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ShabbatDatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const ShabbatDatePicker: React.FC<ShabbatDatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [open, setOpen] = useState(false);
  const today = new Date();

  const isToday = selectedDate.toDateString() === today.toDateString();

  const formattedDate = selectedDate.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      setOpen(false);
    }
  };

  const handleResetToToday = () => {
    onDateChange(today);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="md:text-nowrap">
        <button
          className={cn(
            "flex items-center text-sm font-semibold text-gray-800 transition hover:underline",
          )}
          aria-label={`Выбрать дату. ${isToday ? "Сегодня" : "Выбранная дата"}: ${formattedDate}`}
        >
          <CalendarDays className="mr-2" aria-hidden="true" focusable="false" />
          <p>
            {isToday ? "Сегодня: " : "Выбранная дата: "}
            <span>{formattedDate}</span>
          </p>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto bg-white p-2"
        align="end"
        aria-labelledby="calendar-label"
      >
        <header className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-600" id="calendar-label">
            Выберите дату
          </h4>
          {!isToday && (
            <button
              onClick={handleResetToToday}
              className="text-xs text-blue-600 hover:underline"
              aria-label="Сбросить выбранную дату и перейти к сегодняшней дате"
            >
              Сегодня
            </button>
          )}
        </header>

        <Calendar
          className="p-1"
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          showOutsideDays={false}
          locale={ru}
          defaultMonth={selectedDate}
          modifiersClassNames={{
            selected: "bg-gray-600 text-white font-semibold rounded-full",
            today: "border border-gray-600",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
