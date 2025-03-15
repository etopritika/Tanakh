// import { toJewishDate, toGregorianDate, JewishMonth } from "jewish-date";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// import { gregorianMonthNames, weekDays } from "./constants";
import GregorianCalendar from "./GregorianCalendar";
import JewishCalendar from "./JewishCalendar";
// import {
//   getGregorianMonthData,
//   getJewishMonthData,
//   getMonthsByLeapYear,
//   isSameMonth,
//   normalizeMonth,
// } from "./utils";

// import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// =================== CONSTANTS ===================
// type JewishMonthName =
//   | "Tishri"
//   | "Cheshvan"
//   | "Kislev"
//   | "Tevet"
//   | "Shevat"
//   | "Adar"
//   | "Adar I"
//   | "Adar II"
//   | "Nisan"
//   | "Iyyar"
//   | "Sivan"
//   | "Tammuz"
//   | "Av"
//   | "Elul";

// const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// const gregorianMonthNames = [
//   "Январь",
//   "Февраль",
//   "Март",
//   "Апрель",
//   "Май",
//   "Июнь",
//   "Июль",
//   "Август",
//   "Сентябрь",
//   "Октябрь",
//   "Ноябрь",
//   "Декабрь",
// ];

// const jewishMonthsNonLeapRu = [
//   "Тишрей",
//   "Хешван",
//   "Кислев",
//   "Тевет",
//   "Шват",
//   "Адар",
//   "Нисан",
//   "Ияр",
//   "Сиван",
//   "Таммуз",
//   "Ав",
//   "Элул",
// ];

// const jewishMonthsLeapRu = [
//   "Тишрей",
//   "Хешван",
//   "Кислев",
//   "Тевет",
//   "Шват",
//   "Адар I",
//   "Адар II",
//   "Нисан",
//   "Ияр",
//   "Сиван",
//   "Таммуз",
//   "Ав",
//   "Элул",
// ];

// =================== UTILS ===================
// const isJewishLeapYear = (year: number) => (7 * year + 1) % 19 < 7;
// const normalizeMonth = (name: string) => name.replace(/\s+/g, "");
// const isSameMonth = (a: string, b: string) =>
//   normalizeMonth(a) === normalizeMonth(b);

// const getMonthsByLeapYear = (year: number): JewishMonthName[] =>
//   isJewishLeapYear(year)
//     ? [
//         "Tishri",
//         "Cheshvan",
//         "Kislev",
//         "Tevet",
//         "Shevat",
//         "Adar I",
//         "Adar II",
//         "Nisan",
//         "Iyyar",
//         "Sivan",
//         "Tammuz",
//         "Av",
//         "Elul",
//       ]
//     : [
//         "Tishri",
//         "Cheshvan",
//         "Kislev",
//         "Tevet",
//         "Shevat",
//         "Adar",
//         "Nisan",
//         "Iyyar",
//         "Sivan",
//         "Tammuz",
//         "Av",
//         "Elul",
//       ];

// const getMonthsRuByLeapYear = (year: number) =>
//   isJewishLeapYear(year) ? jewishMonthsLeapRu : jewishMonthsNonLeapRu;

// // =================== CALENDAR DATA FUNCTIONS ===================
// function getGregorianMonthData(selectedDate: Date) {
//   const year = selectedDate.getFullYear();
//   const month = selectedDate.getMonth();

//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

//   return { year, month, daysInMonth, firstDayIndex };
// }

// function getJewishMonthData(selectedDate: Date) {
//   const jewishDate = toJewishDate(selectedDate);
//   const months = getMonthsByLeapYear(jewishDate.year);
//   const monthsRu = getMonthsRuByLeapYear(jewishDate.year);
//   const currentMonthIdx = months.findIndex((m) =>
//     isSameMonth(m, jewishDate.monthName),
//   );

//   const monthEnum =
//     JewishMonth[
//       normalizeMonth(months[currentMonthIdx]) as keyof typeof JewishMonth
//     ];

//   const firstGregorianDate = toGregorianDate({
//     year: jewishDate.year,
//     monthName: monthEnum,
//     day: 1,
//   });

//   const days: number[] = [];
//   const date = new Date(firstGregorianDate);

//   for (let i = 0; i < 32; i++) {
//     const jd = toJewishDate(date);
//     if (!isSameMonth(jd.monthName, months[currentMonthIdx])) break;

//     days.push(jd.day);
//     date.setDate(date.getDate() + 1);
//   }

//   const rawFirstDay = new Date(firstGregorianDate).getDay();
//   const firstDayOfWeek = (rawFirstDay + 6) % 7;

//   return {
//     year: jewishDate.year,
//     monthName: months[currentMonthIdx],
//     monthNameRu: monthsRu[currentMonthIdx],
//     days,
//     firstDayOfWeek,
//     selectedDay: jewishDate.day,
//   };
// }

// =================== MAIN COMPONENT ===================
export default function UniversalCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-4 p-4">
      <Tabs defaultValue="gregorian">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gregorian">Григорианский</TabsTrigger>
          <TabsTrigger value="jewish">Иудейский</TabsTrigger>
        </TabsList>

        <TabsContent value="gregorian">
          <GregorianCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </TabsContent>

        <TabsContent value="jewish">
          <JewishCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// =================== GREGORIAN CALENDAR ===================
// function GregorianCalendar({
//   selectedDate,
//   onDateSelect,
// }: {
//   selectedDate: Date;
//   onDateSelect: (date: Date) => void;
// }) {
//   const today = new Date();
//   const { year, month, daysInMonth, firstDayIndex } =
//     getGregorianMonthData(selectedDate);

