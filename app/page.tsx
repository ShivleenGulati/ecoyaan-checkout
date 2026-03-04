// app/page.tsx  ←  SERVER COMPONENT (no "use client")
// Fetches cart data on the server before the page renders (SSR)
import { CartItem } from "@/types";
import CheckoutClient from "@/components/CheckoutClient";

// ─── SSR data fetch ───────────────────────────────────────────────────────────
// Runs on the server — equivalent to getServerSideProps in Pages Router.
// cache: "no-store" ensures fresh data on every request (true SSR behaviour).
async function getCartData(): Promise<{
  cart: CartItem[];
  shippingFee: number;
}> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const res = await fetch(`${base}/api/cart`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Cart API error: ${res.status}`);

  const data = await res.json();

  // Map the API shape → our internal CartItem shape
  const cart: CartItem[] = data.cartItems.map(
    (item: {
      product_id: number;
      product_name: string;
      product_price: number;
      quantity: number;
      image: string;
    }) => ({
      id:       item.product_id,
      name:     item.product_name,
      subtitle: item.product_name.includes("Toothbrush")
        ? "Pack of 4 · Eco-friendly"
        : "Set of 5 · Organic cotton",
      qty:      item.quantity,
      price:    item.product_price,
      image:    `https://${item.image}`,
    })
  );

  return { cart, shippingFee: data.shipping_fee };
}

// ─── Page component ───────────────────────────────────────────────────────────
export default async function Home() {
  const { cart, shippingFee } = await getCartData();

  // Server-fetched data passed as props → CheckoutClient hydrates on the client
  return <CheckoutClient initialCart={cart} shippingFee={shippingFee} />;
}

export const metadata = {
  title: "Checkout · GreenBasket",
  description: "Complete your eco-friendly purchase securely.",
};
