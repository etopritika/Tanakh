import { Link } from "react-router-dom";

import { translateHolidayTitle } from "./utils/calendar-utils";
import { parashatLinks } from "./utils/parashatLinks";

import { Card, CardContent } from "@/components/ui/card";
import { useHolidayStore } from "@/store/use-holiday-store";

export default function HolidayCard() {
  const { selectedHoliday } = useHolidayStore();

  if (selectedHoliday.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-lg bg-white">
      <CardContent className="space-y-3 pt-6">
        <ul role="list" aria-label="Список свят" className="space-y-4">
          {selectedHoliday.map((holiday) => {
            const link = parashatLinks[holiday.title];

            return (
              <li
                key={holiday.title}
                className="border-b pb-2 last:border-b-0 last:pb-0"
              >
                {link ? (
                  <h3 className="text-lg font-bold">
                    <Link to={link} className="text-blue-600">
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
                    className="text-muted-foreground text-md"
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
