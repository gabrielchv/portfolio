import type { Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { identity } from "@/data/profile";

export default function Hero({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section id="top" className="mx-auto max-w-2xl px-5 pb-12 pt-16">
      <p className="text-sm font-medium text-accent">{identity.role[locale]}</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{identity.name}</h1>
      <p className="mt-4 text-lg leading-relaxed">{identity.tagline[locale]}</p>
      <p className="mt-3 leading-relaxed text-muted">{identity.sub[locale]}</p>
      <p className="mt-4 text-sm text-muted">
        {identity.location[locale]} · {t.hero.available}
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <a
          href="/resume/gabriel-chaves-resume-en.pdf"
          className="rounded-md border border-border bg-surface px-4 py-2 font-medium hover:border-accent"
        >
          {t.hero.resumeEn}
        </a>
        <a
          href="/resume/gabriel-chaves-resume-pt.pdf"
          className="rounded-md border border-border bg-surface px-4 py-2 font-medium hover:border-accent"
        >
          {t.hero.resumePt}
        </a>
        <a
          href={identity.github}
          rel="me noopener"
          className="rounded-md border border-border bg-surface px-4 py-2 font-medium hover:border-accent"
        >
          GitHub
        </a>
        <a
          href={identity.linkedin}
          rel="me noopener"
          className="rounded-md border border-border bg-surface px-4 py-2 font-medium hover:border-accent"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
