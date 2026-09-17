# gazerah.com

[![CI](https://github.com/gabrielchv/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/gabrielchv/portfolio/actions/workflows/ci.yml)

Personal portfolio for Gabriel Chaves — AI Engineer. Static Next.js (App Router,
`output: 'export'`), served by nginx on Cloud Run. EN/PT via route-based i18n
(`/en`, `/pt`), no middleware.

Content in `src/data/profile.ts`, seeded from a private knowledge base
(kb.yaml v3) — that KB stays the source of truth for resumes/LinkedIn.

```bash
npm run dev        # local dev
npm run build      # static export -> out/
docker build -t portfolio . && docker run -p 8080:8080 portfolio
```

Deploys on push to main via GitHub Actions (Workload Identity Federation, no
service-account keys) to Cloud Run; `gazerah.com` and `www` are Cloud Run
domain mappings — nginx 301s `www` to the apex and `/` to `/en/`.
