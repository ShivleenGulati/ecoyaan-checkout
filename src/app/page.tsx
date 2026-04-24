import { CartProvider, CartItem } from "@/context/CartContext";
import CheckoutClient from "./CheckoutClient";

interface CartData {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
}

async function getCartData(): Promise<CartData> {
  // SSR fetch — using Server Component
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  try {
    const res = await fetch(`${baseUrl}/api/cart`, { cache: "no-store" });
    return res.json();
  } catch {
    // Fallback data if API fails during build
    return {
      cartItems: [
        {
          product_id: 101,
          product_name: "Bamboo Toothbrush (Pack of 4)",
          product_price: 299,
          quantity: 2,
          image: "https://via.placeholder.com/150/d8f3dc/2d6a4f?text=🪥",
        },
        {
          product_id: 102,
          product_name: "Reusable Cotton Produce Bags",
          product_price: 450,
          quantity: 1,
          image: "https://via.placeholder.com/150/d8f3dc/2d6a4f?text=🛍",
        },
      ],
      shipping_fee: 50,
      discount_applied: 0,
    };
  }
}

export default async function HomePage() {
  const cartData = await getCartData();

  return (
    <CartProvider
      initialCartItems={cartData.cartItems}
      shippingFee={cartData.shipping_fee}
      discountApplied={cartData.discount_applied}
    >
      <CheckoutClient />
    </CartProvider>
  );
}
