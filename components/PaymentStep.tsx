"use client";

import { useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { Btn, Card } from "@/components/ui";
import { T } from "@/components/tokens";

export default function PaymentStep() {
  const { cart, address, shippingFee, total, setStep } = useCheckout();
  const [paid,    setPaid]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [orderId] = useState(
    () => `ORD${Math.floor(100000 + Math.random() * 900000)}`
  );

  const handlePay = () => {
    setLoading(true);
    // Simulate payment API call (2 second delay)
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 2000);
  };

  // ─── Success / Confirmation Screen ────────────────────────────────────────
  if (paid) {
    return (
      <div style={{ textAlign: "center", padding: "48px 20px" }}>
        <style>{`
          @keyframes pop {
            0%   { transform: scale(0.4); opacity: 0; }
            70%  { transform: scale(1.2); }
            100% { transform: scale(1);   opacity: 1; }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Checkmark */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: T.greenLight,
            border: `3px solid ${T.green}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            margin: "0 auto 24px",
            animation: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
        >
          ✓
        </div>

        <div style={{ animation: "fadeUp 0.4s ease 0.3s both" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 30,
              fontWeight: 700,
              color: T.fg,
              marginBottom: 10,
            }}
          >
            Order Confirmed! 🎉
          </h2>
          <p style={{ color: T.fgSub, fontSize: 16, marginBottom: 6 }}>
            Thank you,{" "}
            <strong style={{ color: T.fg }}>{address?.name}</strong>! Your
            order has been placed successfully.
          </p>
          <p style={{ color: T.fgMuted, fontSize: 13, marginBottom: 32 }}>
            Confirmation sent to{" "}
            <strong style={{ color: T.fgSub }}>{address?.email}</strong> ·
            Order ID:{" "}
            <strong style={{ color: T.green }}>{orderId}</strong>
          </p>
        </div>

        {/* Order receipt card */}
        <Card
          style={{
            maxWidth: 480,
            margin: "0 auto 28px",
            padding: 24,
            textAlign: "left",
            animation: "fadeUp 0.4s ease 0.5s both",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: T.fgMuted,
              marginBottom: 16,
            }}
          >
            Order Receipt
          </div>

          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                marginBottom: 10,
                color: T.fgSub,
              }}
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <strong style={{ color: T.fg }}>₹{item.price * item.qty}</strong>
            </div>
          ))}

          <div style={{ height: 1, background: T.border, margin: "12px 0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              color: T.fgSub,
              marginBottom: 8,
            }}
          >
            <span>Shipping</span>
            <span style={{ color: T.green, fontWeight: 600 }}>
              ₹{shippingFee}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 700,
              fontSize: 16,
              color: T.fg,
            }}
          >
            <span>Total Paid</span>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
              }}
            >
              ₹{total}
            </span>
          </div>

          <div style={{ height: 1, background: T.border, margin: "16px 0" }} />

          {/* Delivery address */}
          <div
            style={{
              fontSize: 12,
              color: T.fgMuted,
              lineHeight: 1.8,
              background: T.surfaceAlt,
              borderRadius: T.radiusSm,
              padding: "10px 14px",
            }}
          >
            <div style={{ fontWeight: 600, color: T.fgSub, marginBottom: 4 }}>
              📍 Delivering to
            </div>
            <strong style={{ color: T.fg }}>{address?.name}</strong>
            <br />
            {address?.address}, {address?.city}, {address?.state} –{" "}
            {address?.pincode}
            <br />
            📞 +91 {address?.phone}
          </div>
        </Card>

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            animation: "fadeUp 0.4s ease 0.6s both",
          }}
        >
          <Btn variant="secondary" onClick={() => window.location.reload()}>
            ← Continue Shopping
          </Btn>
          <Btn>Track My Order</Btn>
        </div>
      </div>
    );
  }

  // ─── Payment Screen ────────────────────────────────────────────────────────
  return (
    <div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

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
        Review & Pay
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
        {/* ── Left: review panels ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Items review */}
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
              Items in Order
            </div>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  paddingBottom: 14,
                  marginBottom: 14,
                  borderBottom: `1px solid ${T.border}`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: T.surfaceAlt,
                    border: `1px solid ${T.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  {item.id === 1 ? "🪥" : "🛍"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.fg }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: T.fgMuted }}>
                    Qty: {item.qty} · ₹{item.price} each
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: T.fg }}>
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                fontSize: 13,
                color: T.fgMuted,
              }}
            >
              {cart.reduce((s, i) => s + i.qty, 0)} items
            </div>
          </Card>

          {/* Address review */}
          <Card style={{ padding: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: T.fgMuted,
                }}
              >
                Delivering to
              </div>
              <button
                onClick={() => setStep(2)}
                style={{
                  fontSize: 12,
                  color: T.green,
                  fontWeight: 600,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  padding: "4px 8px",
                  borderRadius: 6,
                }}
              >
                ✏️ Edit
              </button>
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: T.fg,
                marginBottom: 6,
              }}
            >
              {address?.name}
            </div>
            <div
              style={{
                fontSize: 13,
                color: T.fgSub,
                lineHeight: 1.8,
                background: T.surfaceAlt,
                borderRadius: T.radiusSm,
                padding: "10px 14px",
              }}
            >
              {address?.address}
              <br />
              {address?.city}, {address?.state} – {address?.pincode}
              <br />
              📞 +91 {address?.phone} &nbsp;·&nbsp; ✉ {address?.email}
            </div>
          </Card>

          {/* Payment method selector */}
          <Card style={{ padding: 24 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: T.fgMuted,
                marginBottom: 14,
              }}
            >
              Payment Method
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { id: "upi",  label: "UPI (GPay, PhonePe, Paytm)", icon: "📱" },
                { id: "card", label: "Credit / Debit Card",         icon: "💳" },
                { id: "cod",  label: "Cash on Delivery",            icon: "💵" },
              ].map(({ id, label, icon }) => {
                const selected = selectedMethod === id;
                return (
                  <label
                    key={id}
                    onClick={() => setSelectedMethod(id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: T.radiusSm,
                      border: `1.5px solid ${selected ? T.green : T.border}`,
                      background: selected ? T.greenLight : T.surface,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={selected}
                      onChange={() => setSelectedMethod(id)}
                      style={{ accentColor: T.green }}
                    />
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: T.fg }}>
                      {label}
                    </span>
                    {id === "upi" && (
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: 11,
                          fontWeight: 700,
                          color: T.green,
                          background: T.greenLight,
                          border: `1px solid ${T.greenBorder}`,
                          borderRadius: 99,
                          padding: "2px 8px",
                        }}
                      >
                        Recommended
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ── Right: price + pay button ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
              Price Breakdown
            </div>

            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                  color: T.fgSub,
                  marginBottom: 10,
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

            <div style={{ height: 1, background: T.border, margin: "12px 0" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                color: T.fgSub,
                marginBottom: 10,
              }}
            >
              <span>Shipping</span>
              <span style={{ color: T.green, fontWeight: 600 }}>
                ₹{shippingFee}
              </span>
            </div>

            <div style={{ height: 1, background: T.border, margin: "12px 0" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 15, color: T.fg }}>
                Total
              </span>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: T.fg,
                }}
              >
                ₹{total}
              </span>
            </div>

            {/* Pay button */}
            <Btn
              onClick={handlePay}
              disabled={loading}
              style={{ width: "100%", fontSize: 16, padding: "15px" }}
            >
              {loading ? (
                <span
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      border: "2.5px solid rgba(255,255,255,0.35)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Processing Payment...
                </span>
              ) : (
                `🔒 Pay Securely ₹${total}`
              )}
            </Btn>

            <div
              style={{
                fontSize: 11,
                color: T.fgMuted,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              🔐 Encrypted & secured by 256-bit SSL
            </div>
          </Card>

          <Btn
            variant="ghost"
            onClick={() => setStep(2)}
            style={{ width: "100%", fontSize: 13 }}
          >
            ← Edit Shipping Address
          </Btn>
        </div>
      </div>
    </div>
  );
}
