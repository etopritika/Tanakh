export default function BlueprintsPage() {
  return (
    <section className="h-full py-6">
      <h1 className="sr-only">Blueprints Page</h1>
      <iframe
        src="/blueprints/sanctuary.pdf?cache-buster={Date.now()}"
        className="h-full w-full border-none"
        title="Blueprint Viewer"
      />
    </section>
  );
}
