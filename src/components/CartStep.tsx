"use client";

import { useCart } from "@/context/CartContext";

export default function CartStep() {
  const { cartItems, subtotal, shipping_fee, discount_applied, grandTotal } =
    useCart();

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-icon">🛒</div>
          <span className="card-title">Your Cart</span>
          <span
            className="eco-tag"
            style={{ marginLeft: "auto" }}
          >
            🌱 Eco-friendly
          </span>
        </div>
        <div className="card-body">
          {cartItems.map((item) => (
            <div key={item.product_id} className="cart-item">
              <img
                src={item.image}
                alt={item.product_name}
                className="cart-item-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/150/d8f3dc/2d6a4f?text=🌿";
                }}
              />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.product_name}</div>
                <div style={{ marginTop: 6 }}>
                  <span className="qty-badge">Qty: {item.quantity}</span>
                </div>
              </div>
              <div className="cart-item-price">
                ₹{(item.product_price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-icon">🧾</div>
          <span className="card-title">Price Details</span>
        </div>
        <div className="card-body">
          {cartItems.map((item) => (
            <div className="price-row" key={item.product_id}>
              <span>
                {item.product_name} × {item.quantity}
              </span>
              <span>₹{(item.product_price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="price-row shipping">
            <span>Shipping</span>
            <span>+ ₹{shipping_fee}</span>
          </div>
          {discount_applied > 0 && (
            <div className="price-row" style={{ color: "#40916c" }}>
              <span>Discount</span>
              <span>- ₹{discount_applied}</span>
            </div>
          )}
          <div className="price-row total">
            <span>Total Amount</span>
            <span>₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: "0.78rem",
          color: "var(--text-muted)",
          padding: "8px 0",
        }}
      >
        🔒 Secure checkout · 🌱 Carbon-neutral shipping
      </div>
    </>
  );
}
