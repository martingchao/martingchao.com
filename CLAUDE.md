# martingchao.com v2.0

## Project Overview
Personal website for Martin Chao (Brazilian). Showcases content, sells infoproducts, displays personal projects. **All content in Brazilian Portuguese.**

## Tech Stack
- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (`pg` library - local dev with pgAdmin, Vercel/Neon for prod)
- **Payments**: Stripe Checkout (redirect flow), API version `2026-01-28.clover`
- **Animations**: Framer Motion
- **Auth**: Admin-only (JWT via `jose`, password-based)
- **Icons**: `react-icons`
- **Hosting**: Vercel

## Key Decisions
- No user auth - customers buy via Stripe, get downloads via email
- Admin-only auth: password + JWT httpOnly cookie (24h expiry)
- Apple-inspired design: bright colors, gradients, Inter font
- Products stored in PostgreSQL with admin CRUD panel
- Prices stored in cents (price_cents field), currency default BRL
- Free products have price_cents = 0
- Instagram, TikTok, X/Twitter social links are placeholders (TBD)

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout (Inter font, Navbar, Footer, pt-BR metadata)
│   ├── page.tsx                # Landing page (Hero + FeaturedProducts + SocialProof)
│   ├── globals.css             # Tailwind v4 directives + custom CSS vars + gradient utilities
│   ├── produtos/page.tsx       # Products catalog
│   ├── sobre/page.tsx          # About me (experience, education, social links)
│   ├── projetos/page.tsx       # Personal projects ("coming soon" placeholder)
│   ├── not-found.tsx           # Custom 404 in Portuguese
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # Robots.txt (blocks /admin/ and /api/)
│   ├── admin/
│   │   ├── page.tsx            # Admin login
│   │   └── produtos/page.tsx   # Product CRUD dashboard
│   └── api/
│       ├── admin/auth/route.ts # POST: admin login
│       ├── products/route.ts   # GET (public) / POST (admin)
│       ├── products/[id]/route.ts # GET / PUT / DELETE (admin)
│       ├── checkout/route.ts   # POST: create Stripe Checkout session
│       └── webhook/route.ts    # POST: Stripe webhook handler
├── components/
│   ├── layout/   (Navbar, Footer)
│   ├── landing/  (Hero, FeaturedProducts, SocialProof)
│   ├── products/ (ProductCard, ProductGrid)
│   └── ui/       (AnimatedSection, Button, Card)
├── lib/
│   ├── db.ts                   # PostgreSQL connection pool (pg)
│   ├── stripe.ts               # Stripe client init
│   ├── auth.ts                 # JWT sign/verify helpers
│   └── utils.ts                # formatPrice(), slugify()
├── middleware.ts               # Protects /admin/produtos/* routes
└── types/index.ts              # Product, Order, Project interfaces
```

## Database
- Migration SQL: `src/lib/migrations/001_create_tables.sql`
- Tables: `products`, `orders`, `projects`
- Currently uses **mock data** in page files (DB not yet connected)
- To connect: set `DATABASE_URL` in `.env.local` and run the migration SQL

## Environment Variables (.env.local)
```
DATABASE_URL=postgresql://localhost:5432/martingchao
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_PASSWORD=changeme
ADMIN_SESSION_SECRET=change-this-to-a-random-secret-string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Social Media Links
| Platform  | URL |
|-----------|-----|
| YouTube   | https://www.youtube.com/@martingchao |
| LinkedIn  | https://www.linkedin.com/in/martingarciachao/ |
| GitHub    | https://github.com/martingchao |
| Substack  | https://martinchao.substack.com/ |
| Instagram | Placeholder (#) |
| TikTok    | Placeholder (#) |
| X/Twitter | Placeholder (#) |

## Notes
- Next.js 16 warns about middleware deprecation ("use proxy instead") - middleware still works fine
- Stripe products/prices must be created in Stripe Dashboard and their Price IDs stored in `products.stripe_price_id`
- Product seed data: "Planilha - 3 Demonstrações Financeiras Conectadas" (R$ 29,90 placeholder price)
- The `DELETE /api/products/[id]` endpoint soft-deletes (sets `is_active = false`)
