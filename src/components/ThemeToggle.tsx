"use client";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const dark = root.classList.contains("dark")
      ? true
      : root.classList.contains("light")
        ? false
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.remove("dark", "light");
    root.classList.add(dark ? "light" : "dark");
    try {
      localStorage.setItem("theme", dark ? "light" : "dark");
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="rounded-md border border-border px-2 py-1 text-sm text-muted hover:text-foreground"
    >
      ◐
    </button>
  );
}
