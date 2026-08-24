# Pill Engine Website

This repository builds and deploys the Pill landing page and documentation:

- **https://pill.rocks** → the landing page (`landing_page/`)
- **https://docs.pill.rocks** → the VitePress documentation (`docs/`), with
  the guide at `/guide/` and the generated API reference at `/reference/`

## Development

- `npm run dev` - Start both the landing page and docs development servers.
- `npm run build` - Build the landing page into `dist/` and the docs into
  `dist-docs/` (this is what CI runs before deploying).
- `npm run preview` - Preview the landing page production build.
- `npm run install:all` - Install dependencies for both workspace projects.

For documentation structure and generation details, see `docs/README.md`.