//   const prevMonth = () => onDateSelect(new Date(year, month - 1, 1));
//   const nextMonth = () => onDateSelect(new Date(year, month + 1, 1));

//   const isToday = (day: number) =>
//     day === today.getDate() &&
//     month === today.getMonth() &&
//     year === today.getFullYear();

//   const isSelected = (day: number) =>
//     day === selectedDate.getDate() &&
//     month === selectedDate.getMonth() &&
//     year === selectedDate.getFullYear();

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <Button onClick={prevMonth}>
//           <ChevronLeft />
//         </Button>
//         <div className="text-lg font-semibold">
//           {gregorianMonthNames[month]} {year}
//         </div>
//         <Button onClick={nextMonth}>
//           <ChevronRight />
//         </Button>
//       </div>

//       <div className="grid grid-cols-7 gap-1">
//         {weekDays.map((day, idx) => (
//           <div key={idx} className="text-center font-medium">
//             {day}
//           </div>
//         ))}

//         {Array(firstDayIndex)
//           .fill(null)
//           .map((_, idx) => (
//             <div key={`empty-${idx}`} />
//           ))}

//         {Array(daysInMonth)
//           .fill(null)
//           .map((_, idx) => {
//             const dayNum = idx + 1;
//             const classes = [
//               "flex h-12 items-center justify-center rounded-md border cursor-pointer",
//               isSelected(dayNum) ? "bg-brown-dark text-white font-bold" : "",
//               isToday(dayNum)
//                 ? "underline font-bold text-lg bg-brown-light text-white"
//                 : "",
//             ].join(" ");

//             return (
//               <div
//                 key={idx}
//                 onClick={() => onDateSelect(new Date(year, month, dayNum))}
//                 className={classes}
//               >
//                 {dayNum}
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// }

// =================== JEWISH CALENDAR ===================
// function JewishCalendar({
//   selectedDate,
//   onDateSelect,
// }: {
//   selectedDate: Date;
//   onDateSelect: (date: Date) => void;
// }) {
//   const todayJewish = toJewishDate(new Date());
//   const { year, monthName, monthNameRu, days, firstDayOfWeek, selectedDay } =
//     getJewishMonthData(selectedDate);

//   const months = getMonthsByLeapYear(year);
//   const currentMonthIdx = months.findIndex((m) => isSameMonth(m, monthName));

//   const prevMonth = () => {
//     let newMonthIdx = currentMonthIdx - 1;
//     let newYear = year;

//     if (newMonthIdx < 0) {
//       newYear--;
//       const prevMonths = getMonthsByLeapYear(newYear);
//       newMonthIdx = prevMonths.length - 1;
//     }

//     const monthEnum =
//       JewishMonth[
//         normalizeMonth(
//           getMonthsByLeapYear(newYear)[newMonthIdx],
//         ) as keyof typeof JewishMonth
//       ];

//     const newGregorianDate = toGregorianDate({
//       year: newYear,
//       monthName: monthEnum,
//       day: 1,
//     });

//     onDateSelect(new Date(newGregorianDate));
//   };

//   const nextMonth = () => {
//     let newMonthIdx = currentMonthIdx + 1;
//     let newYear = year;

//     const monthCount = getMonthsByLeapYear(newYear).length;

//     if (newMonthIdx >= monthCount) {
//       newYear++;
//       newMonthIdx = 0;
//     }

//     const monthEnum =
//       JewishMonth[
//         normalizeMonth(
//           getMonthsByLeapYear(newYear)[newMonthIdx],
//         ) as keyof typeof JewishMonth
//       ];

//     const newGregorianDate = toGregorianDate({
//       year: newYear,
//       monthName: monthEnum,
//       day: 1,
//     });

//     onDateSelect(new Date(newGregorianDate));
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <Button onClick={prevMonth}>
//           <ChevronLeft />
//         </Button>
//         <div className="text-lg font-semibold">
//           {monthNameRu} {year}
//         </div>
//         <Button onClick={nextMonth}>
//           <ChevronRight />
//         </Button>
//       </div>

//       <div className="grid grid-cols-7 gap-1">
//         {weekDays.map((day, idx) => (
//           <div key={idx} className="text-center font-medium">
//             {day}
//           </div>
//         ))}

//         {Array(firstDayOfWeek)
//           .fill(null)
//           .map((_, idx) => (
//             <div key={`empty-${idx}`} />
//           ))}

//         {days.map((dayNum, idx) => {
//           const isTodayJewish =
//             dayNum === todayJewish.day &&
//             isSameMonth(monthName, todayJewish.monthName) &&
//             year === todayJewish.year;

//           const isSelected = dayNum === selectedDay;

//           const monthEnum =
//             JewishMonth[normalizeMonth(monthName) as keyof typeof JewishMonth];
//           const gregDate = toGregorianDate({
//             year,
//             monthName: monthEnum,
//             day: dayNum,
//           });

//           const classes = [
//             "flex h-12 items-center justify-center rounded-md border cursor-pointer",
//             isSelected ? "bg-brown-dark text-white font-bold" : "",
//             isTodayJewish
//               ? "underline font-bold text-lg bg-brown-light text-white"
//               : "",
//           ].join(" ");

//           return (
//             <div
//               key={idx}
//               onClick={() => onDateSelect(new Date(gregDate))}
//               className={classes}
//             >
//               {dayNum}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
