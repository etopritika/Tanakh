import { toJewishDate, toGregorianDate, JewishMonth } from "jewish-date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// =================== CONSTANTS ===================
type JewishMonthName =
  | "Tishri"
  | "Cheshvan"
  | "Kislev"
  | "Tevet"
  | "Shevat"
  | "Adar"
  | "Adar I"
  | "Adar II"
  | "Nisan"
  | "Iyyar"
  | "Sivan"
  | "Tammuz"
  | "Av"
  | "Elul";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const gregorianMonthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const jewishMonthsNonLeap: JewishMonthName[] = [
  "Tishri",
  "Cheshvan",
  "Kislev",
  "Tevet",
  "Shevat",
  "Adar",
  "Nisan",
  "Iyyar",
  "Sivan",
  "Tammuz",
  "Av",
  "Elul",
];

const jewishMonthsLeap: JewishMonthName[] = [
  "Tishri",
  "Cheshvan",
  "Kislev",
  "Tevet",
  "Shevat",
  "Adar I",
  "Adar II",
  "Nisan",
  "Iyyar",
  "Sivan",
  "Tammuz",
  "Av",
  "Elul",
];

const jewishMonthsNonLeapRu = [
  "Тишрей",
  "Хешван",
  "Кислев",
  "Тевет",
  "Шват",
  "Адар",
  "Нисан",
  "Ияр",
  "Сиван",
  "Таммуз",
  "Ав",
  "Элул",
];

const jewishMonthsLeapRu = [
  "Тишрей",
  "Хешван",
  "Кислев",
  "Тевет",
  "Шват",
  "Адар I",
  "Адар II",
  "Нисан",
  "Ияр",
  "Сиван",
  "Таммуз",
  "Ав",
  "Элул",
];

// =================== UTILS ===================
const isJewishLeapYear = (year: number) => (7 * year + 1) % 19 < 7;

const normalizeMonth = (name: string) => name.replace(/\s+/g, "");

const isSameMonth = (a: string, b: string) =>
  normalizeMonth(a) === normalizeMonth(b);

const getMonthsByLeapYear = (year: number) =>
  isJewishLeapYear(year) ? jewishMonthsLeap : jewishMonthsNonLeap;

const getMonthsRuByLeapYear = (year: number) =>
  isJewishLeapYear(year) ? jewishMonthsLeapRu : jewishMonthsNonLeapRu;

// =================== MAIN COMPONENT ===================
export default function UniversalCalendar() {
  const todayGregorian = new Date();
  const todayJewish = toJewishDate(todayGregorian);

  const [gregorianDate, setGregorianDate] = useState(todayGregorian);
  const [jewishDate, setJewishDate] = useState({
    year: todayJewish.year,
    monthName: todayJewish.monthName as JewishMonthName,
    day: todayJewish.day,
  });

  const syncGregorianToJewish = (newDate: Date) => {
    const jewish = toJewishDate(newDate);
    setJewishDate({
      year: jewish.year,
      monthName: jewish.monthName as JewishMonthName,
      day: jewish.day,
    });
  };

  const syncJewishToGregorian = (year: number, monthName: JewishMonthName) => {
    const gregDate = syncJewishToGregorianByMajority(year, monthName);
    setGregorianDate(gregDate);
  };

  return (
    <div className="space-y-4 p-4">
      <Tabs defaultValue="gregorian">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gregorian">Григорианский</TabsTrigger>
          <TabsTrigger value="jewish">Иудейский</TabsTrigger>
        </TabsList>

        <TabsContent value="gregorian">
          <GregorianCalendar
            currentDate={gregorianDate}
            setCurrentDate={(date) => {
              setGregorianDate(date);
              syncGregorianToJewish(date);
            }}
          />
        </TabsContent>

        <TabsContent value="jewish">
          <JewishCalendar
            currentDate={jewishDate}
            setCurrentDate={({ year, monthName }) => {
              setJewishDate({ year, monthName, day: 1 });
              syncJewishToGregorian(year, monthName);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// =================== GREGORIAN CALENDAR ===================
function GregorianCalendar({
  currentDate,
  setCurrentDate,
}: {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}) {
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-center font-medium">
            {day}
          </div>
        ))}
        {Array(firstDayIndex)
          .fill(null)
          .map((_, idx) => (
            <div key={`empty-${idx}`} />
          ))}
        {Array(daysInMonth)
          .fill(null)
          .map((_, idx) => (
            <div
              key={idx}
              className={`flex h-12 items-center justify-center rounded-md border ${
                isToday(idx + 1) ? "bg-brown-dark font-bold text-white" : ""
              }`}
            >
              {idx + 1}
            </div>
          ))}
      </div>
    </div>
  );
}

