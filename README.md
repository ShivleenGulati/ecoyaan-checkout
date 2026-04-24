# Ecoyaan Checkout Flow — Enhanced v2

## What's New (April 2025 Update)

- ✅ **Multiple Addresses** — Add, select, and remove multiple shipping addresses
- ✅ **Persistent State** — All addresses and step progress saved via `localStorage` (survives page reload)
- ✅ **Sticky Bottom Bar** — Back + Next buttons always visible at the bottom on all screens
- ✅ **Fully Mobile Responsive** — Works cleanly on all screen sizes
- ✅ **Improved UI** — Elegant green-themed design with Playfair Display + DM Sans fonts, smooth transitions

## Architecture

- **Framework**: Next.js 15 (App Router)
- **SSR**: Cart data fetched server-side in `page.tsx` (Server Component) via `/api/cart`
- **State**: React Context API (`CartContext.tsx`) — shared across all steps
- **Persistence**: `localStorage` for addresses and step progress
- **Styling**: Plain CSS with CSS variables (no Tailwind dependency)
- **TypeScript**: Strict mode enabled

## Project Structure

```
src/
├── app/
│   ├── api/cart/route.ts      # Mock cart API (SSR data source)
│   ├── page.tsx               # Server Component — fetches cart via SSR
│   ├── CheckoutClient.tsx     # Client orchestrator with sticky nav
│   └── globals.css            # All styles
├── components/
│   ├── Header.tsx             # Logo + stepper
│   ├── CartStep.tsx           # Step 1: Cart & price summary
│   ├── AddressStep.tsx        # Step 2: Multiple addresses + form
│   ├── ConfirmStep.tsx        # Step 3: Order confirmation
│   └── SuccessStep.tsx        # Post-payment success screen
└── context/
    └── CartContext.tsx        # Global state + localStorage persistence
```

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy

Push to GitHub and import in Vercel. Set `NEXT_PUBLIC_BASE_URL` to your Vercel URL in environment variables.
