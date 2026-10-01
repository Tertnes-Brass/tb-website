import type { ImageMetadata } from 'astro'
import margiePortrait from '../assets/bilder/dirigenter/margie-antrobus.jpg'
import katrinaPortrait from '../assets/bilder/dirigenter/katrina-marzella.webp'

interface Conductor {
  image: ImageMetadata
  imageAlt: string
  name: string
  role: string
  biography: string[]
  sourceLabel: string
  sourceUrl: string
}

// Tertnes Brass appointments supplied by the band. Biographies checked 2026-10-01.
export const conductors: Conductor[] = [
  {
    name: 'Margie Antrobus',
    image: margiePortrait,
    imageAlt: 'Margie Antrobus i mørk dress med dirigentstokk i hånden',
    role: 'Dirigent sesongen 2026/27',
    biography: [
      'Margie S. Antrobus er en britisk dirigent, arrangør og pedagog med base i Bergen. Hun har bakgrunn som barytonist i blant annet Yorkshire Building Society Band og Manger Musikklag, og har studert ved University of Salford og University of Manchester.',
      'Som dirigent har hun samarbeidet med norske og internasjonale brassband, blant annet Tertnes Brass, Manger Musikklag og European Youth Brass Band. Hun er også aktiv som dommer og Yamaha-ambassadør, med musikkglede og utvikling av musikere som en viktig del av arbeidet sitt.',
    ],
    sourceLabel: 'Margies egen biografi',
    sourceUrl: 'https://margieantrobus.com/biography',
  },
  {
    name: 'Katrina Marzella',
    image: katrinaPortrait,
    imageAlt: 'Katrina Marzella i mørk dress med dirigentstokk mot mørk bakgrunn',
    role: 'Dirigent NM Brass 2027',
    biography: [
      'Katrina Marzella-Wheeler er en skotsk dirigent, barytonist og pedagog fra Edinburgh. Hun var solobarytonist i Black Dyke Band fra 2011 til 2020 og vant BBC Radio 2 Young Brass Soloist of the Year i 2004.',
      'Hun har dirigert blant annet Eikanger-Bjørsvik Musikklag, Festival Brass Band og Aldbourne Band. Katrina arbeider for større mangfold på dirigentpodiet og kombinerer dirigering med undervisning og et sterkt engasjement for ny musikk.',
    ],
    sourceLabel: 'Biografi hos The Cooperation Band',
    sourceUrl: 'https://thecooperationband.co.uk/member/katrina-marzella-wheeler/',
  },
]
