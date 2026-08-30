import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = "https://gazerah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: `${SITE}/en/`,
    "pt-BR": `${SITE}/pt/`,
  };
  return [
    { url: `${SITE}/en/`, lastModified: new Date(), alternates: { languages } },
    { url: `${SITE}/pt/`, lastModified: new Date(), alternates: { languages } },
  ];
}
