"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, Address, CheckoutContextType } from "@/types";

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export function CheckoutProvider({
  children,
  initialCart,
  shippingFee,
}: {
  children: ReactNode;
  initialCart: CartItem[];
  shippingFee: number;
}) {
  const [cart]    = useState<CartItem[]>(initialCart);
  const [address, setAddress] = useState<Address | null>(null);
  const [step,    setStep]    = useState<number>(1);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total    = subtotal + shippingFee;

  return (
    <CheckoutContext.Provider
      value={{ cart, address, setAddress, step, setStep, subtotal, shippingFee, total }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContextType {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside CheckoutProvider");
  return ctx;
}
