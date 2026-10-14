# personal-portfolio

Birhanu G.'s personal website, built with [Next.js](https://nextjs.org) and deployed to GitHub Pages at
https://gutemag.github.io/personal-portfolio/.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000 (draft posts are shown)
npm run build    # static site in ./out (drafts are left out)
```

## Editing content

- **Home page** (about, education, skills, projects, contact): `src/content/profile.ts`
- **Images, CV and favicons**: `public/`
- **Skill icons**: `src/data/icons.json` (SVG markup keyed by name)
- **Blog posts**: one Markdown file per post in `content/blog/`. The file name is the URL slug.

A new post looks like this:

```markdown
---
title: 'My Post'
date: '2026-01-31'
description: 'Optional one-line summary for the blog list'
tags: [python, django]
draft: false
---

Post content in Markdown...
```

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yaml`).
