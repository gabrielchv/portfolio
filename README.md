# gazerah.com

[![CI](https://github.com/gabrielchv/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/gabrielchv/portfolio/actions/workflows/ci.yml)

Personal portfolio for Gabriel Chaves — AI Engineer. Static Next.js (App Router,
`output: 'export'`), served by nginx on Cloud Run. EN/PT via route-based i18n
(`/en`, `/pt`), no middleware.

Content in `src/data/profile.ts`, seeded from a private knowledge base
(kb.yaml v3) — that KB stays the source of truth for resumes/LinkedIn.

## Features

- **Bilingual** — EN/PT route-based i18n under `/en` and `/pt`, no middleware.
- **Static export** — `output: 'export'` emits plain HTML into `out/`; no Node
  server at runtime.
- **No-flash theme toggle** — light/dark preference persisted in `localStorage`
  and applied before first paint.
- **SEO built in** — per-locale metadata, Open Graph and Twitter cards,
  `robots.txt`, a `sitemap.xml` with `hreflang` alternates, and schema.org
  `Person` JSON-LD.
- **Self-hosted** — nginx serves the export; `www` and the apex redirect to
  `/en/`.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript 5 |
| Serving | nginx 1.29 (Alpine) |
| Hosting | Google Cloud Run |
| CI/CD | GitHub Actions with Workload Identity Federation |

## Project structure

```text
src/
  app/[locale]/      routes: layout, page, robots, sitemap, globals.css
  components/        Header, Hero, Projects, Experience, Skills, Contact, Footer, ThemeToggle
  data/profile.ts    all content — identity, projects, experience, skills
  i18n/              locale config + UI string table
public/              og.png and the EN/PT resume PDFs
nginx.conf           serves out/ and the redirects
Dockerfile           builder stage -> nginx runtime
```

```bash
npm run dev        # local dev
npm run build      # static export -> out/
docker build -t portfolio . && docker run -p 8080:8080 portfolio
```

Deploys on push to main via GitHub Actions (Workload Identity Federation, no
service-account keys) to Cloud Run; `gazerah.com` and `www` are Cloud Run
domain mappings — nginx 301s `www` to the apex and `/` to `/en/`.
