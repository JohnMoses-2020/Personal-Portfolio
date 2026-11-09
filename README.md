# John Moses — Personal Engineering Portfolio

**Above the Clouds · Dark Cinematic Edition**

A production-quality personal website for a software engineer specializing in cloud infrastructure and distributed systems. Dark navy/charcoal palette, photographic cloudscapes, Cormorant Garamond headlines, Inter body copy, editorial layouts.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · MDX (`next-mdx-remote`) · Shiki syntax highlighting · Lucide icons
- **Rendering:** fully static. `next build` produces a complete static site in `out/` (HTML, assets, responsive images, sitemap, robots, 404). No Node.js process in production.
- **Deployment:** static files served by Caddy on a shared Linux VPS, with automatic HTTPS. Releases are uploaded by `deploy/deploy.sh` and activated with an atomic symlink swap. An optional Docker image (Caddy + static files) is also provided.

---

## Contents

1. [Quick start](#quick-start)
2. [Development workflow](#development-workflow)
3. [Project structure](#project-structure)
4. [Routes](#routes)
5. [Customizing](#customizing)
6. [Writing content](#writing-content)
7. [Design system](#design-system)
8. [Environment variables](#environment-variables)
9. [Production build (static export)](#production-build-static-export)
10. [Deploying to the VPS](#deploying-to-the-vps)
11. [Operational checks & rollback](#operational-checks--rollback)
12. [Optional: Docker](#optional-docker)
13. [Placeholders to replace before launch](#placeholders-to-replace-before-launch)
14. [Architecture notes](#architecture-notes)

---

## Quick start

Requirements: **Node.js ≥ 20.9** (Node 24 LTS recommended) and npm.

```bash
npm install
cp .env.example .env.local   # optional — defaults are placeholders
npm run dev                  # http://localhost:3000
```

Other scripts:

| Script              | What it does                                                              |
| ------------------- | ------------------------------------------------------------------------- |
| `npm run dev`       | Development server with hot reload (runs `images` first)                  |
| `npm run build`     | Generates responsive images, then exports the static site to `out/`       |
| `npm run preview`   | Serves `out/` locally with production routing rules (http://localhost:4173) |
| `npm run images`    | Regenerates `public/images/_opt/*.webp` + the variant manifest            |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript rules)                       |
| `npm run typecheck` | Generates route types, then `tsc --noEmit`                                |
| `npm run check`     | lint → typecheck → build (what CI should run)                             |
| `npm run deploy`    | Build and publish a new release to the VPS (`deploy/deploy.sh`)           |

---

## Development workflow

Source of truth: **https://github.com/JohnMoses-2020/Personal-Portfolio** (`main`). Deployments are manual and happen from a local checkout; there is no CI/CD yet.

```bash
# 1. Clone (first time only)
git clone https://github.com/JohnMoses-2020/Personal-Portfolio.git
cd Personal-Portfolio
npm install
cp .env.example .env.production.local     # fill in real contact/profile links (gitignored)

# 2. Start from the latest main
git pull --ff-only

# 3. Work on a change
npm run dev                               # http://localhost:3000 — edit content/, components/, app/

# 4. Validate exactly what CI will eventually run
npm run check                             # lint → typecheck → static export build
npm run preview                           # optional: inspect out/ with production routing rules

# 5. Commit and push
git add -A
git commit -m "content: add article on capacity management"
git push

# 6. Deploy the committed state (requires the VPS SSH key in ssh-agent)
npm run deploy
```

Notes:

- `npm run deploy` names each release `<UTC timestamp>-<short commit SHA>`; uncommitted changes are deployed too but the release is marked `-dirty`, so commit first.
- Only files tracked by Git are needed to rebuild the site. `public/images/_opt/`, `out/`, `.next/` and `node_modules/` are regenerated and must never be committed.
- Never commit `.env.local`, `.env.production.local`, keys, or anything under `deploy/*.local`. The repository is public.
- Rollback: `bash deploy/rollback.sh` (see [Operational checks & rollback](#operational-checks--rollback)).
- The previous portfolio is preserved on the `archive/portfolio-v1` branch.

---

## Project structure

```
app/                      Routes (App Router)
  layout.tsx              Root layout: fonts, metadata, Navbar, Footer, skip link
  page.tsx                Home
  work/                   /work and /work/[slug]
  writing/                /writing and /writing/[slug]
  about/  resume/         Static pages
  not-found.tsx           Custom 404
  sitemap.ts  robots.ts   Generated /sitemap.xml and /robots.txt
  globals.css             Tailwind theme tokens, prose styles, animations

components/
  layout/                 Navbar, MobileNavigation, Footer, PageHeader, PhotoBackdrop,
                          PageTransition (View Transitions), Container, Logo
  ui/                     Button, Eyebrow, SectionHeader, Reveal, StatusBadge,
                          ParallaxImage, ScrollIndicator, icons
  home/                   Hero, ExpertiseGrid, SelectedWork, WritingPreview
  work/                   ProjectCard, CaseStudyLayout
  writing/                ArticleCard, ArticleLayout, TopicFilter, WritingBrowser,
                          TableOfContents
  mdx/                    Components available inside MDX (Lead, Callout, Figure,
                          Diagram, Placeholder)

content/                  All copy & content, separate from presentation
  projects/*.mdx          Case studies (frontmatter + MDX body)
  writing/*.mdx           Articles
  home.ts  about.ts       Page copy
  resume.ts               Structured résumé

lib/
  site.ts                 Site config: name, URLs, contact links, nav
  images.ts               Image manifest (every photo, with alt text & size)
  image-loader.ts         next/image loader → pre-built responsive WebP variants
  image-variants.generated.json   Widths available per image (written by scripts/optimize-images.mjs)
  content.ts              Content loaders (filesystem → typed objects)
  mdx.tsx                 MDX compile pipeline (GFM, slugs, Shiki)
  topics.ts  toc.ts  reading-time.ts  utils.ts

public/images/            Photography (see "Imagery" below); _opt/ is generated & gitignored

scripts/
  optimize-images.mjs     Build-time responsive WebP generation (sharp)
  preview-static.mjs      Local static server mirroring the production routing rules

deploy/
  Caddyfile               Production Caddy config (installed to /etc/caddy/Caddyfile)
  install-caddy.sh        One-time server setup (Caddy apt repo, web root, service)
  deploy.sh               Build → rsync release → atomic symlink swap → prune → verify
  rollback.sh             Re-point `current` at a retained release
  Caddyfile.docker        Config for the optional Docker image

Dockerfile  .dockerignore  docker-compose.example.yml  .env.example   (optional container path)
```

---

## Routes

| Route              | Page                                               |
| ------------------ | -------------------------------------------------- |
| `/`                | Home — hero, expertise, selected work, writing     |
| `/work`            | Projects & case studies                            |
| `/work/[slug]`     | Case study (template: `CaseStudyLayout`)           |
| `/writing`         | Technical writing with topic filters (`?topic=`)   |
| `/writing/[slug]`  | Article (template: `ArticleLayout`)                |
| `/about`           | About                                              |
| `/resume`          | Résumé (+ optional PDF download)                   |
| `/sitemap.xml`, `/robots.txt` | Generated                               |
| anything else      | Custom 404                                         |

All `[slug]` routes are generated from the files in `content/` at build time (`generateStaticParams` + `dynamicParams = false`). Unknown slugs return the 404 page.

---

## Customizing

### Identity, links and contact — `lib/site.ts`

Name, role, tagline, location, navigation, and all external links live here. Contact/profile URLs read from environment variables with placeholder fallbacks (see [Environment variables](#environment-variables)).

### Page copy

- Home hero + expertise cards: `content/home.ts`
- About page: `content/about.ts`
- Résumé: `content/resume.ts` (entries flagged `placeholder: true` render a "confirm details" note)

### Imagery — `lib/images.ts`

Every photograph is registered once in the manifest with `src`, `alt`, `width`, `height`. Content references images **by key** (e.g. `image: project-kubernetes`), so swapping a photo is a one-line change.

> **Licensing note:** the images currently in `public/images/` are AI-generated placeholders created for this project. Replace them with licensed or personal photography of the same aspect ratio when ready (16:9 for page backdrops, 4:3 for cards/thumbnails, 3:4 for the About portrait panel). Higher-resolution replacements (≥ 2000px wide for the hero) are recommended for large displays.

### Colors, fonts, spacing — `app/globals.css`

Design tokens are defined in the `@theme` block (Tailwind 4). Fonts are loaded in `app/layout.tsx` via `next/font/google` (Cormorant Garamond + Inter) and exposed as `--font-cormorant` / `--font-inter`.

---

## Writing content

### Case studies — `content/projects/<slug>.mdx`

```yaml
---
title: Kubernetes at Scale
summary: One-sentence description shown on cards.
categories: [Kubernetes, Reliability, Scaling]   # shown as "KUBERNETES · RELIABILITY · SCALING"
image: project-kubernetes                         # key from lib/images.ts
status: in-progress                               # draft | in-progress | published
date: 2026-11-08                                  # last updated (YYYY-MM-DD)
role: Software Engineer                           # optional
timeline: Ongoing                                 # optional
technologies: [Kubernetes, C# / .NET]
featured: true                                    # show on the home page (max 3)
order: 1                                          # sort order on /work
disclosure: Optional note rendered at the top of the case study.
---
```

The body should follow the case-study template: **Overview · Problem statement · Constraints · Architecture and approach · Technical decisions and tradeoffs · Implementation details · Results and impact · Lessons learned · Related technologies**. `##` and `###` headings automatically populate the table of contents.

### Articles — `content/writing/<slug>.mdx`

```yaml
---
title: "Designing for Scale: Lessons from Managing a Large Kubernetes Fleet"
excerpt: One or two sentences shown in lists and as the meta description.
date: 2026-10-20
topics: [kubernetes, cloud-infrastructure]   # slugs from lib/topics.ts
image: article-kubernetes-fleet
status: draft                                # draft | in-progress | published
featured: true                               # show on the home page (max 3)
---
```

Reading time is computed automatically. Articles that are not `published` show a "Draft" label instead of a date, display a work-in-progress notice, are excluded from the sitemap, and are marked `noindex`.

Topics are defined in `lib/topics.ts`. Add a topic there and it appears in the sidebar with a live count.

### Components available in MDX

```mdx
<Lead>Large serif opening paragraph.</Lead>

<Callout type="note" title="Scope">…</Callout>     {/* note | tip | warning */}

<Placeholder>What still needs to be written.</Placeholder>

<Figure src="project-kubernetes" caption="Image key or /public path" />

<Diagram title="Request lifecycle">
```text
ascii / text diagram, or an image
```
</Diagram>
```

Code fences support Shiki highlighting with titles, line numbers and highlighted lines:

````md
```yaml title="pdb.yaml" showLineNumbers {3-4}
apiVersion: policy/v1
```
````

Standard Markdown (GFM tables, lists, links, blockquotes) is styled by `.prose-editorial` in `globals.css`.

---

## Design system

| Token (Tailwind class) | Value     | Use                           |
| ---------------------- | --------- | ----------------------------- |
| `bg-ink`               | `#0B1117` | Primary background            |
| `bg-ink-2`             | `#141E27` | Secondary background          |
| `bg-card`              | `#1A2631` | Cards                         |
| `text-ivory`           | `#F1EDE7` | Primary text                  |
| `text-mist`            | `#B9C1C8` | Secondary text                |
| `text-muted`           | `#8A949D` | Metadata                      |
| `text-accent`          | `#E8C7A5` | Warm accent (logo dot, CTAs)  |
| `border-line`          | `#34414B` | Borders                       |

Utilities: `eyebrow` (tracked uppercase label), `meta` (tracked metadata), `container-site`, `photo-fade-left`, `photo-fade-bottom`, `hairline`.

Motion: CSS-only entrance animations (`animate-rise`, `animate-fade`), IntersectionObserver scroll reveals (`<Reveal>`), rAF parallax on large photography (`<ParallaxImage>`), and React `<ViewTransition>` page transitions. All motion respects `prefers-reduced-motion`; reveals only hide content when scripting is enabled, so the site is fully readable without JavaScript.

---

## Environment variables

| Variable                      | When   | Default                     | Purpose                                            |
| ----------------------------- | ------ | --------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | build  | `https://example.com`       | Canonical URL for metadata, OG, sitemap, robots    |
| `NEXT_PUBLIC_CONTACT_EMAIL`   | build  | `hello@example.com`         | `mailto:` links                                    |
| `NEXT_PUBLIC_GITHUB_URL`      | build  | `https://github.com/`       | GitHub profile link                                |
| `NEXT_PUBLIC_LINKEDIN_URL`    | build  | `https://www.linkedin.com/` | LinkedIn profile link                              |
| `NEXT_PUBLIC_RESUME_PDF_URL`  | build  | *(empty)*                   | Path/URL of résumé PDF; empty hides the button     |
| `SITE_URL`                    | deploy | `https://srv1727766.hstgr.cloud` | Public URL the deploy script builds for and verifies against |
| `DEPLOY_HOST`                 | deploy | `root@srv1727766.hstgr.cloud`       | SSH target for `deploy/deploy.sh` / `rollback.sh`  |
| `DEPLOY_ROOT`                 | deploy | `/var/www/portfolio`        | Release directory on the server                    |
| `KEEP_RELEASES`               | deploy | `3`                         | Releases retained (current + 2 previous)           |

`NEXT_PUBLIC_*` values are inlined at build time: change them → rebuild. Locally use `.env.local`. The deploy script sets `NEXT_PUBLIC_SITE_URL` from `SITE_URL`; put the other `NEXT_PUBLIC_*` values in `.env.production.local` (gitignored) so every production build picks them up.

---

## Production build (static export)

```bash
npm run build      # → out/   (runs scripts/optimize-images.mjs first)
npm run preview    # serve out/ at http://localhost:4173 with production routing rules
```

`next.config.ts` uses `output: "export"`. The build emits:

- one `.html` file per route (clean URLs: `/work` → `work.html`) plus `404.html`
- `sitemap.xml` and `robots.txt` (draft articles excluded / `noindex`)
- `_next/static/*` hashed assets and the RSC `.txt` payloads used for client-side navigation
- `images/*.jpg` originals (used for Open Graph) and `images/_opt/*.webp` responsive variants

**Images without a server.** Static hosting has no image optimizer, so `scripts/optimize-images.mjs` pre-generates WebP variants at 256–1920px (never upscaling) and records the available widths in `lib/image-variants.generated.json`. `lib/image-loader.ts` (registered as the `next/image` custom loader) maps each `srcset` candidate to the closest variant. Drop a new photo in `public/images/`, register it in `lib/images.ts`, and the next `npm run build`/`dev` generates its variants.

The export is validated the same way production is served: `npm run preview` implements the Caddyfile's `try_files`, trailing-slash redirect, and `404.html` rules.

---

## Deploying to the VPS

**Target:** Hostinger VPS `157.173.210.20` (Ubuntu 24.04), served by **Caddy** at **https://srv1727766.hstgr.cloud** (temporary provider hostname; see "Moving to a real domain").

**Isolation guarantees** — the portfolio deployment only ever touches:

- `/var/www/portfolio/` (releases + `current` symlink)
- the `caddy` package, `/etc/caddy/Caddyfile`, `/var/lib/caddy`, `/var/log/caddy`
- Caddy's apt keyring and source list

It does **not** touch `/root`, `jarvis.service`, `hermes-gateway.service`, any timer, Python, the host firewall (ufw/iptables), SSH, or DNS. Jarvis is a Telegram long-polling bot with no open ports, so there is no shared surface.

### One-time server setup

Prerequisite: inbound **TCP 80 and 443** must be allowed in Hostinger hPanel → VPS → Firewall (the host itself has no firewall; Hostinger filters upstream). Caddy needs both for the ACME challenge and to serve traffic.

```bash
# from this repo, on your Mac (key in ssh-agent):
scp deploy/Caddyfile deploy/install-caddy.sh root@srv1727766.hstgr.cloud:/tmp/
ssh root@srv1727766.hstgr.cloud 'bash /tmp/install-caddy.sh /tmp/Caddyfile'
```

`install-caddy.sh` adds Caddy's official apt repository, installs the package, creates `/var/www/portfolio/releases`, keeps the package's default Caddyfile as `Caddyfile.dist`, installs ours, runs `caddy validate`, and enables/starts the `caddy` unit. Certificates are obtained automatically on first request (Let's Encrypt, ZeroSSL fallback) and renewed by Caddy.

### Every release

```bash
npm run deploy          # = bash deploy/deploy.sh
```

1. Builds the export with `NEXT_PUBLIC_SITE_URL=$SITE_URL`.
2. `rsync`s `out/` to `/var/www/portfolio/releases/<UTC timestamp>-<git sha>/`.
3. Creates a temporary symlink and `mv -T`s it over `current` — a single `rename(2)`, so the live site switches atomically with no restart and no half-uploaded state.
4. Prunes releases beyond `KEEP_RELEASES` (default 3 = current + 2 previous).
5. Verifies the public URL: `/`, `/work`, `/writing`, `/about`, `/resume`, `/sitemap.xml`, `/robots.txt` return 200 and an unknown path returns 404.

Deploying never restarts Caddy, and nothing in the process can affect Jarvis.

### Moving to a real domain

1. Create an `A` record (and optionally `AAAA` → `2a02:4780:2d:d5b9::1`) for the domain pointing at `157.173.210.20`.
2. In `deploy/Caddyfile`, change the site address `srv1727766.hstgr.cloud` to your domain (to keep the old hostname redirecting, add a second block: `srv1727766.hstgr.cloud { redir https://your-domain.example{uri} 308 }`).
3. `scp deploy/Caddyfile root@srv1727766.hstgr.cloud:/etc/caddy/Caddyfile && ssh root@srv1727766.hstgr.cloud 'caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile && systemctl reload caddy'`
4. Set `SITE_URL=https://your-domain.example` (env or edit the default in `deploy/deploy.sh`) and run `npm run deploy` so canonical URLs, Open Graph tags and the sitemap use the new domain.

---

## Operational checks & rollback

```bash
# Site
curl -sI https://srv1727766.hstgr.cloud/ | head -5                 # 200, strict-transport-security, cache-control
curl -sI http://srv1727766.hstgr.cloud/  | head -2                 # 308 → https
curl -s  -o /dev/null -w '%{http_code}\n' https://srv1727766.hstgr.cloud/nope   # 404
echo | openssl s_client -connect srv1727766.hstgr.cloud:443 -servername srv1727766.hstgr.cloud 2>/dev/null | openssl x509 -noout -issuer -dates

# Server (read-only)
ssh root@srv1727766.hstgr.cloud 'systemctl is-active caddy jarvis hermes-gateway; readlink /var/www/portfolio/current; ls /var/www/portfolio/releases'
ssh root@srv1727766.hstgr.cloud 'journalctl -u caddy -n 50 --no-pager'
ssh root@srv1727766.hstgr.cloud 'tail -n 20 /var/log/caddy/portfolio-access.log'
```

**Rollback a release** (instant, atomic, no restart):

```bash
bash deploy/rollback.sh --list           # show retained releases, * = current
bash deploy/rollback.sh                  # previous release
bash deploy/rollback.sh <release-name>   # specific release
```

**Reload Caddy after a config change:** `caddy validate` runs first; a bad config is rejected and the running instance keeps serving.

**Remove the portfolio entirely** (scoped strictly to what this deployment created):

```bash
ssh root@srv1727766.hstgr.cloud '
  systemctl disable --now caddy &&
  apt-get purge -y caddy &&
  rm -rf /var/www/portfolio /etc/caddy /var/lib/caddy /var/log/caddy \
         /etc/apt/sources.list.d/caddy-stable.list \
         /usr/share/keyrings/caddy-stable-archive-keyring.gpg &&
  apt-get update -q'
```

---

## Optional: Docker

If you ever want the site in a container instead (e.g. behind a Dockerised proxy), the `Dockerfile` builds the static export and serves it with Caddy over HTTP on `:80`; `docker-compose.example.yml` publishes it on `127.0.0.1:3100` only, for a TLS-terminating proxy in front.

```bash
cp docker-compose.example.yml docker-compose.yml && cp .env.example .env   # edit values
docker compose up -d --build
```

---

## Placeholders to replace before launch

| Where                                   | What                                                                 |
| --------------------------------------- | -------------------------------------------------------------------- |
| `.env` / build args                     | Site URL, email, GitHub, LinkedIn, résumé PDF                        |
| `lib/site.ts`                           | `location` (currently "Los Angeles, CA" from the design reference)   |
| `content/resume.ts`                     | Employment & education dates; confirm "Go" and "Python" in skills    |
| `content/projects/*.mdx`                | Sections marked `<Placeholder>`; promote `status` when ready         |
| `content/writing/*.mdx`                 | All five articles are `draft` outlines; expand and set `published`   |
| `public/images/*`                       | AI-generated placeholder photography → licensed/personal photos      |
| `public/resume/…pdf`                    | Add the PDF and set `NEXT_PUBLIC_RESUME_PDF_URL`                     |

Microsoft-related content is deliberately kept at a public-disclosure level; the `disclosure` frontmatter field renders that note on each relevant case study.

---

## Architecture notes

- **Static export, not Cache Components.** Next 16 enables Cache Components (`"use cache"`, PPR) by default in new projects. This site turns it off and uses `output: "export"` with classic static generation (`generateStaticParams` + `dynamicParams = false`) because every page can be fully prerendered from the filesystem at build time. The result is plain files — no Node.js in production, and no runtime reads of `content/`. Metadata routes (`sitemap.ts`, `robots.ts`) declare `dynamic = "force-static"` as the export requires.
- **Filtering without a server.** `/writing?topic=…` is handled client-side by `WritingBrowser` (reads `useSearchParams`). The static HTML contains the full unfiltered list as the Suspense fallback, so the page is complete without JavaScript and for crawlers.
- **Minimal client JavaScript.** No animation library: entrance animations are CSS, scroll reveals use IntersectionObserver, parallax is a ~40-line rAF hook, and page transitions use React 19's built-in `<ViewTransition>`. Client components are limited to the navbar, mobile menu, reveal/parallax wrappers, TOC highlighting and the topic filter.
- **Images.** `next/image` still produces responsive `srcset`s, but through a custom loader that points at build-time WebP variants (`scripts/optimize-images.mjs` → `public/images/_opt/`). The hero at 1280px is ~40 KB WebP versus a 212 KB JPEG original. Originals are kept for Open Graph previews.
- **Releases.** Each deploy is a self-contained directory; `current` is swapped with a single `rename(2)`, so a visitor never sees a mix of two builds, and rollback is re-pointing the symlink. Hashed assets are served `immutable`; HTML revalidates via ETag.
- **Accessibility.** Semantic landmarks, skip link, visible focus rings, `aria-current` on active nav/filters, labelled icon buttons, dialog semantics + Escape/focus management for the mobile menu, reduced-motion support throughout.
