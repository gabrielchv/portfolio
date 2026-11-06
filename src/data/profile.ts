// Seeded from jobsearch kb.yaml v3 (2026-08-24) + project READMEs.
// kb.yaml remains the source of truth for resumes/LinkedIn; edits here must not
// contradict it. Guardrails carried over:
// - Never render "Professional Machine Learning Engineer Certification" — always
//   "learning path". The exam is not taken.
// - ml foundations are course-backed: always shown under the coursework label.
// - AutoApply has no live URL (not in stores; the Cloud Run demo is a harness).
// - Yank EPC work is in progress: present tense, no delivered-outcome claims.

import type { Locale } from "@/i18n/config";
import verifiedCatalog from "./projects.verified.json";

export type Localized = Record<Locale, string>;

/**
 * Shape of catalog/projects.json from gabrielchv/prova, where every project has
 * had its claims checked against the repository at a recorded commit.
 * Refresh with `npm run sync:projects`; the file is generated, never edited.
 */
interface VerifiedProject {
  id: string;
  name: string;
  repo: string;
  tagline: string;
  tagline_pt: string;
  stack: string[];
  live_url: string | null;
  claim_count: number;
  verified_commit: string;
}

export interface Project {
  id: string;
  name: string;
  featured: boolean;
  tagline: Localized;
  highlights: Localized[];
  stack: string[];
  repo: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  title: Localized;
  period: Localized;
  location: Localized;
  bullets: Localized[];
}

export interface SkillGroup {
  id: string;
  label: Localized;
  items: string[];
  caveat?: Localized;
}

export const identity = {
  name: "Gabriel Chaves",
  role: { en: "AI Engineer", pt: "Engenheiro de IA" } satisfies Localized,
  email: "gabriel.chaves.tech@gmail.com",
  github: "https://github.com/gabrielchv",
  linkedin: "https://www.linkedin.com/in/gabriel-chv",
  location: {
    en: "São Paulo, Brazil · Remote",
    pt: "São Paulo, Brasil · Remoto",
  } satisfies Localized,
  tagline: {
    en: "I build LLM-powered products that ship — structured output, streaming, retrieval — and I own the whole path: interface, API, data pipeline and deployment on Google Cloud.",
    pt: "Construo produtos com LLMs que chegam a produção — saída estruturada, streaming, retrieval — e cuido do caminho inteiro: interface, API, pipeline de dados e deploy no Google Cloud.",
  } satisfies Localized,
  sub: {
    en: "3 years shipping production web software, now focused on AI engineering. Python · TypeScript · GCP. Completing a Technologist degree in Systems Analysis and Development at IFSP (Dec 2026); finished Google Cloud's Professional Machine Learning Engineer learning path.",
    pt: "3 anos entregando software web em produção, agora focado em engenharia de IA. Python · TypeScript · GCP. Concluindo Tecnólogo em Análise e Desenvolvimento de Sistemas no IFSP (dez 2026); trilha Professional Machine Learning Engineer do Google Cloud concluída.",
  } satisfies Localized,
};

