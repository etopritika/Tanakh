import { toJewishDate, toGregorianDate, JewishMonth } from "jewish-date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Типізація місяців
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

function isJewishLeapYear(year: number): boolean {
  return (7 * year + 1) % 19 < 7;
}

export default function UniversalCalendar() {
  const todayGregorian = new Date();
  const todayJewish = toJewishDate(todayGregorian);

  const [gregorianDate, setGregorianDate] = useState(todayGregorian);

  const [jewishDate, setJewishDate] = useState<{
    year: number;
    monthName: JewishMonthName;
    day: number;
  }>({
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
    const majorityGregorianDate = syncJewishToGregorianByMajority(
      year,
      monthName,
    );
    setGregorianDate(majorityGregorianDate);
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
  const rawFirstDayIndex = new Date(year, month, 1).getDay();
  const firstDayIndex = (rawFirstDayIndex + 6) % 7;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const isToday = (dayNum: number) =>
    dayNum === today.getDate() &&
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

function JewishCalendar({
  currentDate,
  setCurrentDate,
}: {
  currentDate: { year: number; monthName: JewishMonthName; day: number };
  setCurrentDate: (val: { year: number; monthName: JewishMonthName }) => void;
}) {
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);

  const todayGregorian = new Date();
  const jewishToday = toJewishDate(todayGregorian);

  const leapYear = isJewishLeapYear(currentDate.year);
  const months = leapYear ? jewishMonthsLeap : jewishMonthsNonLeap;
  const monthsRu = leapYear ? jewishMonthsLeapRu : jewishMonthsNonLeapRu;
  const currentMonthIdx = months.findIndex((m) => m === currentDate.monthName);

  const generateMonth = useCallback(() => {
    const days: number[] = [];
    const monthEnum =
      JewishMonth[
        months[currentMonthIdx].replace(" ", "") as keyof typeof JewishMonth
      ];

    const firstGregorianDate = toGregorianDate({
      year: currentDate.year,
      monthName: monthEnum,
      day: 1,
    });

    const currentGregorianDate = new Date(firstGregorianDate);
    let jd = toJewishDate(currentGregorianDate);

    const rawFirstDayIndex = currentGregorianDate.getDay();
    const firstDay = (rawFirstDayIndex + 6) % 7;
    setFirstDayOfWeek(firstDay);

    while (jd.monthName === months[currentMonthIdx]) {
      days.push(jd.day);
      currentGregorianDate.setDate(currentGregorianDate.getDate() + 1);
      jd = toJewishDate(currentGregorianDate);
    }

    setDaysInMonth(days);
  }, [currentDate.year, currentMonthIdx, months]);

  const prevMonth = () => {
    let newMonthIdx = currentMonthIdx - 1;
    let newYear = currentDate.year;

    if (newMonthIdx < 0) {
      newYear -= 1;
      const leap = isJewishLeapYear(newYear);
      newMonthIdx =
        (leap ? jewishMonthsLeap.length : jewishMonthsNonLeap.length) - 1;
    }

    setCurrentDate({
      year: newYear,
      monthName: (isJewishLeapYear(newYear)
        ? jewishMonthsLeap
        : jewishMonthsNonLeap)[newMonthIdx],
    });
  };

  const nextMonth = () => {
    let newMonthIdx = currentMonthIdx + 1;
    let newYear = currentDate.year;

    const leap = isJewishLeapYear(newYear);
    const monthCount = leap
      ? jewishMonthsLeap.length
      : jewishMonthsNonLeap.length;

    if (newMonthIdx >= monthCount) {
      newYear += 1;
      newMonthIdx = 0;
    }

    setCurrentDate({
      year: newYear,
      monthName: (isJewishLeapYear(newYear)
        ? jewishMonthsLeap
        : jewishMonthsNonLeap)[newMonthIdx],
    });
  };

  const isToday = (dayNum: number) => {
    const todayMonthName = jewishToday.monthName;
    const currentMonthName = months[currentMonthIdx];

    const isAdarMatch =
      (todayMonthName.includes("Adar") && currentMonthName.includes("Adar")) ||
      todayMonthName === currentMonthName;

    return (
      dayNum === jewishToday.day &&
      isAdarMatch &&
      currentDate.year === jewishToday.year
    );
  };

  useEffect(() => {
    generateMonth();
  }, [currentDate.year, currentMonthIdx, generateMonth]);

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
            className={`flex h-12 items-center justify-center rounded-md border ${
              isToday(dayNum) ? "bg-brown-dark font-bold text-white" : ""
            }`}
          >
            {dayNum}
          </div>
        ))}
      </div>
    </div>
  );
}

function syncJewishToGregorianByMajority(
  year: number,
  monthName: JewishMonthName,
): Date {
  const monthEnum =
    JewishMonth[monthName.replace(" ", "") as keyof typeof JewishMonth];

  if (!monthEnum) {
    console.error(`❌ Місяць ${monthName} не знайдено в JewishMonth`);
    return new Date();
  }

  const startGregorian = toGregorianDate({
    year,
    monthName: monthEnum,
    day: 1,
  });

  const days: { [monthIndex: number]: number } = {};

  const currentGregorianDate = new Date(startGregorian);
  let jd = toJewishDate(currentGregorianDate);

  while (
    jd.monthName === monthName ||
    (monthName.includes("Adar") && jd.monthName.includes("Adar"))
  ) {
    const monthIndex = currentGregorianDate.getMonth();
    days[monthIndex] = (days[monthIndex] || 0) + 1;

    currentGregorianDate.setDate(currentGregorianDate.getDate() + 1);
    jd = toJewishDate(currentGregorianDate);
  }

  const majorityMonthIndex = Object.keys(days).reduce((a, b) =>
    days[parseInt(a)] > days[parseInt(b)] ? a : b,
  );

  return new Date(
    currentGregorianDate.getFullYear(),
    parseInt(majorityMonthIndex),
    1,
  );
}
