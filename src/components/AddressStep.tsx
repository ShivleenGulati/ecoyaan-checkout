"use client";

import { useState } from "react";
import { useCart, Address } from "@/context/CartContext";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

interface Errors {
  [key: string]: string;
}

const emptyForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  pinCode: "",
  city: "",
  state: "",
};

export default function AddressStep() {
  const { addresses, selectedAddressId, addAddress, removeAddress, selectAddress } = useCart();
  const [showForm, setShowForm] = useState(addresses.length === 0);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!form.pinCode.trim()) newErrors.pinCode = "PIN code is required";
    else if (!/^\d{6}$/.test(form.pinCode))
      newErrors.pinCode = "Enter a valid 6-digit PIN code";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    addAddress(form);
    setForm(emptyForm);
    setErrors({});
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((er) => ({ ...er, [e.target.name]: "" }));
    }
  };

  return (
    <>
      {/* Saved addresses */}
      {addresses.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="card-icon">📍</div>
            <span className="card-title">Saved Addresses</span>
          </div>
          <div className="card-body">
            {addresses.map((addr: Address) => (
              <div
                key={addr.id}
                className={`address-card ${selectedAddressId === addr.id ? "selected" : ""}`}
                onClick={() => selectAddress(addr.id)}
              >
                <div className="address-card-actions">
                  <button
                    className="btn-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAddress(addr.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
                <div className="address-card-name">{addr.fullName}</div>
                <div className="address-card-detail">
                  {addr.city}, {addr.state} – {addr.pinCode}
                </div>
                <div className="address-card-detail">{addr.phone} · {addr.email}</div>
                {selectedAddressId === addr.id && (
                  <div className="selected-badge">✓ Selected</div>
                )}
              </div>
            ))}

            {!showForm && (
              <button className="add-address-btn" onClick={() => setShowForm(true)}>
                + Add New Address
              </button>
            )}
          </div>
        </div>
      )}

      {/* Address form */}
      {showForm && (
        <div className="card">
          <div className="card-header">
            <div className="card-icon">✏️</div>
            <span className="card-title">
              {addresses.length === 0 ? "Shipping Address" : "New Address"}
            </span>
            {addresses.length > 0 && (
              <button
                onClick={() => { setShowForm(false); setErrors({}); setForm(emptyForm); }}
                style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.85rem" }}
              >
                Cancel
              </button>
            )}
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group full">
                <label className="form-label">Full Name *</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`form-input ${errors.fullName ? "error" : ""}`}
                  placeholder="Shivleen Gulati"
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="you@email.com"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  placeholder="10-digit number"
                  maxLength={10}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">PIN Code *</label>
                <input
                  name="pinCode"
                  type="text"
                  value={form.pinCode}
                  onChange={handleChange}
                  className={`form-input ${errors.pinCode ? "error" : ""}`}
                  placeholder="6-digit PIN"
                  maxLength={6}
                />
                {errors.pinCode && <span className="form-error">{errors.pinCode}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={`form-input ${errors.city ? "error" : ""}`}
                  placeholder="New Delhi"
                />
                {errors.city && <span className="form-error">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">State *</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className={`form-input ${errors.state ? "error" : ""}`}
                  placeholder="Delhi"
                />
                {errors.state && <span className="form-error">{errors.state}</span>}
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ marginTop: 16, width: "100%" }}
              onClick={handleAdd}
            >
              Save Address
            </button>
          </div>
        </div>
      )}

      {addresses.length === 0 && !showForm && (
        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          No addresses saved. Add one to continue.
        </p>
      )}
    </>
  );
}
