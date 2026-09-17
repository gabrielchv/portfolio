"use client";

function isDark(root: HTMLElement) {
  if (root.classList.contains("dark")) return true;
  if (root.classList.contains("light")) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const dark = isDark(root);
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
