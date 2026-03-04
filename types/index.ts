export interface CartItem {
  id: number;
  name: string;
  subtitle: string;
  qty: number;
  price: number;
  image: string;
}

export interface Address {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CheckoutContextType {
  cart: CartItem[];
  address: Address | null;
  setAddress: (a: Address) => void;
  step: number;
  setStep: (s: number) => void;
  subtotal: number;
  shippingFee: number;
  total: number;
}
