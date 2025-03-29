import { ru } from "date-fns/locale";
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

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "text-sm font-semibold text-gray-800 transition hover:underline",
          )}
          title="Выбрать дату"
        >
          Сегодня:{" "}
          <strong>
            {selectedDate.toLocaleDateString("ru-RU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </strong>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          className="bg-white"
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          showOutsideDays={false}
          locale={ru}
        />
      </PopoverContent>
    </Popover>
  );
};
