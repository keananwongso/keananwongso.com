# keananwongso.com

Personal site for Keanan Wongso. Next.js (App Router) + Tailwind CSS v4 +
Framer Motion + `react-force-graph-2d`. Paper canvas, one gradient bloom,
and an interactive interdependence graph.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All copy and data live in [`lib/content.ts`](lib/content.ts):

- `LINKS` — LinkedIn, GitHub, email (`mailto:`), résumé URL
- `NOW` — the /now page slots (reading / practicing / thinking about, last updated)
- `GRAPH_NODES` / `GRAPH_EDGES` — the interdependence graph

Replace `public/resume.pdf` (currently a placeholder) with the real résumé.

## Deploy to Vercel

```bash
npx vercel
```

or push to GitHub and import the repo at https://vercel.com/new. Zero config
needed — it is a static Next.js app.

## Design tokens

Defined once in [`app/globals.css`](app/globals.css) as CSS variables and
mirrored into Tailwind via `@theme inline`. No hardcoded hex in components.
