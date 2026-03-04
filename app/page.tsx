// app/page.tsx  ←  SERVER COMPONENT (no "use client")
// Fetches cart data on the server before the page renders (SSR)
import { CartItem } from "@/types";
import CheckoutClient from "@/components/CheckoutClient";

// ─── SSR data fetch ───────────────────────────────────────────────────────────
async function getCartData(): Promise<{
  cart: CartItem[];
  shippingFee: number;
}> {
  // Logic to determine the base URL dynamically for SSR
  const base = process.env.NEXT_PUBLIC_BASE_URL 
    ? process.env.NEXT_PUBLIC_BASE_URL 
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : "http://localhost:3000";

  const res = await fetch(`${base}/api/cart`, { cache: "no-store" });
  
  if (!res.ok) {
    console.error(`Fetch failed at: ${base}/api/cart`);
    throw new Error(`Cart API error: ${res.status}`);
  }

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
      // Fixed the image URL logic to handle the API response correctly
      image:    item.image.startsWith('http') ? item.image : `https://${item.image}`,
    })
  );

  return { cart, shippingFee: data.shipping_fee };
}

// ─── Page component ───────────────────────────────────────────────────────────
export default async function Home() {
  const { cart, shippingFee } = await getCartData();

  return <CheckoutClient initialCart={cart} shippingFee={shippingFee} />;
}

export const metadata = {
  title: "Checkout · GreenBasket",
  description: "Complete your eco-friendly purchase securely.",
};