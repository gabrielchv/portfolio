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

## Local development

```bash
npm install
npm run dev            # dev server
npm run lint           # eslint
npm run build          # static export -> out/
npm run sync:projects  # refresh verified project data (see below)
```

Build and run the production image:

```bash
docker build -t portfolio . && docker run -p 8080:8080 portfolio
```

## Project data

Projects come from two places, merged in `src/data/profile.ts`:

- **Hand-authored entries** — the ones written directly in `profile.ts`, with
  curated highlights and copy in both languages.
- **Verified entries** — appended from `src/data/projects.verified.json`, which is
  generated from [gabrielchv/prova](https://github.com/gabrielchv/prova).

In `prova`, every project claim cites a file in that project's repository, and
its build fails if a citation no longer resolves. So a project listed there has
been checked against the code, not just described.

`npm run sync:projects` regenerates the JSON from the catalog in that repository
(a sibling checkout at `../prova`, or the published catalog on GitHub). A
hand-authored entry wins on a repository collision, so curated copy is never
overwritten by generated text — but a verified project the site was missing is
added automatically.

## Deployment

Pushes to `main` deploy via GitHub Actions (Workload Identity Federation — no
service-account keys) to Cloud Run. `gazerah.com` and `www` are Cloud Run domain
mappings; nginx 301s `www` to the apex and `/` to `/en/`.

## License

[MIT](./LICENSE)
