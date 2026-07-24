# Tertnes Brass Website

Official website for Tertnes Brass, an elite-section brass band from Bergen.

The site is a statically generated Astro application deployed with Cloudflare
Workers Static Assets at [tertnesbrass.com](https://tertnesbrass.com).

## Stack

- Astro with static output
- TypeScript in strict mode
- Bun for dependencies and scripts
- Custom CSS with light and dark themes
- Cloudflare Workers Static Assets and Workers Builds

Astro components render to HTML by default. The navigation, theme toggle and
ambient hero video use small browser scripts without a client framework.

## Development

```bash
bun install
bun run dev
```

The development server runs at `http://localhost:3000`.

## Validation

```bash
bun run check
bun run test
bun run build
bun run preview
```

`bun run build` type-checks the project and generates the production site in
`dist/`.

## Deployment

The checked-in [`wrangler.jsonc`](./wrangler.jsonc) is the deployment source of
truth. It configures:

- Worker name: `tertnesbrass-website`
- Cloudflare account: Tertnes Brass
- Static asset directory: `dist`
- Custom domain: `tertnesbrass.com`
- Preview URLs for non-production versions

Deploy the current checkout manually:

```bash
bun run deploy:dry-run
bun run deploy
```

### Workers Builds

The GitHub repository `Tertnes-Brass/tertnesbrass` is connected to Cloudflare
Workers Builds with these settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `bun run build` |
| Deploy command | `bunx wrangler deploy` |
| Preview deploy command | `bunx wrangler versions upload` |
| Root directory | `/` |

Every push to `main` builds and deploys production. Other enabled branches
receive Cloudflare preview versions.

### Domains

`tertnesbrass.com` is the canonical website domain. The `.no` zone should keep
its existing mail records and use Cloudflare Redirect Rules for permanent
website redirects:

- `tertnesbrass.no/*` → `https://tertnesbrass.com/$1`
- `www.tertnesbrass.no/*` → `https://tertnesbrass.com/$1`

Preserve both the path and query string. DNS records make the old hostnames
reachable through Cloudflare; the Redirect Rule performs the HTTP redirect.

## Project structure

```text
src/
├── components/   Reusable Astro components and component CSS
├── data/         Typed site data
├── layouts/      Shared document layout and metadata
├── pages/        File-based routes
└── styles.css    Global theme variables and base styles

public/           Static images, video, icons, headers and robots.txt
astro.config.mjs  Static site and sitemap configuration
wrangler.jsonc    Cloudflare deployment and custom-domain configuration
```

## Conventions

- Use Bun, never npm, pnpm or Yarn.
- User-facing text is Norwegian; code and documentation are English.
- Use CSS variables for colors and spacing.
- Keep component styles in separate CSS files.
- Test dark and light themes and mobile/desktop layouts.
- Include descriptive alternative text on meaningful images.
- Use Conventional Commits.
