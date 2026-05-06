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

- `pnpm dev:1` / `pnpm dev:2` / `pnpm dev:3` — start individual dev servers
- `pnpm build:all` — production build all variants
- TypeScript check: `npx tsc --noEmit` inside any variant directory

### Notes

- No ESLint config exists; TypeScript (`tsc --noEmit`) is the sole static analysis tool.
- All product data is hardcoded in each variant's `lib/products.ts` — no API calls or database.
- Cart state is React Context (client-side only, no persistence).
- Product images are loaded from Unsplash CDN; network access is required for images to display.
- No `.env` files or secrets are needed.
