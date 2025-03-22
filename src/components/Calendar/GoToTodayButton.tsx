import { toJewishDate } from "jewish-date";

import { gregorianMonthNames } from "./constants";

interface GoToTodayButtonProps {
  onClick: () => void;
}

export default function GoToTodayButton({ onClick }: GoToTodayButtonProps) {
  const today = new Date();
  const todayJewish = toJewishDate(today);

  return (
    <button onClick={onClick} className="text-lg text-blue-600 sm:text-lg">
      Сегодня{" "}
      <span className="whitespace-nowrap">
        {today.getDate()} {gregorianMonthNames[today.getMonth()]}{" "}
        {today.getFullYear()}
      </span>{" "}
      -{" "}
      <span className="whitespace-nowrap">
        {todayJewish.day} {todayJewish.monthName} {todayJewish.year}
      </span>
    </button>
  );
}
