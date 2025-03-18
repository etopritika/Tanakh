import { useEffect, useState } from "react";

import GregorianCalendar from "./GregorianCalendar";
import HolidayCard from "./HolidayCard";
import JewishCalendar from "./JewishCalendar";
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
        description: error,
        variant: "destructive",
      }),
    );
  }, [year]);

  return (
    <div className="space-y-4 p-4">
      <Tabs defaultValue="gregorian">
        <header>
          <nav aria-label="Calendar type navigation" className="space-y-2">
            <TabsList className="grid w-full grid-cols-2 bg-brown-light text-white">
              <TabsTrigger value="gregorian" className="">
                Григорианский
              </TabsTrigger>
              <TabsTrigger value="jewish" className="">
                Иудейский
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
      </Tabs>
      <HolidayCard />
    </div>
  );
}
