import { useEffect, useState } from "react";

import GregorianCalendar from "./GregorianCalendar";
import JewishCalendar from "./JewishCalendar";
import ShabbatTimes from "./ShabbatTimes";
import YearPicker from "./YearPicker";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { fetchAndStoreHolidays } from "@/lib/api/fetchHolidays";

export default function UniversalCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const year = selectedDate.getFullYear();

  useEffect(() => {
    fetchAndStoreHolidays(year).catch((error) =>
      toast({
        title: "Ошибка загрузки даных",
        description:
          error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "destructive",
      }),
    );
  }, [year]);

  return (
    <div className="h-full space-y-4 p-4 pb-10 sm:pb-4">
      <Tabs defaultValue="gregorian" className="flex h-full flex-col">
        <header>
          <nav aria-label="Calendar type navigation" className="space-y-2">
            <TabsList className="grid w-full grid-cols-3 bg-brown-light text-white">
              <TabsTrigger value="gregorian">Григорианский</TabsTrigger>
              <TabsTrigger value="jewish">Иудейский</TabsTrigger>
              <TabsTrigger value="shabbat">Шаббат</TabsTrigger>
            </TabsList>
            <YearPicker
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </nav>
        </header>

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
        <TabsContent value="shabbat" className="flex-1">
          <ShabbatTimes />
        </TabsContent>
      </Tabs>
    </div>
  );
}
