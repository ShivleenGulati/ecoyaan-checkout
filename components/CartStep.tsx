"use client";

import Image from "next/image";
import { useCheckout } from "@/context/CheckoutContext";
import { Btn, Card } from "@/components/ui";
import { T } from "@/components/tokens";

export default function CartStep() {
  const { cart, subtotal, shippingFee, total, setStep } = useCheckout();

  return (
    <div>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          fontWeight: 700,
          color: T.fg,
          marginBottom: 20,
          letterSpacing: "-0.02em",
        }}
      >
        Your Cart
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 20,
          alignItems: "start",
        }}
        className="checkout-grid"
      >
        {/* ── Left: items ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map((item) => (
            <Card
              key={item.id}
              style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}
            >
              {/* Product image */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 10,
                  background: T.surfaceAlt,
                  border: `1px solid ${T.border}`,
                  overflow: "hidden",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={72}
                  height={72}
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontWeight: 600, fontSize: 15, color: T.fg, marginBottom: 3 }}
                >
                  {item.name}
                </div>
                <div style={{ fontSize: 12, color: T.fgMuted, marginBottom: 8 }}>
                  {item.subtitle}
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: T.surfaceAlt,
                    border: `1px solid ${T.border}`,
                    borderRadius: 6,
                    padding: "3px 10px",
                  }}
                >
                  <span style={{ fontSize: 12, color: T.fgSub, fontWeight: 500 }}>
                    Qty: {item.qty}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: T.fg,
                  }}
                >
                  ₹{item.price * item.qty}
                </div>
                <div style={{ fontSize: 11, color: T.fgMuted, marginTop: 2 }}>
                  ₹{item.price} each
                </div>
              </div>
            </Card>
          ))}

          {/* Trust badges */}
          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            {["🔒 Secure Checkout", "♻️ Eco Packaging", "🚚 Free over ₹999"].map(
              (badge) => (
                <div
                  key={badge}
                  style={{
                    flex: 1,
                    background: T.greenLight,
                    border: `1px solid ${T.greenBorder}`,
                    borderRadius: T.radiusSm,
                    padding: "8px 12px",
                    fontSize: 11,
                    fontWeight: 500,
                    color: T.green,
                    textAlign: "center",
                  }}
                >
                  {badge}
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Right: price summary ── */}
        <Card style={{ padding: 24 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: T.fgMuted,
              marginBottom: 16,
            }}
          >
            Price Details
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                  color: T.fgSub,
                }}
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span style={{ fontWeight: 500, color: T.fg }}>
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: T.border, margin: "16px 0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              color: T.fgSub,
              marginBottom: 10,
            }}
          >
            <span>Subtotal</span>
            <span style={{ fontWeight: 500, color: T.fg }}>₹{subtotal}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            <span style={{ color: T.fgSub }}>Shipping</span>
            <span style={{ fontWeight: 600, color: T.green }}>₹{shippingFee}</span>
          </div>

          <div style={{ height: 1, background: T.border, marginBottom: 16 }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 15, color: T.fg }}>
              Total Amount
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                fontWeight: 700,
                color: T.fg,
              }}
            >
              ₹{total}
            </span>
          </div>

          <Btn onClick={() => setStep(2)} style={{ width: "100%" }}>
            Proceed to Checkout →
          </Btn>

          <div
            style={{
              fontSize: 11,
              color: T.fgMuted,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            🔒 256-bit SSL secured
          </div>
        </Card>
      </div>
    </div>
  );
}
