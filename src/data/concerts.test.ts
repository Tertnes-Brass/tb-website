import { describe, expect, it } from 'vitest'
import { isUpcomingConcert, type ConcertContent } from '../content/content'
import { toConcert } from './concerts'

const minimalConcert: ConcertContent = {
  id: 'sommerkonsert-2026',
  title: 'Sommerkonsert',
  date: '2026-07-01',
  venue: 'Sted kommer snart',
  address: 'Bergen',
  description: 'Sommerkonsert i sentrum for å avslutte en flott sesong!',
  status: 'annonseres',
  published: true,
}

describe('toConcert', () => {
  it('handles optional fields omitted by Pages CMS', () => {
    const concert = toConcert(minimalConcert)

    expect(concert.time).toBe('TBA')
    expect(concert.program).toEqual([])
    expect(concert.image).toBeUndefined()
    expect(concert.ticketPrice).toBeUndefined()
    expect(concert.childrenFree).toBe(false)
    expect(concert.facebookEventUrl).toBeUndefined()
    expect(concert.extraInfo).toBeUndefined()
  })

  it('keeps the machine-readable date alongside the formatted one', () => {
    const concert = toConcert(minimalConcert)

    expect(concert.isoDate).toBe('2026-07-01')
    expect(concert.date).toContain('2026')
  })

  it('leaves the image undefined when the file is not in src/assets/bilder', () => {
    const concert = toConcert({
      ...minimalConcert,
      image: '/src/assets/bilder/konserter/finnes-ikke.webp',
    })

    expect(concert.image).toBeUndefined()
  })
})

describe('isUpcomingConcert', () => {
  const reference = new Date('2026-07-26T12:00:00')

  it('treats a concert held earlier this year as past', () => {
    expect(isUpcomingConcert({ ...minimalConcert, date: '2026-02-01' }, reference)).toBe(false)
  })

  it('keeps a concert upcoming for the whole day it is held', () => {
    expect(isUpcomingConcert({ ...minimalConcert, date: '2026-07-26' }, reference)).toBe(true)
  })

  it('includes dates that are only announced, not yet confirmed', () => {
    expect(
      isUpcomingConcert({ ...minimalConcert, date: '2026-11-01', status: 'annonseres' }, reference),
    ).toBe(true)
  })

  it('excludes drafts and concerts an editor has archived', () => {
    expect(
      isUpcomingConcert({ ...minimalConcert, date: '2026-11-01', status: 'utkast' }, reference),
    ).toBe(false)
    expect(
      isUpcomingConcert({ ...minimalConcert, date: '2026-11-01', status: 'avholdt' }, reference),
    ).toBe(false)
  })
})
