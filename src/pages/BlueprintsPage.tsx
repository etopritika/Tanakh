export default function BlueprintsPage() {
  return (
    <section className="h-full py-6" aria-labelledby="blueprints-title">
      <h1 id="blueprints-title" className="sr-only">
        Страница чертежей
      </h1>
      <embed
        src={`${import.meta.env.BASE_URL}sanctuary.pdf`}
        className="h-full w-full border-none"
        type="application/pdf"
        title="Схема святилища в формате PDF"
      />
    </section>
  );
}
