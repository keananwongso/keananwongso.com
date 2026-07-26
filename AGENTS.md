<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# keananwongso.com

Personal design portfolio. Minimal, neutral, editorial — see `GUIDELINE.md` for the
full design spec (palette, typography, layout, routes). Read it before making design
or content changes.

## Design rules (don't re-litigate)

- Neutral greyscale palette (`--paper #FAFAF8`, ink family) + ONE accent: peacock blue
  `--accent #1C5D6E`, used only on links, the active filter tab, and text selection.
  No gradient bloom, no second accent, no accent backgrounds. No dark mode.
- Type: Shippori Mincho (serif headings/titles) + Hanken Grotesk (body/labels/UI), via
  `next/font/google`. **Sentence case** for headings.
- Tokens are CSS variables in `app/globals.css`, mirrored via `@theme inline`. **No
  hardcoded hex in components — reference tokens only.**
- Centered single column, `max-w-3xl`.

## Content

All editable content is in `lib/content.ts` (LINKS, CONTACT, INTRO, EXPERIENCE,
PROJECTS, ABOUT, CV). Edit data there, not JSX. Placeholder images live under
`public/projects/` and `public/about/`.

## Commits

One concise sentence, no body, no "Co-Authored-By: Claude" trailer.