// =================== JEWISH CALENDAR ===================
function JewishCalendar({
  currentDate,
  setCurrentDate,
}: {
  currentDate: { year: number; monthName: JewishMonthName; day: number };
  setCurrentDate: (val: { year: number; monthName: JewishMonthName }) => void;
}) {
  const months = useMemo(
    () => getMonthsByLeapYear(currentDate.year),
    [currentDate.year],
  );
  const monthsRu = useMemo(
    () => getMonthsRuByLeapYear(currentDate.year),
    [currentDate.year],
  );

  const currentMonthIdx = months.findIndex((m) =>
    isSameMonth(m, currentDate.monthName),
  );

  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);

  const generateMonth = useCallback(() => {
    if (currentMonthIdx === -1) return;

    const monthEnum =
      JewishMonth[
        normalizeMonth(months[currentMonthIdx]) as keyof typeof JewishMonth
      ];

    const firstGregorianDate = toGregorianDate({
      year: currentDate.year,
      monthName: monthEnum,
      day: 1,
    });

    const days: number[] = [];
    const date = new Date(firstGregorianDate);

    for (let i = 0; i < 32; i++) {
      const jd = toJewishDate(date);

      if (!isSameMonth(jd.monthName, months[currentMonthIdx])) break;

      days.push(jd.day);
      date.setDate(date.getDate() + 1);
    }

    const rawFirstDay = new Date(firstGregorianDate).getDay();
    setFirstDayOfWeek((rawFirstDay + 6) % 7);
    setDaysInMonth(days);
  }, [currentDate.year, currentMonthIdx, months]);

  useEffect(() => {
    generateMonth();
  }, [generateMonth]);

  const prevMonth = () => {
    let newMonthIdx = currentMonthIdx - 1;
    let newYear = currentDate.year;

    if (newMonthIdx < 0) {
      newYear--;
      const prevMonths = getMonthsByLeapYear(newYear);
      newMonthIdx = prevMonths.length - 1;
      setCurrentDate({ year: newYear, monthName: prevMonths[newMonthIdx] });
      return;
    }

    setCurrentDate({ year: newYear, monthName: months[newMonthIdx] });
  };

  const nextMonth = () => {
    let newMonthIdx = currentMonthIdx + 1;
    let newYear = currentDate.year;

    const monthCount = months.length;
    if (newMonthIdx >= monthCount) {
      newYear++;
      const nextMonths = getMonthsByLeapYear(newYear);
      newMonthIdx = 0;
      setCurrentDate({ year: newYear, monthName: nextMonths[newMonthIdx] });
      return;
    }

    setCurrentDate({ year: newYear, monthName: months[newMonthIdx] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button onClick={prevMonth}>
          <ChevronLeft />
        </Button>
        <div className="text-lg font-semibold">
          {monthsRu[currentMonthIdx]} {currentDate.year}
        </div>
        <Button onClick={nextMonth}>
          <ChevronRight />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-center font-medium">
            {day}
          </div>
        ))}
        {Array(firstDayOfWeek)
          .fill(null)
          .map((_, idx) => (
            <div key={`empty-${idx}`} />
          ))}
        {daysInMonth.map((dayNum, idx) => (
          <div
            key={idx}
            className="flex h-12 items-center justify-center rounded-md border"
          >
            {dayNum}
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== SYNC JEWISH TO GREGORIAN ===================
function syncJewishToGregorianByMajority(
  year: number,
  monthName: JewishMonthName,
): Date {
  const normalized = normalizeMonth(monthName);
  const monthEnum = JewishMonth[normalized as keyof typeof JewishMonth];

  if (!monthEnum) {
    console.error(`❌ Місяць '${monthName}' не знайдено`);
    return new Date();
  }

  const firstGregorianDate = toGregorianDate({
    year,
    monthName: monthEnum,
    day: 1,
  });
  return new Date(firstGregorianDate);
}
