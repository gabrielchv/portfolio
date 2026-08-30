import type { Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { identity } from "@/data/profile";

export default function ContactSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section id="contact" className="mx-auto max-w-2xl px-5 py-12">
      <h2 className="text-2xl font-bold tracking-tight">{t.contact.title}</h2>
      <p className="mt-3 text-muted">{t.contact.blurb}</p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        <a
          href={`mailto:${identity.email}`}
          className="rounded-md bg-accent px-4 py-2 font-medium text-background hover:opacity-90"
        >
          {t.contact.email}
        </a>
        <a
          href={identity.linkedin}
          rel="me noopener"
          className="rounded-md border border-border bg-surface px-4 py-2 font-medium hover:border-accent"
        >
          LinkedIn
        </a>
        <a
          href={identity.github}
          rel="me noopener"
          className="rounded-md border border-border bg-surface px-4 py-2 font-medium hover:border-accent"
        >
          GitHub
        </a>
      </div>
      <p className="mt-4 text-sm text-muted">{identity.email}</p>
    </section>
  );
}
