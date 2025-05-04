import { Link } from "react-router-dom";

import { translateHolidayTitle } from "../utils/calendar-utils/translate";
import { parashatLinks } from "../utils/parashatLinks";

import { Card, CardContent } from "@/components/ui/card";
import { useHolidayStore } from "@/store/use-holiday-store";

export default function HolidayCard() {
  const { selectedHoliday } = useHolidayStore();

  if (selectedHoliday.length === 0) {
    return null;
  }

  return (
    <Card
      className="w-full max-w-lg bg-white"
      role="region"
      aria-labelledby="holiday-card-heading"
    >
      <CardContent className="p-4">
        <h2 id="holiday-card-heading" className="sr-only">
          Список праздников
        </h2>
        <ul aria-label="Список праздников" className="space-y-4">
          {selectedHoliday.map((holiday) => {
            const link = parashatLinks[holiday.title];

            return (
              <li
                key={holiday.title}
                className="border-b pb-2 last:border-b-0 last:pb-0"
              >
                {link ? (
                  <h3 className="text-lg font-bold">
                    <Link
                      to={link}
                      className="text-blue-600"
                      aria-label={`Открыть главу книги: ${translateHolidayTitle(holiday.title)}`}
                    >
                      {translateHolidayTitle(holiday.title)}
                    </Link>
                  </h3>
                ) : (
                  <h3 className="text-lg font-bold">
                    {translateHolidayTitle(holiday.title)}
                  </h3>
                )}

                {holiday.hebrew && (
                  <p
                    lang="he"
                    dir="rtl"
                    className="text-muted-foreground text-md text-right"
                  >
                    {holiday.hebrew}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
