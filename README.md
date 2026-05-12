# Kinfolk Kitchen

Small-batch, home-based food and wellness brand — Nashville, TN.

## Quick Start

### 1. Copy your brand images

Place the following files in `public/images/`:

| File | Used for |
|------|----------|
| `logo.jpg` | Favicon, nav bar, hero, footer |
| `baked-goods-photo.jpg` | Hero background, Sourdough Loaf card, About page |
| `sourdough-menu.png` | Decorative feature on Shop page |
| `strawberry-jam.png` | Strawberry Harvest Jam product card |
| `beef-tallow-lotion.jpg` | Beef Tallow Lotion product card |

> Do **not** place `instagram-grid.png` or `instagram-profile.png` in the
> public folder — these are reference-only assets.

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

- **RESEND_API_KEY** — Create a free account at [resend.com](https://resend.com) and paste your key.
- **OWNER_EMAIL** — The email address that receives order notifications.
- **EMAIL_FROM** — Use `onboarding@resend.dev` for testing. Switch to a verified
  domain address (e.g. `orders@kinfolkkitchen.com`) after verifying your domain in Resend.

### 3. Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Deploy to Vercel

```bash
npx vercel
```

Add the environment variables in the Vercel dashboard under
**Project → Settings → Environment Variables**.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, about blurb, featured products |
| `/shop` | Full product catalog (Baked Goods + Home & Body) |
| `/order` | Order form — select items, customer info, pickup/shipping |
| `/about` | Brand story, values, contact |
| `/admin` | Recent orders (no auth — add auth before going public) |

## Order flow

1. Customer fills out the order form at `/order`
2. On submit → order saved to `/tmp/kinfolk-orders.json` + email sent to owner
3. Customer sees confirmation with Venmo payment instructions
4. Owner replies to confirm and coordinate pickup/shipping

## Notes

- Orders in `/tmp` do **not** persist across Vercel deployments. For permanent
  storage, add a database (Vercel Postgres, PlanetScale, Supabase, etc.) and
  update `lib/orders.ts`.
- The `/admin` page has no authentication. Add [NextAuth.js](https://next-auth.js.org/)
  or Vercel password protection before sharing the URL publicly.