const handAuthored: Project[] = [
  {
    id: "autoapply",
    name: "AutoApply",
    featured: true,
    tagline: {
      en: "Browser extension that fills job application forms through an LLM — designed so the model cannot invent facts about you.",
      pt: "Extensão de navegador que preenche formulários de candidatura via LLM — projetada para o modelo não poder inventar fatos sobre você.",
    },
    highlights: [
      {
        en: "Chrome MV3 and Firefox extension that maps arbitrary job application forms to a structured candidate profile through an LLM, with no per-site adapters: the form is scraped for labels, options and required flags, and the model resolves the mapping.",
        pt: "Extensão para Chrome MV3 e Firefox que mapeia formulários de candidatura arbitrários para um perfil estruturado por meio de um LLM, sem adaptadores por site: o formulário é lido em busca de rótulos, opções e campos obrigatórios, e o modelo resolve o mapeamento.",
      },
      {
        en: "Designed against model fabrication: the LLM returns a fill plan that is schema-validated with one corrective retry before any field is written, open-ended answers are anchored to the profile and the job posting, and no code path submits the form.",
        pt: "Projetada contra a fabricação de informação: o LLM devolve um plano de preenchimento validado por schema, com um retry corretivo, antes de qualquer campo ser escrito; respostas dissertativas se ancoram no perfil e na vaga, e nenhum caminho de código envia o formulário.",
      },
      {
        en: "Local-first, no backend: API key and profile stay in extension storage, CVs are parsed in-browser with pdf.js, and any OpenAI-compatible endpoint works, including a local Ollama.",
        pt: "Local-first, sem backend: chave de API e perfil ficam no armazenamento da extensão, o currículo em PDF é processado no navegador com pdf.js, e qualquer endpoint compatível com OpenAI funciona, inclusive um Ollama local.",
      },
      {
        en: "GitHub Actions CI with lint, type checks, a Vitest suite and both browser builds; a containerized six-page ATS test environment deployed to Cloud Run with Terraform.",
        pt: "CI no GitHub Actions com lint, checagem de tipos, suíte Vitest e os dois builds de navegador; ambiente de teste de ATS com seis páginas, containerizado e publicado no Cloud Run via Terraform.",
      },
    ],
    stack: ["TypeScript", "Chrome MV3", "Firefox", "Vitest", "Terraform", "Cloud Run"],
    repo: "https://github.com/gabrielchv/AutoApply",
  },
  {
    id: "inquilino-ia",
    name: "InquilinoIA",
    featured: true,
    tagline: {
      en: "Citation-grounded RAG over Brazilian tenancy law — every claim verified in code against the statute before it is shown.",
      pt: "RAG com citações sobre a Lei do Inquilinato — cada afirmação verificada em código contra o texto da lei antes de aparecer.",
    },
    highlights: [
      {
        en: "Answers questions against the full text of Lei 8.245/1991: each claim must be backed by a verbatim quote from the actual article, checked by normalized substring match in Python — not taken on the model's word — or the answer is flagged.",
        pt: "Responde perguntas contra o texto integral da Lei 8.245/1991: cada afirmação precisa de citação verbatim do artigo, checada por substring normalizada em Python — não na palavra do modelo — ou a resposta é sinalizada.",
      },
      {
        en: "Two Gemini calls by design: one streams a responsive answer over SSE, a second structured-output call extracts {article, quote} pairs for verification — avoiding the fragile alternative of parsing citation tags out of a live token stream.",
        pt: "Duas chamadas ao Gemini por design: uma faz streaming da resposta via SSE, outra com saída estruturada extrai pares {artigo, citação} para verificação — evitando o parse frágil de tags de citação dentro do stream de tokens.",
      },
      {
        en: "Ingestion scrapes planalto.gov.br and strips both strikethrough forms of revoked amendments (HTML tags and CSS line-through) so historical wording never ships as current law; the chunked output is committed as a reproducible seed.",
        pt: "A ingestão raspa o planalto.gov.br e remove as duas formas de tachado de emendas revogadas (tag HTML e CSS line-through) para que texto histórico nunca saia como lei vigente; a saída em chunks é versionada como seed reproduzível.",
      },
      {
        en: "FastAPI + Vue 3 on a single Cloud Run service, Supabase pgvector as the store, Terraform for the GCP resources and keyless deploys via Workload Identity Federation.",
        pt: "FastAPI + Vue 3 num único serviço Cloud Run, Supabase pgvector como store, Terraform para os recursos GCP e deploys sem chave via Workload Identity Federation.",
      },
    ],
    stack: ["Python", "FastAPI", "Vue 3", "Gemini", "pgvector", "Terraform", "Cloud Run"],
    repo: "https://github.com/gabrielchv/inquilino-ia",
  },
  {
    id: "obsidian-chatter",
    name: "Obsidian Chatter",
    featured: true,
    tagline: {
      en: "Private RAG chat over an Obsidian vault, with hybrid retrieval and git-versioned write-back.",
      pt: "Chat RAG privado sobre um vault Obsidian, com retrieval híbrido e write-back versionado em git.",
    },
    highlights: [
      {
        en: "Hybrid local retrieval — e5 embeddings plus BM25 — over the vault's notes, re-indexed automatically after every write.",
        pt: "Retrieval híbrido local — embeddings e5 mais BM25 — sobre as notas do vault, reindexado automaticamente após cada escrita.",
      },
      {
        en: "The assistant writes knowledge back into the vault as proper PARA notes with wikilinks and frontmatter, and every change is a git commit you can undo.",
        pt: "O assistente grava conhecimento de volta no vault como notas PARA com wikilinks e frontmatter, e cada mudança é um commit git reversível.",
      },
      {
        en: "Tool-use agent loop with on-demand SKILL.md skills, DeepSeek server-side web search with required source citations, and SSE streaming behind a FastAPI service.",
        pt: "Loop de agente com tool-use e skills SKILL.md sob demanda, busca web server-side do DeepSeek com citação de fontes obrigatória, e streaming SSE atrás de um serviço FastAPI.",
      },
    ],
    stack: ["Python", "FastAPI", "DeepSeek", "e5 + BM25", "SSE", "Cloud Run"],
    repo: "https://github.com/gabrielchv/Obsidian-Chatter",
  },
  {
    id: "task-helper-ai",
    name: "Task Helper AI",
    featured: false,
    tagline: {
      en: "Voice-driven task orchestrator on Gemini multimodal input, with offline Vosk wake-word detection.",
      pt: "Orquestrador de tarefas por voz sobre entrada multimodal do Gemini, com wake word offline via Vosk.",
    },
    highlights: [],
    stack: ["Gemini 2.5 Flash", "Vosk", "Docker", "Cloud Run"],
    repo: "https://github.com/gabrielchv/task-organizer",
    liveUrl: "https://task-organizer.gazerah.com",
  },
  {
    id: "bookcerto",
    name: "bookcerto",
    featured: false,
    tagline: {
      en: "Multi-tenant scheduling SaaS: database-level booking-overlap guarantee, BullMQ background jobs, SSE live dashboard.",
      pt: "SaaS de agendamento multi-tenant: garantia de não-sobreposição no banco, jobs BullMQ, dashboard ao vivo via SSE.",
    },
    highlights: [],
    stack: ["Next.js 15", "Postgres", "Drizzle", "BullMQ", "Terraform"],
    repo: "https://github.com/gabrielchv/bookcerto",
  },
  {
    id: "rag-ic",
    name: "RAG-IC",
    featured: false,
    tagline: {
      en: "Research POC: fully local RAG over a company's internal safety-equipment docs — indexing and retrieval never leave the machine.",
      pt: "POC de iniciação científica: RAG totalmente local sobre documentação interna de EPI — indexação e busca nunca saem da máquina.",
    },
    highlights: [],
    stack: ["Python", "Local embeddings", "Ollama"],
    repo: "https://github.com/gabrielchv/RAG-IC",
  },
  {
    id: "virt-ic",
    name: "VIRT-IC",
    featured: false,
    tagline: {
      en: "Container network observability: captures the same packet at multiple points (host, bridge, namespaces) and reconstructs the conversation.",
      pt: "Observabilidade de rede entre containers: captura o mesmo pacote em vários pontos (host, bridge, namespaces) e reconstrói a conversa.",
    },
    highlights: [],
    stack: ["Python", "Docker", "Linux namespaces"],
    repo: "https://github.com/gabrielchv/virt-ic",
  },
];

