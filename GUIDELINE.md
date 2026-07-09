# keananwongso.com — Brand Guideline

The single source of truth for the site. Every design and build decision references this. If something isn't specified here, default to more whitespace and less color.

---

## 1. The one-line concept

Paper canvas, generous whitespace, tiny mono-caps labels doing the structural work, and one soft gradient bloom as the only color on the site. That bloom drifts as you scroll. The restraint is the credibility. The drift is the proof you can build.

Two references this is synthesized from:
- **Artisanal modernism** gives the structure: off-white paper, huge whitespace, crisp mono-caps labels, confident and adult.
- **Dreamcore** gives the emotion: one soft blooming gradient behind editorial serif type, warm and a little dreamy.

The whole design lives in the tension between those two. Mono-caps reads precise and technical. Serif reads human and editorial. Gradient reads warm and memorable. None of them fight because each covers a different register.

---

## 2. Color

There is no accent color. The gradient bloom is the entire color system. This is deliberate and permanent. Do not add a terracotta, green, or blue accent anywhere.

### Paper (the canvas)
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F7F4EE` | Page background everywhere |
| `--paper-raised` | `#FBF9F5` | Cards, raised surfaces (barely lighter) |
| `--ink` | `#24211C` | Primary text, headlines |
| `--ink-soft` | `#55504A` | Body paragraphs |
| `--ink-muted` | `#8A8177` | Mono labels, captions, secondary |
| `--hairline` | `#E4DED3` | Borders, dividers (0.5px always) |
| `--hairline-strong` | `#C9C1B4` | Button borders, hover states |

### The gradient bloom
Three stops. Soft mauve into lilac into warm peach, dissolving into paper. This is the ONLY color on the site.

| Token | Hex | Position |
|---|---|---|
| `--bloom-1` | `#E9C9E4` | Mauve (core) |
| `--bloom-2` | `#D9C4E8` | Lilac (mid) |
| `--bloom-3` | `#F3D9C8` | Warm peach (outer) |
| dissolve | `rgba(247,244,238,0)` | Fades to paper |

Canonical CSS:
```css
background: radial-gradient(
  circle at 40% 40%,
  var(--bloom-1) 0%,
  var(--bloom-2) 28%,
  var(--bloom-3) 55%,
  rgba(247,244,238,0) 78%
);
filter: blur(8px);
```

Dark mode: none. Single-mode site. Paper is the identity.

---

## 3. Typography

Two families. One serif for the moments that matter, one mono for structure. No sans-serif body font that competes. Body text uses the serif's companion or a clean neutral sans (see below).

### Display serif — GT Alpina
Editorial, high-contrast, premium. Used only for headlines and section titles. Big, sparse, never for body.

GT Alpina is licensed (paid). **Free fallback: Fraunces** (Google Fonts, `Fraunces:opsz,wght@9..144,400`). Nearly identical high-contrast editorial character. Build with Fraunces first; swap to real Alpina later if wanted. The CSS variable stays the same so the swap is one line.

```css
--font-display: "GT Alpina", "Fraunces", Georgia, serif;
```

### Mono labels — IBM Plex Mono
The signature. Every label, tag, nav item, metadata line, timestamp. Always uppercase, always letter-spaced. Neutral and precise, never gimmicky.

```css
--font-mono: "IBM Plex Mono", ui-monospace, monospace;
```

Mono label spec: `text-transform: uppercase; letter-spacing: 0.16em–0.20em; font-size: 11–12px; color: var(--ink-muted);`

### Body text
For paragraphs longer than a sentence, use a quiet neutral sans so the serif stays special. **Inter** or **DM Sans** at 16px, line-height 1.7, `--ink-soft`. The serif is a spice, not the meal.

```css
--font-body: "DM Sans", system-ui, sans-serif;
```

### Type scale
| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero headline | display | 62px | 400 | line-height 1.02, letter-spacing -0.01em |
| Section title | display | 38px | 400 | |
| Project title | display | 24px | 400 | |
| Body | body | 16px | 400 | line-height 1.7, max-width ~40ch |
| Mono label | mono | 11–12px | 400 | uppercase, 0.16–0.20em tracking |
| Mono nav | mono | 11px | 400 | uppercase, 0.16em tracking |

