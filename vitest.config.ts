/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

// Astro's Vite config is reused so tests resolve `import.meta.glob` and the
// `astro:assets` image metadata exactly the way the build does.
export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
})
