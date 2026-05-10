# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

FlexHaus is a frontend-only pnpm monorepo with a **single consolidated storefront** at `/` — the **Street × Archive** merged experience (fan-voted). Legacy paths (`/noir`, `/archive`, `/prism`, `/velvet`, `/steel`, and bookmarks under `/flex`) redirect to `/` with the same path suffix where applicable (e.g. `/noir/products` → `/products`).

The repo also contains **legacy packages** `variant-1`, `variant-2`, `variant-3`, and `variant-combined` for historical splits; the main app on port 3000 is the root shop only.

### Services

| Route | Description |
|-------|-------------|
| `/`, `/products`, `/about`, `/cart`, etc. | Canonical shop (theme-shop / theme-flex) |
| `/flex`, `/flex/:path*` | Redirect → `/`, `/:path*` |

### Running

- `pnpm dev` — consolidated app on port 3000
- `pnpm build` — production build
- `pnpm dev:1` / `pnpm dev:2` / `pnpm dev:3` — legacy variant packages only
- `pnpm build:all` — build all workspace packages
- TypeScript: `npx tsc --noEmit`

### Notes

- No ESLint; use `tsc --noEmit` for static checks.
- Product data: `lib/products.ts` (no API).
- Cart: React Context (client-only).
- Images: Unsplash (network required).
- No `.env` required.

### Troubleshooting (Windows)

- Use **`pnpm dev`**, not a global `next` binary.
- If module errors: delete `.next`, `pnpm install`, `pnpm dev` again.
