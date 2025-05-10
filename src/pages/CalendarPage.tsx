import UniversalCalendar from "@/components/Calendar";

export default function CalendarPage() {
  return (
    <section className="h-full" aria-labelledby="calendar-heading">
      <h1 id="calendar-heading" className="sr-only">
        Страница календаря
      </h1>
      <UniversalCalendar />
    </section>
  );
}
