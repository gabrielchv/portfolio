import type { Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { experience } from "@/data/profile";

export default function ExperienceSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section id="experience" className="mx-auto max-w-2xl px-5 py-12">
      <h2 className="text-2xl font-bold tracking-tight">{t.experience.title}</h2>
      <div className="mt-6 space-y-8">
        {experience.map((e) => (
          <article key={e.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-semibold">
                {e.title[locale]} · <span className="text-muted">{e.company}</span>
              </h3>
              <p className="text-sm text-muted">
                {e.period[locale]} · {e.location[locale]}
              </p>
            </div>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
              {e.bullets.map((b, i) => (
                <li key={i}>{b[locale]}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
