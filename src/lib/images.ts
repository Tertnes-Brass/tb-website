/**
 * Resolves image paths written by Pages CMS to the build-time metadata that
 * `astro:assets` needs in order to generate responsive, modern-format variants.
 *
 * Pages CMS stores an image field as a repository path such as
 * `/src/assets/bilder/galleri/photo-1.jpg`. Astro can only optimise images it
 * can resolve at build time, so every file under the CMS media root is globbed
 * eagerly and looked up by that exact path.
 */
import type { ImageMetadata } from 'astro'

const imageModules = import.meta.glob<ImageMetadata>(
  '/src/assets/bilder/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default' },
)

/** Widths generated for full-bleed imagery such as gallery tiles. */
export const GALLERY_WIDTHS = [320, 480, 640, 960, 1280]

/** Widths generated for card-sized imagery such as concert and news teasers. */
export const CARD_WIDTHS = [280, 380, 560, 760]

export function resolveImage(path: string | undefined): ImageMetadata | undefined {
  if (!path) {
    return undefined
  }

  return imageModules[path]
}

/**
 * Resolves an image and fails the build when the file is missing, so a broken
 * CMS reference surfaces during `bun run build` instead of on the live site.
 */
export function requireImage(path: string, context: string): ImageMetadata {
  const image = resolveImage(path)

  if (!image) {
    throw new Error(
      `Fant ikke bildet «${path}» (${context}). Bildet må ligge under src/assets/bilder/.`,
    )
  }

  return image
}
