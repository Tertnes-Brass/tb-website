import type { ImageMetadata } from 'astro'
import {
  concerts as contentConcerts,
  pastConcerts as contentPastConcerts,
  upcomingConcerts as contentUpcomingConcerts,
  formatConcertDate,
  type ConcertContent,
} from '../content/content'
import { resolveImage } from '../lib/images'

export interface ConcertProgram {
  type: 'band' | 'piece'
  title: string
  composer?: string
  arranger?: string
}

export interface ConcertImage {
  source: ImageMetadata
  alt: string
}

export interface Concert {
  id: string
  title: string
  date: string
  /** Machine-readable date, for <time datetime> and structured data. */
  isoDate: string
  time: string
  venue: string
  address: string
  image?: ConcertImage
  description?: string
  program?: ConcertProgram[]
  ticketPrice?: string
  childrenFree?: boolean
  facebookEventUrl?: string
  extraInfo?: string
  status: 'confirmed' | 'tba'
}

export function toConcert(concert: ConcertContent): Concert {
  const isPlaceholder = concert.status === 'annonseres'
  const image = resolveImage(concert.image)

  return {
    id: concert.id,
    title: concert.title,
    date: formatConcertDate(concert.date),
    isoDate: concert.date,
    time: concert.time || 'TBA',
    venue: concert.venue,
    address: concert.address,
    image: image
      ? {
          source: image,
          alt: concert.imageAlt || concert.title,
        }
      : undefined,
    description: concert.description,
    program: (concert.program ?? []).map((item) => ({
      type: item.kind === 'korps' ? 'band' : 'piece',
      title: item.label,
      composer: item.credit,
    })),
    ticketPrice: concert.ticketPrice || undefined,
    childrenFree: concert.childrenFree ?? false,
    facebookEventUrl: concert.facebookEventUrl || undefined,
    extraInfo: concert.extraInfo || undefined,
    status: isPlaceholder ? 'tba' : 'confirmed',
  }
}

export const concerts: Concert[] = contentConcerts.map(toConcert)
export const upcomingConcerts: Concert[] = contentUpcomingConcerts.map(toConcert)
export const pastConcerts: Concert[] = contentPastConcerts.map(toConcert)
