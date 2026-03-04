"use client";

import { CheckoutProvider, useCheckout } from "@/context/CheckoutContext";
import { StepBar } from "@/components/ui";
import { T } from "@/components/tokens";
import CartStep     from "@/components/CartStep";
import ShippingStep from "@/components/ShippingStep";
import PaymentStep  from "@/components/PaymentStep";
import { CartItem } from "@/types";

// ─── Inner app — must be inside provider to use useCheckout ──────────────────
function CheckoutApp() {
  const { step } = useCheckout();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;450;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        input, select, button, textarea { font-family: inherit; }
        input:focus, select:focus { outline: none; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #C8C4B8; border-radius: 99px; }

        /* ── Responsive: stack on mobile ── */
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .form-grid     { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Sticky header ── */}
      <header
        style={{
          background: "#fff",
          borderBottom: `1px solid ${T.border}`,
          padding: "15px 0",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            maxWidth: 920,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20,
              fontWeight: 700,
              color: T.fg,
              letterSpacing: "-0.02em",
            }}
          >
            🌿 GreenBasket
          </div>
          <div
            style={{
              fontSize: 12,
              color: T.fgMuted,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            🔒 Secured Checkout
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>
        <StepBar current={step} />

        {step === 1 && <CartStep />}
        {step === 2 && <ShippingStep />}
        {step === 3 && <PaymentStep />}
      </main>
    </div>
  );
}

// ─── Exported wrapper — receives SSR data as props ───────────────────────────
export default function CheckoutClient({
  initialCart,
  shippingFee,
}: {
  initialCart: CartItem[];
  shippingFee: number;
}) {
  return (
    <CheckoutProvider initialCart={initialCart} shippingFee={shippingFee}>
      <CheckoutApp />
    </CheckoutProvider>
  );
}
