"use client";

import { useCart } from "@/context/CartContext";

export default function SuccessStep() {
  const { grandTotal } = useCart();
  const orderId = `ECO-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  return (
    <div className="card">
      <div className="success-wrap">
        <div className="success-icon">🎉</div>
        <h2 className="success-title">Order Placed!</h2>
        <p className="success-sub">
          Thank you for choosing eco-friendly products. Your order is confirmed
          and will be packed sustainably.
        </p>
        <p className="order-id">Order ID: {orderId}</p>
        <div
          style={{
            marginTop: 20,
            padding: "12px 20px",
            background: "var(--green-pale)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.9rem",
            color: "var(--green-dark)",
            fontWeight: 600,
          }}
        >
          Amount Paid: ₹{grandTotal.toLocaleString()}
        </div>
        <div
          className="eco-tag"
          style={{ marginTop: 16, padding: "6px 14px", fontSize: "0.8rem" }}
        >
          🌱 You saved 2.3kg of CO₂ with this order!
        </div>
      </div>
    </div>
  );
}
