"use client";

import { useCart } from "@/context/CartContext";

export default function ConfirmStep() {
  const { cartItems, subtotal, shipping_fee, grandTotal, addresses, selectedAddressId } = useCart();
  const address = addresses.find((a) => a.id === selectedAddressId);

  return (
    <>
      {/* Order summary */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon">📦</div>
          <span className="card-title">Order Summary</span>
        </div>
        <div className="card-body">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.product_id}>
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
                <div style={{ marginTop: 4 }}>
                  <span className="qty-badge">× {item.quantity}</span>
                </div>
              </div>
              <div className="cart-item-price">
                ₹{(item.product_price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 12 }}>
            <div className="price-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="price-row shipping">
              <span>Shipping</span>
              <span>₹{shipping_fee}</span>
            </div>
            <div className="price-row total">
              <span>Grand Total</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery address */}
      {address && (
        <div className="card">
          <div className="card-header">
            <div className="card-icon">🏠</div>
            <span className="card-title">Delivery Address</span>
          </div>
          <div className="card-body">
            <div className="confirm-address-box">
              <div className="confirm-label">Delivering to</div>
              <div className="confirm-value" style={{ fontWeight: 700, fontSize: "1rem" }}>
                {address.fullName}
              </div>
              <div className="confirm-value" style={{ marginTop: 4 }}>
                {address.city}, {address.state} – {address.pinCode}
              </div>
              <div className="confirm-value" style={{ marginTop: 4, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                📞 {address.phone} · ✉️ {address.email}
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-muted)", padding: "8px 0" }}>
        🔒 256-bit SSL encrypted · 🌱 Eco-packaged order
      </div>
    </>
  );
}
