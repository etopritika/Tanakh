import { translateHolidayTitle } from "./utils/calendar-utils";

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
        {selectedHoliday.map((holiday) => (
          <div
            key={holiday.title}
            className="border-b pb-2 last:border-b-0 last:pb-0"
          >
            <p className="text-lg font-bold">
              {translateHolidayTitle(holiday.title)}
            </p>

            {holiday.hebrew && (
              <p lang="he" dir="rtl" className="text-muted-foreground text-md">
                {holiday.hebrew}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
