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
  const leap = (7 * year + 1) % 19 < 7;
  // console.log(`🗓️ Перевірка високосного року (${year}):`, leap);
  return leap;
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
    // console.log("🔄 syncGregorianToJewish ->", jewish);
    setJewishDate({
      year: jewish.year,
      monthName: jewish.monthName as JewishMonthName,
      day: jewish.day,
    });
  };

  const syncJewishToGregorian = (year: number, monthName: JewishMonthName) => {
    // console.log("🔄 syncJewishToGregorian ->", { year, monthName });
    const majorityGregorianDate = syncJewishToGregorianByMajority(
      year,
      monthName,
    );
    // console.log("📅 majorityGregorianDate ->", majorityGregorianDate);
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
              // console.log("👉 GregorianDate changed:", date);
              setGregorianDate(date);
              syncGregorianToJewish(date);
            }}
          />
        </TabsContent>

        <TabsContent value="jewish">
          <JewishCalendar
            currentDate={jewishDate}
            setCurrentDate={({ year, monthName }) => {
              // console.log("👉 JewishDate changed:", { year, monthName });
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

  // console.log(`📅 JewishCalendar currentDate:`, currentDate);
  // console.log(`📅 leapYear:`, leapYear);
  // console.log(`📅 currentMonthIdx:`, currentMonthIdx);

  const generateMonth = useCallback(() => {
    // console.log("🚀 generateMonth() запущено");
    // console.log(
    //   `🔎 Юдейський рік: ${currentDate.year}, Місяць: ${currentDate.monthName}`,
    // );

    const days: number[] = [];

    const normalizedMonthName = months[currentMonthIdx].replace(" ", "");
    const monthEnum =
      JewishMonth[normalizedMonthName as keyof typeof JewishMonth];

    // console.log(`📌 monthEnum:`, monthEnum);

    const firstGregorianDate = toGregorianDate({
      year: currentDate.year,
      monthName: monthEnum,
      day: 1,
    });
    // console.log(`🗓️ firstGregorianDate:`, firstGregorianDate);

    const currentGregorianDate = new Date(firstGregorianDate);
    let jd = toJewishDate(currentGregorianDate);

    const rawFirstDayIndex = currentGregorianDate.getDay();
    const firstDay = (rawFirstDayIndex + 6) % 7;
    // console.log(`📍 First day of the week (0=Пн):`, firstDay);
    setFirstDayOfWeek(firstDay);

    let iterations = 0;

    while (jd.monthName === normalizedMonthName) {
      // console.log(`➡️ Adding day: ${jd.day}, jd.monthName: ${jd.monthName}`);
      days.push(jd.day);

      currentGregorianDate.setDate(currentGregorianDate.getDate() + 1);
      jd = toJewishDate(currentGregorianDate);

      iterations++;
      if (iterations > 60) {
        // console.warn("⚠️ break: potential infinite loop");
        break;
      }
    }

    // console.log(`✅ Generated days:`, days);
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

    const newMonthName = (
      isJewishLeapYear(newYear) ? jewishMonthsLeap : jewishMonthsNonLeap
    )[newMonthIdx];

    // console.log("⬅️ prevMonth() ->", {
    //   year: newYear,
    //   monthName: newMonthName,
    // });

    setCurrentDate({
      year: newYear,
      monthName: newMonthName,
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

    const newMonthName = (
      isJewishLeapYear(newYear) ? jewishMonthsLeap : jewishMonthsNonLeap
    )[newMonthIdx];

    // console.log("➡️ nextMonth() ->", {
    //   year: newYear,
    //   monthName: newMonthName,
    // });

    setCurrentDate({
      year: newYear,
      monthName: newMonthName,
    });
  };

  const isToday = (dayNum: number) => {
    const todayMonthName = jewishToday.monthName;
    const currentMonthName = months[currentMonthIdx];

    const isAdarMatch =
      (todayMonthName.includes("Adar") && currentMonthName.includes("Adar")) ||
      todayMonthName === currentMonthName;

    const isTodayResult =
      dayNum === jewishToday.day &&
      isAdarMatch &&
      currentDate.year === jewishToday.year;

    // if (isTodayResult) {
    //   console.log(`🎉 Сьогодні: ${dayNum}`);
    // }

    return isTodayResult;
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
  // console.log("🔁 syncJewishToGregorianByMajority", { year, monthName });

  const normalizedMonthName = monthName.replace(" ", "");

  const monthEnum =
    JewishMonth[normalizedMonthName as keyof typeof JewishMonth];

  // if (!monthEnum) {
  //   console.error(`❌ Місяць ${monthName} не знайдено в JewishMonth`);
  //   return new Date();
  // }

  const startGregorian = toGregorianDate({
    year,
    monthName: monthEnum,
    day: 1,
  });
  // console.log("🔹 Стартова григоріанська дата:", startGregorian);

  const days: { [monthIndex: number]: number } = {};
  const currentGregorianDate = new Date(startGregorian);
  let jd = toJewishDate(currentGregorianDate);

  let iterations = 0;

  while (
    jd.monthName === normalizedMonthName ||
    (normalizedMonthName.includes("Adar") && jd.monthName.includes("Adar"))
  ) {
    const monthIndex = currentGregorianDate.getMonth();
    days[monthIndex] = (days[monthIndex] || 0) + 1;

    currentGregorianDate.setDate(currentGregorianDate.getDate() + 1);
    jd = toJewishDate(currentGregorianDate);

    iterations++;
    if (iterations > 60) {
      console.warn("⚠️ break: potential infinite loop");
      break;
    }
  }

  // console.log("📊 Дні по місяцях:", days);

  const majorityMonthIndex = Object.keys(days).reduce((a, b) =>
    days[parseInt(a)] > days[parseInt(b)] ? a : b,
  );

  const resultDate = new Date(
    currentGregorianDate.getFullYear(),
    parseInt(majorityMonthIndex),
    1,
  );

  // console.log("✅ majority result date:", resultDate);

  return resultDate;
}