Sentence case for serif headlines. UPPERCASE only for mono labels. Never title case.

---

## 4. The signature element — the interdependence graph

This is the thing people remember and the reason the whole site exists. It's not a projects list. It's the "about me," rendered as a force-directed graph that argues Keanan's actual thesis: nothing stands alone, skills compound across domains, everything connects.

**The concept:** as you scroll past the hero, the page becomes an interactive graph. Nodes are facets of Keanan, not just projects: the domains (music, meditation, movement, building) and the work (Covena, BizTech, Synapse, Naiya, Lockout, MathCom). Edges connect things that share a thread. Music connects to the projects because he approaches code the way he approaches violin. Meditation connects to how he works. The projects connect to each other by shared tech or shared purpose.

**The interaction:**
- Hover (or tap) a node: it and its directly connected nodes highlight, the connecting edges emphasize/pulse, everything else dims. You're seeing how one part of him links to the rest.
- Click a node: opens a small panel or expands inline with the detail (project description, or a sentence about that facet). Uses the bloom gradient as the panel accent.
- The graph is gently alive at rest: slow drift/float on the nodes (force simulation settling), never frantic. Ambient, not busy.
- One node peeks just above the fold in the hero so the visitor knows to scroll into it. No "scroll down" text.

**Build approach:** force-directed graph. `react-force-graph-2d` (fast, canvas-based, handles the physics) or D3 force simulation if more control is wanted. Nodes styled as paper-colored circles with mono-caps labels. Edges are hairline. Highlighted state uses ink for emphasis and dims the rest to `--ink-muted` at low opacity. Keep node count human, roughly 10–14, so it reads clearly and doesn't turn into a hairball.

**Node set (starting point):**
- Domains: `MUSIC`, `MEDITATION`, `MOVEMENT`, `BUILDING`
- Work: `COVENA` (FDE), `BIZTECH` (partnerships)
- Projects: `SYNAPSE`, `NAIYA`, `LOCKOUT`, `MATHCOM`, `JIPT`
- Optional center node: `KEANAN` that everything links to, or leave it implicit.

**Edges (the argument, examples):**
- MUSIC ↔ BUILDING (approaches code like an instrument, system with structure underneath)
- MEDITATION ↔ BUILDING (discipline, daily practice)
- BUILDING ↔ all projects
- SYNAPSE ↔ NAIYA (both Next.js, both AI)
- LOCKOUT ↔ MEDITATION (accountability, behavior)
- COVENA ↔ SYNAPSE (multi-agent work)
- etc. Draw the edges that are actually true, the honesty is what makes it land.

**Accessibility:** the graph must have a text fallback. Below or behind it, the same information as a plain semantic list (projects + facets) so it's readable without JS and by screen readers. `prefers-reduced-motion`: freeze the physics, static layout, hover-highlight still works.

---

## 4b. Secondary element — gradient drift

Supporting texture, not the star. The single bloom (section 2) drifts slowly as you scroll, migrating from the hero's top-right corner across the viewport as you move down the page. Eased and smoothed (lerp/spring, lags gently behind scroll), slow enough to feel ambient. Sits behind all content, never over text. `prefers-reduced-motion`: static in the hero corner, no drift. One bloom on screen, ever. Framer Motion `useScroll` + `useSpring` is the clean implementation.

The drift is the craft layer (proves smooth technical build). The graph is the personality layer (proves who Keanan is). Together: playful but credible.

---

## 5. Layout principles

- **Whitespace is the container.** No card grids fighting for space. Sections breathe. Big top/bottom padding (80–120px between sections on desktop).
- **Left-aligned, not centered.** Content anchors left with a wide right margin. The whitespace on the right is where the bloom lives.
- **Mono labels caption everything.** Every section opens with a tiny mono-caps label above the serif title (like `FORWARD DEPLOYED ENGINEER / VANCOUVER × JAKARTA` above the hero). This is the structural rhythm.
- **Hairline borders only.** 0.5px, `--hairline`. No heavy rules, no boxes with thick borders, no shadows except functional.
- **No rounded corners on the paper.** Buttons are pill (100px radius) or hairline-bordered. Cards get 12px. The page itself is flat paper.

---

## 6. Pages

