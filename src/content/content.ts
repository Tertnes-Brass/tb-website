import homePageData from './pages/home.json'

export interface ConcertProgramItem {
  kind: 'korps' | 'verk'
  label: string
  credit?: string
}

export interface ConcertContent {
  id: string
  title: string
  date: string
  time?: string
  venue: string
  address: string
  description: string
  status: 'bekreftet' | 'avholdt' | 'annonseres' | 'utkast'
  published: boolean
  image?: string
  imageAlt?: string
  ticketPrice?: string
  childrenFree?: boolean
  facebookEventUrl?: string
  /** Free-text note shown under the programme, e.g. about refreshments. */
  extraInfo?: string
  program?: ConcertProgramItem[]
}

export type NewsCategory = 'Konkurranse' | 'Konsert' | 'Repertoar' | 'Korpsliv'

export interface NewsContent {
  id: string
  title: string
  category: NewsCategory
  date: string
  summary: string
  /** Full article body as HTML, written in the Pages CMS rich-text editor. */
  body?: string
  image: string
  imageAlt: string
  featured: boolean
  published: boolean
}

/** Besetningsgrupper, i den rekkefølgen de skal vises på nettsiden.
 *  Må holdes i sync med `section`-dropdownen i `.pages.yml`. */
export const MEMBER_SECTIONS = [
  'Kornett',
  'Horn/Flygelhorn',
  'Bariton',
  'Trombone',
  'Euphonium',
  'Tuba',
  'Slagverk',
] as const

export type MemberSection = (typeof MEMBER_SECTIONS)[number]

/** Roller, i besetningsrekkefølge innad i hver gruppe. Må holdes i sync med
 *  `role`-dropdownen i `.pages.yml`. */
export const MEMBER_ROLES = [
  'Soprano',
  'Principal',
  'Solokornett',
  'Repiano',
  '2. Kornett',
  '3. Kornett',
  'Flygelhorn',
  'Solohorn',
  '1. Horn',
  '2. Horn',
  '1. Bariton',
  '2. Bariton',
  '1. Trombone',
  '2. Trombone',
  'Basstrombone',
  'Solo Euphonium',
  'Tutti Euphonium',
  'Eb-Bass',
  'Bb-Bass',
  'Slagverk',
] as const

export interface MemberContent {
  id: string
  name: string
  role: string
  section: MemberSection
  bio?: string
  image?: string
  imageAlt?: string
  published: boolean
  /** Manuell overstyring av rekkefølgen blant medlemmer med samme rolle.
   *  Vanligvis ubrukt – rekkefølgen avgjøres av gruppe, rolle og navn. */
  sortOrder?: number
}

export interface HomePageContent {
  hero: {
    headingLead: string
    headingBurgundy: string
    headingMiddle: string
    headingGold: string
    headingSuffix: string
    description: string
    primaryButtonLabel: string
    secondaryButtonLabel: string
    facts: string
  }
  events: {
    badge: string
    heading: string
    itemLinkLabel: string
    allLinkLabel: string
    emptyText: string
  }
  news: {
    badge: string
    heading: string
    featuredLinkLabel: string
    allLinkLabel: string
    emptyText: string
  }
  gallery: {
    badge: string
    heading: string
    allLinkLabel: string
    items: Array<{
      image: string
      imageAlt: string
    }>
  }
  support: {
    badge: string
    heading: string
    description: string
    primaryButtonLabel: string
    secondaryButtonLabel: string
  }
}

const concertModules = import.meta.glob<ConcertContent>('./concerts/*.json', {
  eager: true,
  import: 'default',
})

const newsModules = import.meta.glob<NewsContent>('./news/*.json', {
  eager: true,
  import: 'default',
})

const memberModules = import.meta.glob<MemberContent>('./members/*.json', {
  eager: true,
  import: 'default',
})

export const concerts = Object.values(concertModules)
  .filter((concert) => concert.published)
  .toSorted((a, b) => a.date.localeCompare(b.date))

/** Concerts still ahead of us, soonest first. */
export const upcomingConcerts = concerts.filter((concert) => isUpcomingConcert(concert))

/** Concerts already held, most recent first. */
export const pastConcerts = concerts
  .filter((concert) => !isUpcomingConcert(concert) && concert.status !== 'utkast')
  .toReversed()

export const news = Object.values(newsModules)
  .filter((article) => article.published)
  .toSorted((a, b) => b.date.localeCompare(a.date))

/** Sorts by section, then role, in besetningsrekkefølge, then an optional
 *  manual `sortOrder` override, then name. This means new members slot in
 *  correctly by default without anyone having to guess a free number. */
function compareMembers(a: MemberContent, b: MemberContent): number {
  const sectionDiff = MEMBER_SECTIONS.indexOf(a.section) - MEMBER_SECTIONS.indexOf(b.section)
  if (sectionDiff !== 0) {
    return sectionDiff
  }

  const roleDiff =
    MEMBER_ROLES.indexOf(a.role as (typeof MEMBER_ROLES)[number]) -
    MEMBER_ROLES.indexOf(b.role as (typeof MEMBER_ROLES)[number])
  if (roleDiff !== 0) {
    return roleDiff
  }

  if (a.sortOrder !== b.sortOrder) {
    return (a.sortOrder ?? Number.POSITIVE_INFINITY) - (b.sortOrder ?? Number.POSITIVE_INFINITY)
  }

  return a.name.localeCompare(b.name, 'nb-NO')
}

export const members = Object.values(memberModules)
  .filter((member) => member.published)
  .toSorted(compareMembers)

export const homePage: HomePageContent = homePageData

export function formatConcertDate(date: string): string {
  return new Intl.DateTimeFormat('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))
}

export function formatNewsDate(date: string): string {
  return new Intl.DateTimeFormat('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))
}

/**
 * A concert counts as upcoming until the end of the day it is held. Both
 * confirmed concerts and dates that are only announced ("annonseres") belong on
 * the upcoming list; drafts never do, and "avholdt" is an explicit override an
 * editor can set to archive a concert early.
 */
export function isUpcomingConcert(concert: ConcertContent, referenceDate = new Date()): boolean {
  if (concert.status === 'utkast' || concert.status === 'avholdt') {
    return false
  }

  return new Date(`${concert.date}T23:59:59`) >= referenceDate
}
