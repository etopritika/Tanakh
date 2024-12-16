import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Sidebar() {
  return (
    <>
      <aside className="hidden md:block md:w-64 h-full p-4 shadow-lg rounded-lg bg-white">
        <nav className="rounded-lg p-2">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Танах</AccordionTrigger>
              <AccordionContent>Берешит</AccordionContent>
              <AccordionContent>Шмот</AccordionContent>
              <AccordionContent>Ваикра</AccordionContent>
              <AccordionContent>Бемидбар</AccordionContent>
              <AccordionContent>Дварим</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Невиим</AccordionTrigger>
              <AccordionContent>Йешуа</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Ктувим</AccordionTrigger>
              <AccordionContent>Тегилим</AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <button
            aria-label="Toggle Sidebar"
            className="p-2 md:hidden h-10 w-10"
          >
            <Menu size={24} />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-4 bg-white">
          <nav className="rounded-lg p-2">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Танах</AccordionTrigger>
                <AccordionContent>Берешит</AccordionContent>
                <AccordionContent>Шмот</AccordionContent>
                <AccordionContent>Ваикра</AccordionContent>
                <AccordionContent>Бемидбар</AccordionContent>
                <AccordionContent>Дварим</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Невиим</AccordionTrigger>
                <AccordionContent>Йешуа</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Ктувим</AccordionTrigger>
                <AccordionContent>Тегілім</AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
