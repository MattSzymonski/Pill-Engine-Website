# Pill Engine Docs

This project builds the Pill Engine guide and generated API reference. It is built with
[VitePress](https://vitepress.dev).

## Scripts

| Command | Purpose |
|---|---|
| `npm run docs:dev` | Start the local dev server with hot reload |
| `npm run docs:build` | Build the static site into `.vitepress/dist/` |
| `npm run docs:preview` | Serve the last build locally |

## Layout

- `pages/` — all content as markdown files. Subdirectories become navigation
  sections (configured in `.vitepress/config.mts`).
- `pages/public/` — static assets served from the site root (favicons, fonts).
- `.vitepress/config.mts` — site config, sidebar, head metadata.
- `.vitepress/theme/` — custom theme:
  - `styles.css` — VitePress-specific styling built on the shared tokens.
  - `index.ts` — theme entry point (route handling, scroll progress bar).
  - `mermaid.ts` — click-to-enlarge lightbox for Mermaid diagrams.

## Shared styling with rustdoc

`pill_style.css` (repository root) is the single source of truth for colors,
syntax accents, and typography. The Rust workspace consumes the same file
via `Rust-Hybrid-ECS/.cargo/config.toml`:

```toml
[build]
rustdocflags = ["--extend-css", "../Pill-Engine-Website/pill_style.css"]
```

so the `cargo doc` output for `pill_engine`/`pill_host` matches this site.
When changing `pill_style.css`, verify both sides:

- docs: `npm run docs:build`
- API docs: `cargo doc -p pill_engine --no-deps` in the Rust workspace
