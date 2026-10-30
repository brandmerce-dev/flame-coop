import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

/**
 * Every Sanity image URL asks for `auto=format` (2.6.3, BRA-1248): browsers that accept WebP / AVIF get it (a 3 MB
 * hero PNG becomes about 115 KB), anything else (social crawlers) the original format.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format')
}

const HERO_WIDTHS = [480, 800, 1200, 1600, 2000, 2400]

/**
 * A hero photo's attributes (2.6.3, BRA-1248): src at `width`, a srcset up to `max` and never past the photo's own
 * width, `sizes`, high fetch priority, and `data-hero-img`, the marker the hero fade waits on (lib/hero-fade.ts).
 */
export function heroImage(img: unknown, width: number, sizes: string, max = 2400) {
  const i = img as { asset?: { _ref?: string; _id?: string } | null } | null | undefined
  if (!i?.asset) return null
  const own = Number((i.asset._ref ?? i.asset._id ?? '').match(/-(\d+)x\d+-\w+$/)?.[1]) || Infinity
  const top = Math.min(max, own)
  const widths = [...HERO_WIDTHS.filter((w) => w < top), ...(Number.isFinite(top) ? [top] : [])]
  const b = urlFor(i as SanityImageSource)
  return {
    src: b.width(Math.min(width, top)).url(), srcSet: widths.map((w) => `${b.width(w).url()} ${w}w`).join(', '), sizes,
    fetchPriority: 'high' as const, 'data-hero-img': '',
  }
}
