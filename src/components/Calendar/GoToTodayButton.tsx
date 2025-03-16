import { toJewishDate } from "jewish-date";

import { gregorianMonthNames } from "./constants";

interface GoToTodayButtonProps {
  calendarType: "gregorian" | "jewish";
  onClick: () => void;
}

export default function GoToTodayButton({
  calendarType,
  onClick,
}: GoToTodayButtonProps) {
  const today = new Date();
  const todayJewish = toJewishDate(today);

  const formatTodayText = () => {
    if (calendarType === "gregorian") {
      return `Сегодня ${today.getDate()} ${gregorianMonthNames[today.getMonth()]} ${today.getFullYear()} - ${todayJewish.day} ${todayJewish.monthName} ${todayJewish.year}`;
    }

    return `Сегодня ${todayJewish.day} ${todayJewish.monthName} ${todayJewish.year} - ${today.getDate()} ${gregorianMonthNames[today.getMonth()]} ${today.getFullYear()}`;
  };

  return (
    <button
      onClick={onClick}
      className="text-md text-text hover:underline sm:text-lg"
    >
      {formatTodayText()}
    </button>
  );
}
