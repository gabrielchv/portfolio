import type { Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import ThemeToggle from "./ThemeToggle";

export default function Header({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="font-semibold tracking-tight">
          Gabriel Chaves
        </a>
        <div className="flex items-center gap-4 text-sm text-muted">
          <a href="#projects" className="hidden hover:text-foreground sm:inline">
            {t.nav.projects}
          </a>
          <a href="#experience" className="hidden hover:text-foreground sm:inline">
            {t.nav.experience}
          </a>
          <a href="#skills" className="hidden hover:text-foreground sm:inline">
            {t.nav.skills}
          </a>
          <a href="#contact" className="hover:text-foreground">
            {t.nav.contact}
          </a>
          <a
            href={t.switcher.otherHref}
            className="rounded-md border border-border px-2 py-1 hover:text-foreground"
            aria-label={locale === "en" ? "Versão em português" : "English version"}
          >
            {t.switcher.other}
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
