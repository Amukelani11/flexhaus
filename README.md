# FlexHaus — 3 Website Variants

South Africa's premier designer brand reseller. Three distinct design directions, one brand.

## Quick Start

```bash
# Install (one-time, shared node_modules via pnpm workspace)
pnpm install

# Run any variant
pnpm dev:1   # Variant 1 — NOIR    → http://localhost:3001
pnpm dev:2   # Variant 2 — FLEX    → http://localhost:3002
pnpm dev:3   # Variant 3 — ARCHIVE → http://localhost:3003
```

---

## The Three Variants

### Variant 1 — NOIR (Ultra-Luxury Editorial)
> Port: 3001

Inspired by Celine, Bottega Veneta, The Row.

- **Colors:** Near-black `#0A0A0A` + warm ivory `#F5EFE6` + gold `#C9A84C`
- **Fonts:** Cormorant Garamond (headings) + system sans (body)
- **Animations:** Magnetic custom cursor, clip-path image reveals on scroll, parallax hero, letter-spacing kinetic title, page wipe transitions, hover quick-add slide-in
- **Pages:** Homepage, Products (4-col grid with filter), Product Detail (gallery + size picker), Cart (full page), About

### Variant 2 — FLEX (Streetwear / Hype Culture)
> Port: 3002

Inspired by Supreme, Off-White, Highsnobiety.

- **Colors:** White `#FFFFFF` + near-black `#1A1A1A` + electric yellow `#FFD600`
- **Fonts:** Syne ExtraBold (display) + Space Mono (labels/prices)
- **Animations:** Fixed ticker marquee (NEW DROP · FLEXHAUS · LV · PRADA · NIKE), scan-line hero intro, staggered card entrance (rotate+translate), glitch hover on images, bento-box grid, grid/list view toggle
- **Pages:** Homepage (bento hero, staggered grid), Products (bento grid + list toggle), Product Detail (bordered panel layout), Cart, About

### Variant 3 — ARCHIVE (Magazine / Curation)
> Port: 3003

Inspired by SSENSE, AnOther Magazine, Matches Fashion.

- **Colors:** Off-white `#F8F4EF` + dark charcoal `#2C2820` + terracotta `#C1440E`
- **Fonts:** Playfair Display (editorial) + DM Sans (body) + DM Mono (labels)
- **Animations:** Word-by-word reveal on scroll (GSAP-style), 3D tilt card on mouse move, masonry product grid (columns CSS), parallax split-screen hero, editorial story section with dark panel
- **Pages:** Homepage (split hero, editorial story, masonry grid), Products (masonry + filters), Product Detail (tilt image + word reveal), Cart, About

---

## Shared Features (All Variants)
- 16 products — LV, Prada, Goyard, Nike, Calvin Klein, Versace, Dolce & Gabbana
- ZAR pricing (R format)
- Category + brand filters on products page
- Functional cart with quantity, size, color selection (React Context)
- Cart drawer (slide-in panel) on all pages
- Responsive (mobile-first)
- Performance optimized: GPU-composited animations only, Next.js Image lazy loading, Framer Motion LazyMotion

---

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (custom tokens per variant)
- Framer Motion (page animations, microinteractions)
- next/font (Google Fonts, zero layout shift)
- pnpm workspaces (shared node_modules)
