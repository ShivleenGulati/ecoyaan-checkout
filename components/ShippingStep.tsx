"use client";

import { useState, CSSProperties } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { Address } from "@/types";
import { Btn, Card } from "@/components/ui";
import { T, INDIAN_STATES } from "@/components/tokens";

// ─── Pure validation — returns error map ─────────────────────────────────────
function validate(f: Address): Partial<Record<keyof Address, string>> {
  const e: Partial<Record<keyof Address, string>> = {};

  if (!f.name.trim())
    e.name = "Full name is required";
  else if (f.name.trim().length < 3)
    e.name = "Name must be at least 3 characters";

  if (!f.email.trim())
    e.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Enter a valid email address";

  // ✅ KEY requirement from assignment: exactly 10 digits
  if (!f.phone.trim())
    e.phone = "Phone number is required";
  else if (!/^\d{10}$/.test(f.phone.trim()))
    e.phone = "Phone must be exactly 10 digits";

  if (!f.address.trim())
    e.address = "Street address is required";

  if (!f.city.trim())
    e.city = "City is required";

  if (!f.state.trim())
    e.state = "State is required";

  if (!f.pincode.trim())
    e.pincode = "Pincode is required";
  else if (!/^\d{6}$/.test(f.pincode.trim()))
    e.pincode = "Pincode must be 6 digits";

  return e;
}

// ─── Field component ─────────────────────────────────────────────────────────
// FIX: accepts `forceShow` so errors appear immediately on submit click
function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  hint,
  forceShow = false,
}: {
  label: string;
  name: keyof Address;
  type?: string;
  value: string;
  onChange: (name: keyof Address, value: string) => void;
  error?: string;
  placeholder?: string;
  hint?: string;
  forceShow?: boolean;
}) {
  const [touched, setTouched] = useState(false);
  // Show error if: (user blurred the field) OR (submit was clicked)
  const showErr = (touched || forceShow) && !!error;

  const inputStyle: CSSProperties = {
    padding: "11px 14px",
    borderRadius: T.radiusSm,
    width: "100%",
    border: `1.5px solid ${showErr ? T.red : value ? T.green : T.border}`,
    background: T.surface,
    fontSize: 14,
    color: T.fg,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.18s, box-shadow 0.18s",
    boxShadow: showErr
      ? `0 0 0 3px ${T.redLight}`
      : value && !error
      ? "0 0 0 3px rgba(26,122,62,0.08)"
      : "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: T.fgSub,
          letterSpacing: "0.03em",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => setTouched(true)}
        style={inputStyle}
      />
      {showErr && (
        <span style={{ fontSize: 11, color: T.red, fontWeight: 500 }}>
          ⚠ {error}
        </span>
      )}
      {hint && !showErr && (
        <span style={{ fontSize: 11, color: T.fgMuted }}>{hint}</span>
      )}
    </div>
  );
}

