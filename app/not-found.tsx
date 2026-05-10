import Link from "next/link";

export default function NotFound() {
  return (
    <div className="theme-shop mode-light min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--color-bg)] px-6 text-center text-[var(--color-fg)]">
      <h1 className="font-serif text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-md text-sm text-[var(--color-muted)]">
        The page you are looking for does not exist or was moved.
      </p>
      <Link
        href="/"
        className="rounded-full border border-[var(--color-border)] px-5 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]"
      >
        Back to shop
      </Link>
    </div>
  );
}
