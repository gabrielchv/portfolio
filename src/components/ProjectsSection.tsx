import type { Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { projects } from "@/data/profile";

function Chips({ stack }: { stack: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <li key={s} className="rounded bg-chip px-2 py-0.5 text-xs text-muted">
          {s}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectsSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id="projects" className="mx-auto max-w-2xl px-5 py-12">
      <h2 className="text-2xl font-bold tracking-tight">{t.projects.title}</h2>

      <div className="mt-6 space-y-8">
        {featured.map((p) => (
          <article
            key={p.id}
            className="rounded-lg border border-border bg-surface p-5"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <span className="flex shrink-0 gap-3 text-sm">
                <a href={p.repo} rel="noopener" className="text-accent hover:underline">
                  {t.projects.code}
                </a>
                {p.liveUrl && (
                  <a href={p.liveUrl} rel="noopener" className="text-accent hover:underline">
                    {t.projects.live}
                  </a>
                )}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{p.tagline[locale]}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              {p.highlights.map((h, i) => (
                <li key={i}>{h[locale]}</li>
              ))}
            </ul>
            <Chips stack={p.stack} />
          </article>
        ))}
      </div>

      <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted">
        {t.projects.more}
      </h3>
      <div className="mt-4 space-y-4">
        {rest.map((p) => (
          <article key={p.id} className="border-b border-border pb-4 last:border-0">
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="font-semibold">{p.name}</h4>
              <span className="flex shrink-0 gap-3 text-sm">
                <a href={p.repo} rel="noopener" className="text-accent hover:underline">
                  {t.projects.code}
                </a>
                {p.liveUrl && (
                  <a href={p.liveUrl} rel="noopener" className="text-accent hover:underline">
                    {t.projects.live}
                  </a>
                )}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{p.tagline[locale]}</p>
            <Chips stack={p.stack} />
          </article>
        ))}
      </div>
    </section>
  );
}
