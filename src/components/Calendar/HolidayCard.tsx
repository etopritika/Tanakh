import { translateHolidayTitle } from "./calendar-utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHolidayStore } from "@/store/use-holiday-store";

export default function HolidayCard() {
  const { selectedHoliday } = useHolidayStore();

  if (selectedHoliday.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-lg bg-white">
      <CardHeader>
        <CardTitle>Праздники на выбранную дату</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {selectedHoliday.map((holiday) => (
          <div
            key={holiday.title}
            className="border-b pb-2 last:border-b-0 last:pb-0"
          >
            <p className="font-medium">
              {translateHolidayTitle(holiday.title)}
            </p>

            {holiday.hebrew && (
              <p lang="he" dir="rtl" className="text-muted-foreground text-sm">
                {holiday.hebrew}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