// Verified projects come from gabrielchv/prova. A hand-authored entry above wins
// on a repository collision, because it carries curated highlights and copy;
// anything the site is missing is appended from the catalog. That asymmetry is
// deliberate: the catalog can add a project to the site, but it cannot quietly
// overwrite prose that was written on purpose.
function repoKey(url: string): string {
  return url
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/\.git$/, "")
    .toLowerCase();
}

const handAuthoredRepos = new Set(handAuthored.map((project) => repoKey(project.repo)));

const fromCatalog: Project[] = (verifiedCatalog.projects as VerifiedProject[])
  .filter((project) => !handAuthoredRepos.has(repoKey(project.repo)))
  .map((project) => ({
    id: project.id,
    name: project.name,
    featured: false,
    tagline: { en: project.tagline, pt: project.tagline_pt },
    highlights: [],
    stack: project.stack,
    repo: `https://github.com/${project.repo}`,
    liveUrl: project.live_url ?? undefined,
  }));

export const projects: Project[] = [...handAuthored, ...fromCatalog];

export const experience: Experience[] = [
  {
    id: "freelance-current",
    company: "Independent / Freelance",
    title: {
      en: "Software Engineer (Freelance)",
      pt: "Engenheiro de Software (Freelance)",
    },
    period: { en: "Jul 2026 – present", pt: "jul 2026 – atual" },
    location: { en: "Remote", pt: "Remoto" },
    bullets: [
      {
        en: "Rebuilding the public web platform for Yank EPC, an engineering, procurement and construction company, in Next.js — with search visibility, mobile compatibility and overall user experience as the defining requirements.",
        pt: "Reconstruindo o site institucional da Yank EPC, empresa de engenharia, suprimentos e construção, em Next.js — com visibilidade em buscadores, compatibilidade mobile e experiência do usuário como requisitos centrais.",
      },
      {
        en: "Using server-side rendering and a structured page architecture so service and project content is indexable, with semantic markup and per-route metadata.",
        pt: "Aplicando renderização no servidor e uma arquitetura de páginas estruturada para tornar o conteúdo de serviços e projetos indexável, com marcação semântica e metadados por rota.",
      },
      {
        en: "Running requirement sessions directly with the client to define product and service content, rather than building to a handed-down spec.",
        pt: "Conduzindo sessões de levantamento de requisitos diretamente com o cliente para definir o conteúdo de produtos e serviços, em vez de construir sobre uma especificação pronta.",
      },
    ],
  },
  {
    id: "meet-oscar",
    company: "Meet Oscar",
    title: {
      en: "AI / Software Engineer (Freelance)",
      pt: "Engenheiro de Software / IA (Freelance)",
    },
    period: { en: "Feb 2025 – Nov 2025", pt: "fev 2025 – nov 2025" },
    location: { en: "Remote", pt: "Remoto" },
    bullets: [
      {
        en: "Built an AI email assistant integrating the Gmail API with Gemini and OpenAI models, delivering automated message categorization and real-time streamed responses inside a custom React interface.",
        pt: "Desenvolvi um assistente de e-mail com IA integrando a API do Gmail a modelos Gemini e OpenAI, com categorização automática de mensagens e respostas em streaming em tempo real numa interface React própria.",
      },
      {
        en: "Led the complete rewrite of the company's legacy HTML/JS platform to React and Tailwind CSS, improving Core Web Vitals and developer experience.",
        pt: "Liderei a reescrita completa da plataforma legada em HTML/JS para React e Tailwind CSS, melhorando Core Web Vitals e a experiência de desenvolvimento.",
      },
      {
        en: "Established the frontend engineering baseline for a startup with no prior frontend specialist: component standards, directory structure, and an accessible Figma-to-React component library.",
        pt: "Estabeleci a base de engenharia de frontend de uma startup que não tinha especialista na área: padrões de componentes, estrutura de diretórios e biblioteca acessível de componentes do Figma ao React.",
      },
    ],
  },
  {
    id: "trular",
    company: "Trular",
    title: {
      en: "Junior Software Engineer",
      pt: "Desenvolvedor de Software Júnior",
    },
    period: { en: "Sep 2022 – Dec 2024", pt: "set 2022 – dez 2024" },
    location: { en: "São Paulo, SP — Hybrid", pt: "São Paulo, SP — Híbrido" },
    bullets: [
      {
        en: "Led the migration of the primary real-estate engine from Next.js to SvelteKit, optimizing server-side rendering and improving organic search visibility.",
        pt: "Liderei a migração do motor principal de imóveis de Next.js para SvelteKit, otimizando renderização no servidor e melhorando a visibilidade orgânica em buscadores.",
      },
      {
        en: "Built Python crawlers (Scrapy, BeautifulSoup) on cloud instances aggregating real-time listing data from multiple sources, feeding the core product database with high availability and consistency.",
        pt: "Construí crawlers em Python (Scrapy, BeautifulSoup) em instâncias cloud para agregar dados de anúncios em tempo real de múltiplas fontes, alimentando o banco central do produto com alta disponibilidade e consistência.",
      },
      {
        en: "Introduced the testing culture: unit tests with Vitest, component documentation in Storybook, end-to-end coverage with Playwright.",
        pt: "Introduzi a cultura de testes: testes unitários com Vitest, documentação de componentes no Storybook e cobertura ponta a ponta com Playwright.",
      },
      {
        en: "Collaborated daily in English with international stakeholders on architecture reviews and technical planning.",
        pt: "Colaborei diariamente em inglês com stakeholders internacionais em revisões de arquitetura e planejamento técnico.",
      },
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    id: "llm",
    label: { en: "LLM engineering", pt: "Engenharia de LLM" },
    items: [
      "Prompt design",
      "Structured output & intent parsing",
      "RAG (retrieval-augmented generation)",
      "LLM-based classification",
      "Real-time streaming (SSE)",
      "Multimodal audio input",
      "Voice interfaces",
    ],
  },
  {
    id: "models",
    label: { en: "Models & APIs", pt: "Modelos e APIs" },
    items: ["Gemini API", "OpenAI API", "DeepSeek API", "TensorFlow"],
  },
  {
    id: "languages",
    label: { en: "Languages", pt: "Linguagens" },
    items: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    id: "web",
    label: { en: "Web", pt: "Web" },
    items: ["React", "Next.js", "SvelteKit", "Tailwind CSS", "Node.js", "FastAPI", "Flask"],
  },
  {
    id: "cloud",
    label: { en: "Cloud & DevOps", pt: "Cloud e DevOps" },
    items: [
      "Google Cloud (Cloud Run, Cloud Build, Artifact Registry)",
      "Docker",
      "Terraform",
      "GitHub Actions",
      "CI/CD",
      "Firebase",
    ],
  },
  {
    id: "data",
    label: { en: "Data & testing", pt: "Dados e testes" },
    items: ["PostgreSQL", "pgvector", "BigQuery", "Scrapy", "Vitest", "Playwright", "Storybook"],
  },
  {
    id: "ml-foundations",
    label: {
      en: "ML foundations — Google Cloud coursework",
      pt: "Fundamentos de ML — cursos Google Cloud",
    },
    caveat: {
      en: "Professional Machine Learning Engineer learning path, 19 Skills Boost courses (2025–2026).",
      pt: "Trilha Professional Machine Learning Engineer, 19 cursos Skills Boost (2025–2026).",
    },
    items: [
      "MLOps & agent platforms",
      "ML pipelines",
      "Feature engineering",
      "BigQuery ML",
      "Model evaluation",
      "Responsible AI",
    ],
  },
];