Keep it to three routes. Shippable soon beats comprehensive.

1. **`/` — Home.** Hero (mono label + serif greeting, one graph node peeking above the fold). Scroll into the interdependence graph (section 4), which IS the about-me and the work, combined. No separate projects list or bio paragraph on the home page, the graph replaces both. A minimal footer with links (LinkedIn, GitHub, email, résumé).
2. **`/now`** — the personal, honest page. What you're building, reading, practicing right now. Updates over time. This is where the interdependence thread lives (music, meditation, movement as one system). Genuinely personal, low-polish, warm.
3. **`/about`** or a contact footer — bio, links (LinkedIn, GitHub, email), résumé.

Project detail pages (`/work/[slug]`) optional, add later. Ship the three first.

---

## 7. Voice

Short. Direct. No corporate phrasing. No em dashes in prose. Reads like you wrote it in 30 seconds after thinking clearly, not 30 minutes of polishing. Ends specific.

### Hero (LOCKED)

The hero is deliberately minimal. No clever headline. The warmth is the hook (inspired by Keanan's real "Hi, I'm Keanan" about copy). The graph below is what actually tells people who he is, so the hero doesn't try to.

Mono label:
`SOPHOMORE / UBC COMPUTER SCIENCE / VANCOUVER × JAKARTA`

Headline (in the big display serif):
> Hi, I'm Keanan, a sophomore at UBC studying CS.

No sub-paragraph, no bridge line, no "scroll to learn more" text. The scroll cue is diegetic: the first graph node peeks just above the fold so the visitor sees there's something to scroll into. The visual does the work, no instruction copy.

### About (draft, pulled from what I know)
> I grew up in Jakarta and came to UBC on scholarship after a gap year I spent building. My dad teaches Dhamma and my parents run a music business, so I grew up around two things: the idea that nothing stands alone, and the discipline of practicing something every day until it becomes yours. I play violin and piano, though these days I approach music the way I approach code, as a system with structure underneath. I journal by hand every night. I build software that works.
>
> The thread through all of it is interdependence. I don't think growth happens in isolation, and I don't think skills stay in their lanes. The way I frame a problem in one place shows up everywhere else.

### /now (draft skeleton, you fill the specifics)
> **Right now**
> Building client deployments as an FDE at Covena. Running partner outreach for BizTech's 2026/27 season. Second-year CS courseload. Reading [ ]. Practicing [ ]. Thinking about [ ].
> Last updated [date].

### Project descriptions (one line each, from what I know)
- **Synapse** — multi-agent AI canvas. ProduHacks 2025. Live at trysynapse.co.
- **Naiya** — adaptive planning app. BizTech Kickstart 2025. Next.js, Supabase.
- **Lockout** — social accountability app. nwHacks 2026. React Native, Firebase, Gemini.
- **MathCom** — nonprofit math learning platform with an AI tutoring layer. 15-person team, now inactive.
- **JiPT** — LLM training data pipeline. Tesseract OCR, Gemini classification, 500+ JSONL pairs.

Pick the 3–4 strongest for the home list. Synapse, Naiya, and Lockout are the most recent and recruitable. MathCom shows scale. JiPT shows depth.

---

## 8. Stack (for the build)

- Next.js (App Router, latest stable)
- Tailwind CSS with the tokens above as CSS variables + theme extension
- Framer Motion (for the gradient drift)
- Fonts: Fraunces + IBM Plex Mono + DM Sans via `next/font/google`
- Vercel hosting
- No backend needed for v1 (drop the globe and note-wall from the June direction, they were the over-scope). Add later if wanted.

---

## 9. What this guideline kills

So it never gets re-litigated:
- No accent color. The bloom is the color. Forever.
- No dark mode. Paper is the identity.
- No globe, no note wall, no moderation API for v1. The interdependence graph is the one interactive centerpiece.
- No clever headline. The hero is "Hi, I'm Keanan, a sophomore at UBC studying CS." and nothing else. The graph does the talking.
- No separate projects grid or bio paragraph on the home page. The graph is both.
- No centered layouts. Left-anchored, bloom lives in the right whitespace.
- No template aesthetic borrowed wholesale. This is the synthesis, not Anthropic-cloning or TBC-cloning.