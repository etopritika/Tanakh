export default function BlueprintsPage() {
  return (
    <section className="h-full py-6">
      <h1 className="sr-only">Blueprints Page</h1>
      <iframe
        src={`${import.meta.env.BASE_URL}sanctuary.pdf`}
        className="h-full w-full border-none"
        title="Blueprint Viewer"
      />
    </section>
  );
}
