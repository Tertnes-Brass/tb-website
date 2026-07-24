# AI Agent Instructions – Tertnes Brass Website

## Project

Website for Tertnes Brass, an elite-section brass band from Bergen.

- Stack: Astro + TypeScript + Bun + custom CSS
- Rendering: fully static HTML
- Hosting: Cloudflare Workers Static Assets
- Routing: Astro file-based routes in `src/pages/`
- UI language: Norwegian

## Critical rules

1. Always use Bun (`bun install`, `bun run build`, `bun add`).
2. Keep the site statically renderable unless a requirement explicitly needs a
   server runtime.
3. Use `.astro` components. Add browser JavaScript only as progressive
   enhancement for genuine interactivity.
4. Use CSS variables for colors and spacing; do not add inline styles,
   Tailwind, or CSS-in-JS.
5. Every UI change must work in dark and light mode and across mobile and
   desktop sizes.
6. Use semantic HTML and normal `<a href>` links for internal Astro routes.
7. Define TypeScript interfaces and avoid `any`.
8. Add descriptive alt text to meaningful images; use empty alt text for
   decorative images.
9. Use Conventional Commits in English.

## Structure

```text
src/
├── components/   Reusable `.astro` components and matching CSS
├── data/         Typed content data
├── layouts/      Shared page layouts and metadata
├── pages/        File-based routes using Norwegian names
└── styles.css    Global styles and theme variables

public/           Static assets and Cloudflare `_headers`
astro.config.mjs  Static output, canonical site and sitemap
wrangler.jsonc    Workers Static Assets and custom domain
```

## Component pattern

```astro
---
import './MyComponent.css'

interface Props {
  title: string
  description?: string
}

const { title, description } = Astro.props
---

<section class="my-component">
  <h2 class="my-component-title">{title}</h2>
  {description && <p class="my-component-description">{description}</p>}
</section>
```

## Route pattern

Create `src/pages/ny-side.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
---

<BaseLayout title="Ny side">
  <main>
    <h1>Ny side</h1>
  </main>
</BaseLayout>
```

Then add an ordinary internal link:

```html
<a href="/ny-side/">Ny side</a>
```

## Styling

Use variables from `src/styles.css`.

```css
.card {
  padding: var(--spacing-lg);
  background-color: var(--card);
  color: var(--text);
}
```

Keep selectors flat and class names component-oriented. Avoid hardcoded colors
outside the theme variable declarations.

## Browser scripts

Prefer semantic platform features such as `<details>` before JavaScript. When a
script is needed:

- keep it local to the Astro component;
- use typed DOM queries;
- preserve keyboard behavior and ARIA state;
- respect `prefers-reduced-motion`;
- do not introduce a client framework for a small interaction.

## Validation

Before handing off changes:

```bash
bun run test
bun run build
bun run deploy:dry-run
```

Also verify:

- light and dark themes;
- keyboard navigation;
- mobile, tablet and desktop layouts;
- direct navigation to every route;
- sitemap, canonical URLs and 404 output;
- all images have appropriate alt text.

## Cloudflare

Treat `wrangler.jsonc` as the deployment source of truth. Keep the Worker name,
Tertnes Brass account ID and `tertnesbrass.com` custom domain intact. Never
change DNS, redirects, mail records or production deployment without the task
explicitly authorizing it.
