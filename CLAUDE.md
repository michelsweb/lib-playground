# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Development server with live reload (localhost:3000)
npm run build      # Production build to ./dist/
npm run preview    # Production build + serve at localhost:1337
npm run reset      # Remove node_modules, dist, and lock files
```

Individual Gulp tasks can also be run directly:

```bash
npx gulp buildHtml
npx gulp buildStyles
npx gulp buildScripts
npx gulp images
npx gulp copyStaticAssets
npx gulp clean
```

To update all dependencies to their latest versions:

```bash
node updater.js [targetDir] [--clean]
```

## Architecture

This is a static site generator built on Gulp 4. The pipeline compiles sources from `src/` into `dist/`, which is served directly by BrowserSync in development.

**Build pipeline (`gulpfile.js`):**

- **HTML** — Nunjucks templates compiled via `gulp-nunjucks-render`. In production, output is minified; in development, it is Prettier-formatted.
- **Styles** — Entry point: `src/assets/styles/main.scss`. Compiled through Sass → PostCSS (Tailwind, autoprefixer, custom-properties, etc.) → cssnano (prod only). Sourcemaps written in dev.
- **Scripts** — Entry point: `src/assets/scripts/main.ts`. Bundled by `gulp-esbuild` with TypeScript support into a single `main.js`. Modules live under `src/assets/scripts/modules/`.
- **Images** — Processed by `gulp-sharp-responsive` to generate multiple responsive variants (suffixes: `-og`, `-xs`, `-sm`, `-lg`, `-xl`, `-2xl`, `-3xl`).
- **Static assets** — Fonts, icons, and `src/public/` files (favicons, webmanifest) are copied as-is to `dist/`.

**Path/config centralization (`constants/index.js`):**  
All source globs, output paths, preload lists, and site metadata (`META`) are defined here and imported by the gulpfile. The `preloads` object is passed into Nunjucks templates as template data.

**Templating (`src/views/`):**

- `layouts/` — Base HTML shell (`default.njk`) with `{% block content %}` and `{% block aside %}` slots.
- `pages/` — One `.njk` file per output page; compiled directly (glob: `pages/*.*`).
- `partials/` — Reusable includes: `og.njk`, `icons.njk`, `preloads.njk`, `header.njk`, `footer.njk`.
- `data/` — JSON data files available to templates.

**Styles structure (`src/assets/styles/`):**

- `1st-things-1st/` — Font-face declarations and CSS reset (imported first).
- `core/` — Shared SCSS placeholders.
- `modules/` — Animations, layout, typography.
- `blocks/` — Component-scoped styles (header, footer, nav).

**Tailwind** is configured in `tailwind.config.js` with a custom scale (no default font sizes), custom font families (Noto Sans/Serif/Mono), a two-weight system (400/700), and the typography, forms, aspect-ratio, and container-queries plugins.

**Pre-commit hook:** `pretty-quick --staged` runs automatically via Husky on every commit.

**`NODE_ENV`** controls build mode. `development` enables sourcemaps and skips minification; `production` enables minification and strips comments.