// ─── Shipping Step ────────────────────────────────────────────────────────────
export default function ShippingStep() {
  const { setStep, setAddress } = useCheckout();

  const [fields, setFields] = useState<Address>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // errors map — always up to date
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});

  // FIX: when true, all Field components will show their errors immediately
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Update a single field and re-validate live
  const handleChange = (name: keyof Address, value: string) => {
    const updated = { ...fields, [name]: value };
    setFields(updated);
    // Always keep errors fresh after first submit attempt
    if (submitAttempted) {
      setErrors(validate(updated));
    }
  };

  // ✅ FIX: this is the corrected submit handler
  const handleSubmit = () => {
    // 1. Mark that submit was clicked → forces all Field errors to show
    setSubmitAttempted(true);

    // 2. Run validation on current fields
    const errs = validate(fields);
    setErrors(errs);

    // 3. Only navigate if there are zero errors
    if (Object.keys(errs).length === 0) {
      setAddress(fields);
      setStep(3); // ← THIS now actually fires when form is valid
    }
    // If there are errors, we stop here and show them — no navigation
  };

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
        Shipping Address
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
        {/* ── Form card ── */}
        <Card style={{ padding: 28 }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
            className="form-grid"
          >
            {/* Full width fields */}
            <div style={{ gridColumn: "1 / -1" }}>
              <Field
                label="Full Name *"
                name="name"
                value={fields.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="e.g. Priya Sharma"
                forceShow={submitAttempted}
              />
            </div>

            <Field
              label="Email Address *"
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              forceShow={submitAttempted}
            />

            <Field
              label="Phone Number *"
              name="phone"
              type="tel"
              value={fields.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="10-digit mobile number"
              hint="Exactly 10 digits, no spaces or dashes"
              forceShow={submitAttempted}
            />

            <div style={{ gridColumn: "1 / -1" }}>
              <Field
                label="Street Address *"
                name="address"
                value={fields.address}
                onChange={handleChange}
                error={errors.address}
                placeholder="House no., Street, Locality"
                forceShow={submitAttempted}
              />
            </div>

            <Field
              label="City *"
              name="city"
              value={fields.city}
              onChange={handleChange}
              error={errors.city}
              placeholder="e.g. Rohtak"
              forceShow={submitAttempted}
            />

            {/* State dropdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.fgSub,
                  letterSpacing: "0.03em",
                }}
              >
                State *
              </label>
              <select
                value={fields.state}
                onChange={(e) => handleChange("state", e.target.value)}
                style={{
                  padding: "11px 14px",
                  borderRadius: T.radiusSm,
                  width: "100%",
                  border: `1.5px solid ${
                    submitAttempted && errors.state
                      ? T.red
                      : fields.state
                      ? T.green
                      : T.border
                  }`,
                  background: T.surface,
                  fontSize: 14,
                  color: fields.state ? T.fg : T.fgMuted,
                  fontFamily: "inherit",
                  outline: "none",
                }}
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {submitAttempted && errors.state && (
                <span style={{ fontSize: 11, color: T.red, fontWeight: 500 }}>
                  ⚠ {errors.state}
                </span>
              )}
            </div>

            <Field
              label="Pincode *"
              name="pincode"
              value={fields.pincode}
              onChange={handleChange}
              error={errors.pincode}
              placeholder="6-digit code"
              hint="e.g. 124001"
              forceShow={submitAttempted}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <Btn variant="secondary" onClick={() => setStep(1)}>
              ← Back
            </Btn>
            <Btn onClick={handleSubmit} style={{ flex: 1 }}>
              Continue to Payment →
            </Btn>
          </div>

          {/* Show inline hint if submit was attempted and there are errors */}
          {submitAttempted && Object.keys(errors).length > 0 && (
            <div
              style={{
                marginTop: 14,
                padding: "10px 14px",
                background: T.redLight,
                border: `1px solid ${T.red}`,
                borderRadius: T.radiusSm,
                fontSize: 13,
                color: T.red,
                fontWeight: 500,
              }}
            >
              ⚠ Please fix {Object.keys(errors).length} error
              {Object.keys(errors).length > 1 ? "s" : ""} above before continuing.
            </div>
          )}
        </Card>

        {/* ── Sidebar info ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card style={{ padding: 20 }}>
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
              Delivery Info
            </div>
            {[
              { icon: "📅", title: "Estimated Delivery", sub: "3–5 business days" },
              { icon: "🔁", title: "Easy Returns", sub: "7-day hassle-free returns" },
              { icon: "📦", title: "Order Tracking", sub: "SMS & email updates" },
            ].map(({ icon, title, sub }) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  marginBottom: 14,
                }}
              >
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.fg }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 12, color: T.fgMuted }}>{sub}</div>
                </div>
              </div>
            ))}
          </Card>

          <Card
            style={{
              padding: 16,
              background: T.greenLight,
              border: `1px solid ${T.greenBorder}`,
            }}
          >
            <div
              style={{ fontSize: 12, fontWeight: 600, color: T.green, marginBottom: 6 }}
            >
              🌱 Eco Commitment
            </div>
            <div style={{ fontSize: 12, color: T.green, lineHeight: 1.6 }}>
              All orders shipped in 100% recycled, plastic-free packaging.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
