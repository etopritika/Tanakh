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
        {selectedHoliday.map((holiday, idx) => (
          <div key={idx} className="border-b pb-2 last:border-b-0 last:pb-0">
            <p className="font-medium">{holiday.title}</p>

            {holiday.hebrew && (
              <p lang="he" dir="rtl" className="text-muted-foreground text-sm">
                {holiday.hebrew}
              </p>
            )}

            {holiday.memo && (
              <p className="mt-1 text-xs text-gray-500">{holiday.memo}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
