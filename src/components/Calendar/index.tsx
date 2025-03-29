import { useEffect, useState } from "react";

import YearPicker from "./common/YearPicker";
import GregorianCalendar from "./GregorianCalendar/GregorianCalendar";
import JewishCalendar from "./JewishCalendar/JewishCalendar";
import ShabbatTimes from "./ShabbatTimes";

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
              <TabsTrigger
                value="gregorian"
                className="flex w-full items-center justify-center"
                title="Григорианский"
              >
                <span className="block max-w-full truncate whitespace-nowrap">
                  Григорианский
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="jewish"
                className="flex w-full items-center justify-center"
                title="Иудейский"
              >
                <span className="block max-w-full truncate whitespace-nowrap">
                  Иудейский
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="shabbat"
                className="flex w-full items-center justify-center"
                title="Шаббат"
              >
                <span className="block max-w-full truncate whitespace-nowrap">
                  Шаббат
                </span>
              </TabsTrigger>
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
