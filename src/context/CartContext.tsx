"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface Address {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

interface CartState {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
  addresses: Address[];
  selectedAddressId: string | null;
  currentStep: number;
}

interface CartContextType extends CartState {
  setCartItems: (items: CartItem[]) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  setCurrentStep: (step: number) => void;
  subtotal: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "ecoyaan_checkout_state";

export function CartProvider({
  children,
  initialCartItems,
  shippingFee,
  discountApplied,
}: {
  children: ReactNode;
  initialCartItems: CartItem[];
  shippingFee: number;
  discountApplied: number;
}) {
  const [state, setState] = useState<CartState>({
    cartItems: initialCartItems,
    shipping_fee: shippingFee,
    discount_applied: discountApplied,
    addresses: [],
    selectedAddressId: null,
    currentStep: 1,
  });

  // Load persisted state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({
          ...prev,
          addresses: parsed.addresses || [],
          selectedAddressId: parsed.selectedAddressId || null,
          currentStep: parsed.currentStep || 1,
        }));
      }
    } catch {}
  }, []);

  // Persist to localStorage whenever relevant state changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          addresses: state.addresses,
          selectedAddressId: state.selectedAddressId,
          currentStep: state.currentStep,
        })
      );
    } catch {}
  }, [state.addresses, state.selectedAddressId, state.currentStep]);

  const subtotal = state.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + state.shipping_fee - state.discount_applied;

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddress: Address = { ...address, id: Date.now().toString() };
    setState((prev) => ({
      ...prev,
      addresses: [...prev.addresses, newAddress],
      selectedAddressId: newAddress.id,
    }));
  };

  const removeAddress = (id: string) => {
    setState((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
      selectedAddressId:
        prev.selectedAddressId === id
          ? prev.addresses[0]?.id || null
          : prev.selectedAddressId,
    }));
  };

  const selectAddress = (id: string) => {
    setState((prev) => ({ ...prev, selectedAddressId: id }));
  };

  const setCurrentStep = (step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const setCartItems = (items: CartItem[]) => {
    setState((prev) => ({ ...prev, cartItems: items }));
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        setCartItems,
        addAddress,
        removeAddress,
        selectAddress,
        setCurrentStep,
        subtotal,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
