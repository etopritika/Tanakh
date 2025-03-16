import { useState } from "react";

import DatePicker from "./DatePicker";
import GregorianCalendar from "./GregorianCalendar";
import JewishCalendar from "./JewishCalendar";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function UniversalCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

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
            <DatePicker
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
    </div>
  );
}
