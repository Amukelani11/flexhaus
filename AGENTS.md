# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

FlexHaus is a frontend-only pnpm monorepo with three Next.js 14 (App Router) variants of a luxury designer brand reseller e-commerce site. No backend, database, auth, or environment variables are required.

### Services

| Variant | Port | Theme |
|---------|------|-------|
| variant-1 | 3001 | NOIR (ultra-luxury editorial) |
| variant-2 | 3002 | FLEX (streetwear/hype) |
| variant-3 | 3003 | ARCHIVE (magazine/curation) |

### Running

- `pnpm dev` — start the consolidated app on port 3000 (all variants at `/noir`, `/flex`, `/archive`)
- `pnpm dev:1` / `pnpm dev:2` / `pnpm dev:3` — start individual variant dev servers (legacy, ports 3001-3003)
- `pnpm build` — production build the consolidated app
- `pnpm build:all` — production build legacy individual variants
- TypeScript check: `npx tsc --noEmit` (from root for the consolidated app)

### Notes

- No ESLint config exists; TypeScript (`tsc --noEmit`) is the sole static analysis tool.
- All product data is hardcoded in each variant's `lib/products.ts` — no API calls or database.
- Cart state is React Context (client-side only, no persistence).
- Product images are loaded from Unsplash CDN; network access is required for images to display.
- No `.env` files or secrets are needed.

### Troubleshooting (Windows)

- **Always use `pnpm dev`** — do not run `next dev` from a global install (`npm i -g next`). That mixes the global Next runtime with `.next` output from this repo and causes errors like `Cannot find module 'next/dist/server/app-render/...'`.
- If you see missing-module errors: stop the server, delete the `.next` folder, run `pnpm install`, then `pnpm dev` again.
- Root scripts invoke `node ./node_modules/next/dist/bin/next` so the **local** Next 14 binary is used even if global `next` is on your PATH.
