import { useState } from "react";

export default function BlueprintsPage() {
  const [hasError, setHasError] = useState(false);

  const handleIframeError = () => {
    setHasError(true);
  };

  return (
    <section className="h-full py-6">
      <h1 className="sr-only">Blueprints Page</h1>
      {hasError ? (
        <div className="flex h-full items-center justify-center text-center text-red-600">
          <p>
            Невозможно загрузить файл. Проверьте наличие файла или повторите
            попытку.
          </p>
        </div>
      ) : (
        <iframe
          src="/blueprints/sanctuary.pdf"
          className="h-full w-full border-none"
          title="Blueprint Viewer"
          onError={handleIframeError}
        />
      )}
    </section>
  );
}
