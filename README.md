# leonio.github.io

My personal blog: <https://leonio.github.io>

Built with [Astro](https://astro.build) on the
[AstroPaper](https://github.com/satnaing/astro-paper) theme, restyled with a
custom "Paper & Ink" palette. Hosted on GitHub Pages.

## Writing a post

Add a Markdown file to `src/content/posts/`. The filename becomes the URL.

```md
---
title: "My new post"
description: "One-line summary, used for SEO and social cards"
pubDatetime: 2026-10-01T09:00:00Z
tags: [notes]
draft: false
---

Write Markdown here.
```

Push to `main` and the site deploys automatically. Set `draft: true` to keep a
post unpublished. See `src/content/posts/hello-world.md` for all the options.

The About page is `src/content/pages/about.md`. Site-wide settings (title,
description, socials, etc.) are in `astro-paper.config.ts`.

## Local development

Requires Node 24 (see `.nvmrc`). The right pnpm version is picked up from
`packageManager` via corepack.

```sh
corepack enable
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # type-check, build and index search into dist/
pnpm lint && pnpm format:check
```

## What's included

- **SEO:** canonical URLs, meta descriptions, Open Graph and Twitter cards,
  JSON-LD structured data, `sitemap-index.xml`, `robots.txt` and an RSS feed
  (`/rss.xml`).
- **Social images:** a branded 1200×630 OG image is generated for every post
  (and the site itself) at build time.
- **Search** via Pagefind, plus tags and an archive.
- **Light/dark mode** that follows the system preference, with a toggle.
- **Self-hosted fonts** (Inter and JetBrains Mono via `@fontsource`), so there
  are no third-party font requests.
- **Analytics:** Cloudflare Web Analytics (cookieless). It is only included
  when a token is configured.
- **Renovate** keeps dependencies and GitHub Actions up to date.

## One-time setup

1. **Enable Pages.** Go to Settings → Pages → Build and deployment, and set
   Source to **GitHub Actions**.
2. **Install Renovate.** Install the [Renovate GitHub App](https://github.com/apps/renovate)
   on this repository.
   - It opens an onboarding PR, then runs weekly (Monday mornings, UK time).
   - Minor and patch updates are auto-merged once CI passes. Major updates
     (e.g. a new Astro major) are left as PRs for review.
   - The Dependency Dashboard issue shows everything that's pending.
3. **Cloudflare Web Analytics.**
   - In the Cloudflare dashboard → Web Analytics, add the site
     `leonio.github.io` and copy the token from the JS snippet.
   - Add it as a repository **variable** (not a secret) named
     `PUBLIC_CF_ANALYTICS_TOKEN`. Variables are under Settings → Secrets and
     variables → Actions → Variables.
   - Re-run the deploy workflow so the new token takes effect.

## Submitting to search engines

1. **Google Search Console**
   - Add a _URL prefix_ property for `https://leonio.github.io/` and choose the
     **HTML tag** verification method.
   - Copy the `content` value into a repository variable named
     `PUBLIC_GOOGLE_SITE_VERIFICATION`.
   - Redeploy, then click **Verify**.
   - Under Sitemaps, submit `sitemap-index.xml`.
2. **Bing Webmaster Tools**
   - The simplest route is **Import from Google Search Console**.
   - Or use meta-tag verification: set `PUBLIC_BING_SITE_VERIFICATION` and
     redeploy, then submit `https://leonio.github.io/sitemap-index.xml`.

## Credits

Theme: [AstroPaper](https://github.com/satnaing/astro-paper) by Sat Naing (MIT).
