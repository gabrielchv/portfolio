import type { Metadata } from "next";
import "../globals.css";
import { locales, type Locale } from "@/i18n/config";
import { identity } from "@/data/profile";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const SITE = "https://gazerah.com";

const descriptions: Record<Locale, string> = {
  en: "AI Engineer building LLM-powered products: structured output, streaming, RAG. Python, TypeScript, Google Cloud. Open to remote roles.",
  pt: "Engenheiro de IA construindo produtos com LLMs: saída estruturada, streaming, RAG. Python, TypeScript, Google Cloud. Aberto a vagas remotas.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const title = "Gabriel Chaves — AI Engineer";
  return {
    metadataBase: new URL(SITE),
    title,
    description: descriptions[locale],
    alternates: {
      canonical: `${SITE}/${locale}/`,
      languages: {
        en: `${SITE}/en/`,
        "pt-BR": `${SITE}/pt/`,
        "x-default": `${SITE}/en/`,
      },
    },
    openGraph: {
      title,
      description: descriptions[locale],
      url: `${SITE}/${locale}/`,
      siteName: "Gabriel Chaves",
      type: "profile",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: descriptions[locale],
      images: ["/og.png"],
    },
    robots: { index: true, follow: true },
  };
}

// Runs before paint: applies the persisted theme class so there is no flash.
const themeInit = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.classList.add(t)}catch(e){}`;

function personJsonLd(locale: Locale) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    jobTitle: identity.role[locale],
    url: SITE,
    email: `mailto:${identity.email}`,
    sameAs: [identity.github, identity.linkedin],
    nationality: "Brazilian",
    knowsAbout: [
      "LLM engineering",
      "Retrieval-augmented generation",
      "Prompt design",
      "Python",
      "TypeScript",
      "Google Cloud",
    ],
  });
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  return (
    <html lang={locale === "pt" ? "pt-BR" : "en"} className="antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personJsonLd(locale) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
