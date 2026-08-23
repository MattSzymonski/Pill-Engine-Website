# Pill Guide

This project builds the static Pill Guide website, the primary reference
documentation for developing projects with Pill. It is built with
[VitePress](https://vitepress.dev).

## Scripts

| Command | Purpose |
|---|---|
| `npm run guide:dev` | Start the local dev server with hot reload |
| `npm run guide:build` | Build the static site into `.vitepress/dist/` |
| `npm run guide:preview` | Serve the last build locally |

## Layout

- `pages/` — all content as markdown files. Subdirectories become navigation
  sections (configured in `.vitepress/config.mts`).
- `pages/public/` — static assets served from the site root (favicons, fonts).
- `.vitepress/config.mts` — site config, sidebar, head metadata.
- `.vitepress/theme/` — custom theme:
  - `styles.css` — VitePress-specific styling built on the shared tokens.
  - `index.ts` — theme entry point (route handling, scroll progress bar).
  - `mermaid.ts` — click-to-enlarge lightbox for Mermaid diagrams.
- `../pill_style.css` (repository root) — the design system shared by the
  landing page, the guide, and the rustdoc API docs: colors, fonts, sizes,
  roundness, gradients, shadows, glass and syntax accents, plus a rustdoc
  theme mapping section (see below).

## Shared styling with rustdoc

`../pill_style.css` (repository root) is the single source of truth for colors,
syntax accents, and typography. The Rust workspace consumes the same file
via `Rust-Hybrid-ECS/.cargo/config.toml`:

```toml
[build]
rustdocflags = ["--extend-css", "../Pill-Engine-Website/pill_style.css"]
```

so the `cargo doc` output for `pill_engine`/`pill_host` matches this site.
When changing `pill_style.css`, verify both sides:

- guide: `npm run guide:build`
- API docs: `cargo doc -p pill_engine --no-deps` in the Rust workspace