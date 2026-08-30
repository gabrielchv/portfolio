import type { Locale } from "./config";

export const ui: Record<
  Locale,
  {
    nav: { projects: string; experience: string; skills: string; contact: string };
    hero: { available: string; resumeEn: string; resumePt: string };
    projects: { title: string; featured: string; more: string; code: string; live: string };
    experience: { title: string };
    skills: { title: string };
    contact: {
      title: string;
      blurb: string;
      email: string;
    };
    footer: { built: string };
    switcher: { label: string; other: string; otherHref: string };
  }
> = {
  en: {
    nav: { projects: "Projects", experience: "Experience", skills: "Skills", contact: "Contact" },
    hero: {
      available: "Open to remote AI engineering roles — Brazil and international",
      resumeEn: "Resume (EN)",
      resumePt: "Resume (PT-BR)",
    },
    projects: {
      title: "Projects",
      featured: "Featured",
      more: "More projects",
      code: "Code",
      live: "Live",
    },
    experience: { title: "Experience" },
    skills: { title: "Skills" },
    contact: {
      title: "Contact",
      blurb: "The fastest way to reach me is email. I read everything.",
      email: "Email me",
    },
    footer: { built: "Static Next.js, served by nginx on Cloud Run. No trackers." },
    switcher: { label: "EN", other: "PT", otherHref: "/pt/" },
  },
  pt: {
    nav: { projects: "Projetos", experience: "Experiência", skills: "Skills", contact: "Contato" },
    hero: {
      available: "Aberto a vagas remotas de engenharia de IA — Brasil e exterior",
      resumeEn: "Currículo (EN)",
      resumePt: "Currículo (PT-BR)",
    },
    projects: {
      title: "Projetos",
      featured: "Destaques",
      more: "Mais projetos",
      code: "Código",
      live: "Ao vivo",
    },
    experience: { title: "Experiência" },
    skills: { title: "Skills" },
    contact: {
      title: "Contato",
      blurb: "O caminho mais rápido é e-mail. Leio tudo.",
      email: "Enviar e-mail",
    },
    footer: { built: "Next.js estático, servido por nginx no Cloud Run. Sem rastreadores." },
    switcher: { label: "PT", other: "EN", otherHref: "/en/" },
  },
};
