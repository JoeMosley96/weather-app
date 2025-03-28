import { useEffect } from "react";

export default function Error({
  error,

}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mt-20 flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <h3 className="text-center">
        {error.message}
        {error.digest ? ` (${error.digest})` : ""}
      </h3>
    </main>
  );
}
