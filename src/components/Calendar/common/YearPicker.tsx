import { useMemo } from "react";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type DatePickerProps = {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  minYear?: number;
  maxYear?: number;
};

export default function YearPicker({
  selectedDate,
  onDateSelect,
  minYear = 1900,
  maxYear = new Date().getFullYear() + 100,
}: DatePickerProps) {
  const years: number[] = useMemo(() => {
    const arr: number[] = [];
    for (let y = maxYear; y >= minYear; y--) {
      arr.push(y);
    }
    return arr;
  }, [minYear, maxYear]);

  const handleYearChange = (year: string) => {
    onDateSelect(
      new Date(Number(year), selectedDate.getMonth(), selectedDate.getDate()),
    );
  };

  return (
    <div className="md:px-3">
      <label className="sr-only">Выбор года</label>

      <Select
        value={selectedDate.getFullYear().toString()}
        onValueChange={handleYearChange}
      >
        <SelectTrigger className="w-[200px] bg-white">
          <SelectValue placeholder="Выберите год" />
        </SelectTrigger>

        <SelectContent className="bg-white">
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()} className="text-lg">
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
