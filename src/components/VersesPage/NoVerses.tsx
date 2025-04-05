type NoVersesProps = {
  error: string | null;
};

export function NoVerses({ error }: NoVersesProps) {
  return (
    <section className="flex h-full items-center justify-center py-6">
      <strong className="text-danger">{error}</strong>
    </section>
  );
}
