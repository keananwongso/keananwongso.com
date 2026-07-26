# keananwongso.com

Personal site for Keanan Wongso. Next.js (App Router) + Tailwind CSS v4 +
Framer Motion. A minimal design portfolio: intro, a filterable project
collection with case-study pages, an about page, and a CV. Warm paper
palette with a quiet gradient bloom; Shippori Mincho + Hanken Grotesk.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Routes

- `/` — intro, contact/experience block, filterable project grid
- `/collection` — the full project grid
- `/collection/[slug]` — project case-study pages (statically generated)
- `/about` — about + fun facts + photos
- `/cv` — typeset resume

## Editing content

All copy and data live in [`lib/content.ts`](lib/content.ts):

- `LINKS` / `CONTACT` — LinkedIn, GitHub, email, résumé
- `INTRO` — home intro heading, body, current-role line
- `EXPERIENCE` — the home experience list (swatch maps to a bloom token)
- `PROJECTS` — each project's card + case study (`statement`, `body`, `link`).
  `category` is `"design"` or `"software"` and drives the filter tabs.
- `ABOUT` — intro, fun facts (`{label|href}` tokens become links), photos
- `CV` — education / experience / leadership entries

Placeholder images live in `public/projects/` and `public/about/` (paper-toned
SVGs). Swap them for real assets and replace `public/resume.pdf`. Case-study
body copy is stubbed (marked `TODO` in `content.ts`).

## Deploy to Vercel

```bash
npx vercel
```

or push to GitHub and import the repo at https://vercel.com/new. Zero config
needed — it is a static Next.js app.

## Design tokens

Defined once in [`app/globals.css`](app/globals.css) as CSS variables and
mirrored into Tailwind via `@theme inline`. No hardcoded hex in components.
