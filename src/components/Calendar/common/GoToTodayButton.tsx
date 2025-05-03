import { toJewishDate } from "jewish-date";

import { gregorianMonthNames } from "../utils/constants";

interface GoToTodayButtonProps {
  onClick: () => void;
}

export default function GoToTodayButton({ onClick }: GoToTodayButtonProps) {
  const today = new Date();
  const todayJewish = toJewishDate(today);

  const gregorianLabel = `${today.getDate()} ${gregorianMonthNames[today.getMonth()]} ${today.getFullYear()}`;
  const jewishLabel = `${todayJewish.day} ${todayJewish.monthName} ${todayJewish.year}`;

  return (
    <button
      onClick={onClick}
      className="text-md text-start text-blue-600 focus:outline focus:outline-2 focus:outline-black md:text-sm"
      aria-label={`Перейти к сегодняшней дате: ${gregorianLabel}, ${jewishLabel}`}
    >
      Сегодня{" "}
      <time
        dateTime={today.toISOString().split("T")[0]}
        className="whitespace-nowrap"
      >
        {gregorianLabel}
      </time>{" "}
      - <span className="whitespace-nowrap">{jewishLabel}</span>
    </button>
  );
}
