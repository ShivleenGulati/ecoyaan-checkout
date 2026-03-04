# Ecoyaan Checkout Flow

A 3-step checkout MVP built with **Next.js 15 App Router**, **TypeScript**, and **Context API**.

## Architecture

| Layer | File | Role |
|---|---|---|
| Mock API | `app/api/cart/route.ts` | Returns cart JSON matching assignment spec |
| SSR | `app/page.tsx` | Server Component, fetches `/api/cart` with `cache: "no-store"` |
| Global State | `context/CheckoutContext.tsx` | Context API — persists cart + address across steps |
| Client Shell | `components/CheckoutClient.tsx` | `"use client"` wrapper, receives SSR props |
| Step 1 | `components/CartStep.tsx` | Product list + price summary |
| Step 2 | `components/ShippingStep.tsx` | Address form with full validation |
| Step 3 | `components/PaymentStep.tsx` | Order review + simulated payment + success screen |
| Design | `components/tokens.ts` | Centralised color/spacing tokens |
| UI | `components/ui.tsx` | `Btn`, `Card`, `StepBar` primitives |

## Validation Rules (Step 2)
- All fields required
- Email: valid format (`user@domain.tld`)
- Phone: **exactly 10 digits** (assignment requirement)
- Pincode: exactly 6 digits
- Errors shown immediately on submit attempt, live-updated on change

## Running Locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

```bash
# Push to GitHub, then import at vercel.com
# Set NEXT_PUBLIC_BASE_URL if needed (auto-detected on Vercel via VERCEL_URL)
```
