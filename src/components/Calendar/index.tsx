import { toJewishDate, toGregorianDate, JewishMonth } from "jewish-date";
import { useState, useEffect, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthNamesNonLeap = [
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

const monthNamesLeap = [
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

export default function UniversalCalendar() {
  return (
    <div className="space-y-4 p-4">
      <Tabs defaultValue="gregorian">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gregorian">Gregorian</TabsTrigger>
          <TabsTrigger value="jewish">Jewish</TabsTrigger>
        </TabsList>

        <TabsContent value="gregorian">
          <GregorianCalendar />
        </TabsContent>

        <TabsContent value="jewish">
          <JewishCalendar />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GregorianCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const isToday = (dayNum: number) => {
    return (
      dayNum === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button onClick={prevMonth}>Prev</Button>
        <div className="text-lg font-semibold">
          {monthNames[month]} {year}
        </div>
        <Button onClick={nextMonth}>Next</Button>
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
              className={`flex h-12 items-center justify-center rounded-md border ${isToday(idx + 1) ? "bg-brown-dark font-bold text-white" : ""}`}
            >
              {idx + 1}
            </div>
          ))}
      </div>
    </div>
  );
}

function isJewishLeapYear(year: number): boolean {
  return (7 * year + 1) % 19 < 7;
}

function JewishCalendar() {
  const todayGregorian = new Date();
  const jewishToday = toJewishDate(todayGregorian);
  console.log("JewishMonth", JewishMonth);

  const [currentYear, setCurrentYear] = useState<number>(jewishToday.year);
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(
    getMonthIndex(jewishToday),
  );
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);

  const leapYear = isJewishLeapYear(currentYear);
  const months = leapYear ? monthNamesLeap : monthNamesNonLeap;

  function getMonthIndex(jewishDate: { monthName: string; year: number }) {
    const monthsList = isJewishLeapYear(jewishDate.year)
      ? monthNamesLeap
      : monthNamesNonLeap;
    return monthsList.findIndex((m) => m === jewishDate.monthName);
  }

  const generateMonth = useCallback(
    (year: number, monthIdx: number) => {
      const days: number[] = [];
      const monthName = months[monthIdx];

      console.log("📌 Поточний місяць:", monthName);

      const monthEnum =
        JewishMonth[monthName.replace(" ", "") as keyof typeof JewishMonth];

      if (monthEnum === undefined) {
        console.error(`❌ Місяць ${monthName} не знайдено в JewishMonth`);
        return;
      }

      const firstGregorianDate = toGregorianDate({
        year,
        monthName: monthEnum,
        day: 1,
      });

      const currentGregorianDate = new Date(firstGregorianDate);
      let jd = toJewishDate(currentGregorianDate);

      const firstDay = currentGregorianDate.getDay();
      setFirstDayOfWeek(firstDay);

      console.log("🔵 Стартова дата:", jd);

      while (jd.monthName === monthName) {
        days.push(jd.day);
        currentGregorianDate.setDate(currentGregorianDate.getDate() + 1);
        jd = toJewishDate(currentGregorianDate);
      }

      console.log("✅ Дні місяця:", days);

      setDaysInMonth(days);
    },
    [months],
  );

  const prevMonth = () => {
    let newMonthIdx = currentMonthIdx - 1;
    let newYear = currentYear;

    if (newMonthIdx < 0) {
      newYear -= 1;
      const leap = isJewishLeapYear(newYear);
      newMonthIdx =
        (leap ? monthNamesLeap.length : monthNamesNonLeap.length) - 1;
    }

    setCurrentMonthIdx(newMonthIdx);
    setCurrentYear(newYear);
  };

  const nextMonth = () => {
    let newMonthIdx = currentMonthIdx + 1;
    let newYear = currentYear;

    const leap = isJewishLeapYear(newYear);
    const monthCount = leap ? monthNamesLeap.length : monthNamesNonLeap.length;

    if (newMonthIdx >= monthCount) {
      newYear += 1;
      newMonthIdx = 0;
    }

    setCurrentMonthIdx(newMonthIdx);
    setCurrentYear(newYear);
  };

  const isToday = (dayNum: number) => {
    return (
      dayNum === jewishToday.day &&
      months[currentMonthIdx] === jewishToday.monthName &&
      currentYear === jewishToday.year
    );
  };

  useEffect(() => {
    console.log("🟣 useEffect:", { currentYear, currentMonthIdx });
    generateMonth(currentYear, currentMonthIdx);
  }, [currentYear, currentMonthIdx, generateMonth]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button onClick={prevMonth}>Prev</Button>
        <div className="text-lg font-semibold">
          {months[currentMonthIdx]} {currentYear}
        </div>
        <Button onClick={nextMonth}>Next</Button>
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
            className={`flex h-12 items-center justify-center rounded-md border ${isToday(dayNum) ? "bg-brown-dark font-bold text-white" : ""}`}
          >
            {dayNum}
          </div>
        ))}
      </div>
    </div>
  );
}
