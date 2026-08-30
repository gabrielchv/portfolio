import type { Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";

export default function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-2xl px-5 py-6 text-xs text-muted">
        <p>
          © {new Date().getFullYear()} Gabriel Chaves · {t.footer.built}{" "}
          <a
            href="https://github.com/gabrielchv/portfolio"
            rel="noopener"
            className="text-accent hover:underline"
          >
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
