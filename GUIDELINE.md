# keananwongso.com — design guideline

The single source of truth for the site. Every design and build decision references
this. If something isn't specified here, default to more whitespace and less color.

> **History:** the original concept was a graph-centric "interdependence" site with a
> warm mauve gradient bloom and mono-caps labels. That was superseded. The site is now
> a minimal design portfolio in the spirit of ethanthansen.com / thinkingmachines.ai /
> castform: neutral, editorial, restrained, with a single accent color used sparingly.
> This file documents the CURRENT design. The restraint is the credibility.

---

## 1. The one-line concept

A calm, neutral, editorial portfolio. Sentence-case serif headings, a clean sans for
everything else, a centered single column with generous whitespace, and exactly one
accent color (peacock blue) that shows up only in a few deliberate spots. No ambient
color, no gradient wash, no dark mode.

---

## 2. Color

Neutral greyscale everything, plus **one** accent used sparingly. This is deliberate.
Do not reintroduce a gradient bloom or a second accent.

### Paper + ink (neutral)
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FAFAF8` | Page background — neutral near-white |
| `--paper-raised` | `#FFFFFF` | Cards, image wells |
| `--ink` | `#1A1A1A` | Headlines, primary text |
| `--ink-soft` | `#4A4A48` | Body paragraphs |
| `--ink-muted` | `#8C8C88` | Labels, captions, secondary |
| `--hairline` | `#E6E5E1` | Borders, dividers (0.5px) |
| `--hairline-strong` | `#CFCEC9` | Dashed dividers, stronger rules |

### The accent — peacock / ocean blue
| Token | Hex | Use |
|---|---|---|
| `--accent` | `#1C5D6E` | Links, active filter tab, selection tint |
| `--accent-hover` | `#16495A` | Link/tab hover |

**Accent appears ONLY here — nothing else:**
- Inline text links (`.link`): peacock, underline that deepens on hover.
- Active project filter tab (All / Design / Software): peacock text + underline.
- Text selection: faint peacock tint.

No accent backgrounds, no colored blobs, no ambient color. Dark mode: none.

---

## 3. Typography

Two families via `next/font/google`.

```css
--font-display: "Shippori Mincho", ui-serif, Georgia, serif;   /* headings, titles, name */
--font-body:    "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif;  /* body, labels, UI */
```

- **Shippori Mincho** (weight 500) — delicate high-contrast Mincho serif. Headings,
  project titles, the name mark, project-page pull-quote statements.
- **Hanken Grotesk** (variable) — clean neutral grotesk. Body, nav, tabs, buttons,
  and the `.label` utility.

### Casing
**Sentence case.** "Welcome to my digital library", "A little bit about me", proper
project titles (Synapse, Naiya). No forced upper/lowercase, except the `.label` utility
where small-caps is intentional (e.g. CV section headings: EDUCATION / EXPERIENCE).

### `.label`
12px Hanken, `--ink-muted`, `text-transform: none`. For captions, metadata, eyebrows.

---

## 4. Layout

- Centered single column, `max-w-3xl`, `px-6`. Nav, content, and footer share the width.
- Generous vertical whitespace. Dashed hairline dividers between home sections.
- **Nav** — top bar: name (`keanan.w`, serif) left; `collection / about / cv` right;
  active link ink, others muted.
- **Footer** — quiet single row: `© 2026 Keanan Wongso` + "Back to top ↑".
- **Cards / image wells** — `--paper-raised`, 12px radius, 0.5px hairline border.
- Fully responsive: project grid 2-col on `sm+`, 1-col mobile; nav wraps.

---

## 5. Pages / routes

1. **`/` — Home.** Serif intro heading + paragraph + "Currently …" role line; dashed
   divider; two-column **Contact** (numbered ↗ links) + **Experience** (neutral dot ·
   company · year); dashed divider; filterable project grid.
2. **`/collection`** — the full project grid (same filter tabs).
3. **`/collection/[slug]`** — project case study: Title / Role / Year metadata row, hero
   image, serif pull-quote statement, long-form body, optional external link.
   Statically generated via `generateStaticParams`.
4. **`/about`** — intro + "Some fun facts" list (inline links) + tilted polaroid photo row.
5. **`/cv`** — typeset resume: Education / Experience / Leadership.

---

## 6. Content

All editable content lives in `lib/content.ts` — edit data, not JSX:
`LINKS`, `CONTACT`, `INTRO`, `EXPERIENCE`, `PROJECTS` (card + case study; `category`
drives the filter tabs), `ABOUT` (fun facts support `{label|href}` inline-link tokens;
photos), `CV`. Placeholder images live in `public/projects/` and `public/about/`
(paper-toned SVGs) — swap for real assets. Case-study body copy is stubbed (`TODO`).

---

## 7. Voice

Short. Direct. No corporate phrasing. No em dashes in prose. Reads like it was written
in 30 seconds after thinking clearly. Ends specific.

---

## 8. Stack

- Next.js (App Router, TypeScript) — Next 16, Turbopack.
- Tailwind CSS v4. Tokens are CSS variables in `app/globals.css`, mirrored into the
  Tailwind theme via `@theme inline`. **No hardcoded hex in components — tokens only.**
- Framer Motion (available; minimal use).
- Fonts: Shippori Mincho + Hanken Grotesk via `next/font/google`.
- Static site, no backend. Deployable to Vercel with zero config.

---

## 9. What this guideline kills

So it never gets re-litigated:
- No gradient bloom, no ambient color wash. Neutral background, forever.
- Exactly one accent (peacock `#1C5D6E`), only on links + active filter tab + selection.
  No second accent, no accent backgrounds.
- No dark mode.
- No interdependence graph. The portfolio grid + case studies are the work.
- Sentence case for headings. No all-lowercase, no title case.
- Centered single column. No hardcoded hex in components.
