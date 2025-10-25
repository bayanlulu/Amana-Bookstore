## Amana Bookstore

Modern bookstore demo built with Next.js App Router, React, and Tailwind CSS. It showcases a catalog with filtering, featured carousel, book details with reviews, a simple cart (localStorage), and API route examples.

### Features
- **Catalog UI**: Grid and list views with search, genre filter, sorting, and pagination
- **Featured Carousel**: Simple paged carousel for highlighted books
- **Book Details**: Ratings renderer, genres, price, and a reviews section
- **Cart (Client-only)**: Stored in `localStorage`, synced across pages via a custom `cartUpdated` event
- **API Routes**: Example endpoints under `/api/books` and `/api/cart`
- **Responsive Design**: Tailwind CSS v4 styles

### Tech Stack
- **Framework**: Next.js 15 App Router (`/src/app`)
- **UI**: React 19 + Tailwind CSS v4
- **Language**: TypeScript (strict mode)

---

## Getting Started

1) Install dependencies
```bash
npm install
```

2) Run the development server
```bash
npm run dev
```
Visit `http://localhost:3000`.

3) Build and start (production)
```bash
npm run build
npm start
```

4) Lint
```bash
npm run lint
```

---

## Project Structure

```
src/
  app/
    api/
      books/route.ts      # GET all books (from static data)
      cart/route.ts       # Example GET/POST/PUT/DELETE cart endpoints (demo only)
    book/[id]/page.tsx    # Book details + reviews + add-to-cart
    cart/page.tsx         # Cart page (localStorage-backed)
    components/           # UI components (grid, list item, navbar, pagination, etc.)
    data/                 # Static books and reviews data
    layout.tsx            # Root layout + navbar
    page.tsx              # Home page with featured + list
```

Public images live under `public/images/` and are referenced by the seeded books.

---

## Available Scripts

- `npm run dev`: Start Next.js in development mode
- `npm run build`: Create an optimized production build
- `npm start`: Start the production server
- `npm run lint`: Run ESLint (flat config)

---

## API Overview

- `GET /api/books`
  - Returns the full books array from `src/app/data/books.ts`.

- `/api/cart` (demo only)
  - `GET` → Returns a placeholder message
  - `POST` → Echoes received item payload
  - `PUT` → Echoes updated item payload
  - `DELETE?itemId=...` → Echoes removed `itemId`

These handlers illustrate API route structure; they do not persist data. For a real app, integrate a database (Prisma/Drizzle) and authentication.

---

## Data & State

- **Books/Reviews**: Sourced from static files in `src/app/data/`.
- **Cart**: Client-only. Stored in `localStorage` under key `cart` as an array of `{ id, bookId, quantity, addedAt }`.
  - Adding to cart dispatches `window.dispatchEvent(new CustomEvent('cartUpdated'))` so the `Navbar` can update its badge count.
  - The `cart` page reads items from `localStorage` and maps them to book metadata.

---

## Development Notes

- **Next.js App Router**: Pages/components live in `src/app/` and many UI parts are client components (`'use client'`).
- **Tailwind CSS v4**: Included via `@tailwindcss/postcss` in `postcss.config.mjs` and imported in `src/app/globals.css`.
- **React 19**: Uses the latest React. Ensure your tooling supports the listed versions in `package.json`.
- **TypeScript**: Strict settings enabled in `tsconfig.json`. Paths alias `@/*` → `src/*`.

---

## Accessibility & UX

- Buttons/links use clear labels and focusable controls.
- Pagination includes `aria-label`s and current-page states.
- Visual feedback for cart actions (loading and success states).

---

## Deployment

- Any Node host is fine. For a smooth experience, deploy to Vercel:
  - See Next.js docs: [Deployment guide](https://nextjs.org/docs/app/building-your-application/deploying)
  - Or use Vercel dashboard to import the repo and deploy

---

## License

This project is provided as a learning/demo resource. Add your preferred license here if distributing.
