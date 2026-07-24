import { existsSync, readFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
const errors = []

if (!packageJson.dependencies?.astro) {
  errors.push('package.json mangler Astro som dependency')
}

if (!packageJson.scripts?.dev?.startsWith('astro ')) {
  errors.push('dev-scriptet bruker ikke Astro')
}

if (!existsSync('src/pages/index.astro')) {
  errors.push('src/pages/index.astro mangler')
}

if (existsSync('src/routes')) {
  errors.push('den utdaterte TanStack-mappen src/routes finnes fortsatt')
}

if (!existsSync('src/content/pages/home.json')) {
  errors.push('Pages CMS-filen src/content/pages/home.json mangler')
} else {
  const homePage = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'))
  const galleryItems = homePage.gallery?.items

  if (!Array.isArray(galleryItems) || galleryItems.length !== 5) {
    errors.push('forsidegalleriet må inneholde nøyaktig fem bilder')
  } else if (galleryItems.some((item) => item.imageAlt?.trim().length < 10)) {
    errors.push('alle forsidebilder må ha en beskrivende alternativtekst')
  }
}

if (!existsSync('.pages.yml')) {
  errors.push('.pages.yml mangler')
} else {
  const pagesConfig = Bun.YAML.parse(readFileSync('.pages.yml', 'utf8'))
  const pagesGroup = pagesConfig.content?.find((entry) => entry.name === 'sider')
  const homePageEntry = pagesGroup?.items?.find((entry) => entry.name === 'forside')

  if (
    homePageEntry?.type !== 'file'
    || homePageEntry.path !== 'src/content/pages/home.json'
    || homePageEntry.operations?.delete !== false
  ) {
    errors.push('Pages CMS har ikke en låst Forside-kobling til Astro-innholdet')
  }
}

const legacyDependencies = [
  '@tanstack/react-router',
  '@tanstack/react-start',
  'react',
  'react-dom',
].filter((dependency) => packageJson.dependencies?.[dependency])

if (legacyDependencies.length > 0) {
  errors.push(`utdaterte frontend-avhengigheter finnes: ${legacyDependencies.join(', ')}`)
}

if (errors.length > 0) {
  console.error('Astro-baseline feilet:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('Astro-baseline OK')
