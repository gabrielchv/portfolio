import type { Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { skills } from "@/data/profile";

export default function SkillsSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section id="skills" className="mx-auto max-w-2xl px-5 py-12">
      <h2 className="text-2xl font-bold tracking-tight">{t.skills.title}</h2>
      <div className="mt-6 space-y-5">
        {skills.map((g) => (
          <div key={g.id}>
            <h3 className="text-sm font-semibold">{g.label[locale]}</h3>
            {g.caveat && <p className="mt-0.5 text-xs text-muted">{g.caveat[locale]}</p>}
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li key={s} className="rounded bg-chip px-2 py-0.5 text-xs text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
