# Changelog — The Flame

Site-level changes outside a template upgrade. Template versions are in coop-site-template's `CHANGELOG.md`.

## Hotfix — 2026-10-30 · [BRA-1248](https://linear.app/brandmerce/issue/BRA-1248)

**Hero photos load fast and fade in.** Every Sanity image URL asks for `auto=format` (AVIF / WebP where the browser
accepts it; the hero PNGs were 0.5–9.7 MB, now 19–141 KB). Hero photos carry a srcset sized to their slot and
`fetchpriority="high"`, and fade in once loaded and decoded (`lib/hero-fade.ts`, inline in `<head>`): visible without
JS, no fade under reduced motion, shown after 4 s or on an error regardless.

**coop-site-template 2.6.3 carries the same change as its default** (BRA-1246), so propagating 2.6.3 keeps it.
This site predates the template lineage; the change was adapted to its own `components/Hero.tsx` (a plain `<img>` in
next/image's fill box, since `unoptimized: true` gives no srcset). If it ever moves onto the template, keep it.
