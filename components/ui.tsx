"use client";

import { CSSProperties, ReactNode } from "react";
import { T } from "./tokens";

// ─── Button ───────────────────────────────────────────────────────────────────
type BtnVariant = "primary" | "secondary" | "ghost";

export function Btn({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  style = {},
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "13px 28px",
    borderRadius: T.radiusSm,
    fontSize: 15,
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "opacity 0.18s, transform 0.1s",
    fontFamily: "inherit",
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const variants: Record<BtnVariant, CSSProperties> = {
    primary: {
      background: T.green,
      color: "#fff",
      boxShadow: "0 2px 8px rgba(26,122,62,0.3)",
    },
    secondary: {
      background: T.surface,
      color: T.fg,
      border: `1px solid ${T.borderStrong}`,
    },
    ghost: {
      background: "transparent",
      color: T.fgSub,
      border: "none",
    },
  };

  return (
    <button
      style={{ ...base, ...variants[variant] }}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({
  children,
  style = {},
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: T.radius,
        boxShadow: T.shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Step Progress Bar ────────────────────────────────────────────────────────
export function StepBar({ current }: { current: number }) {
  const steps = ["Cart", "Shipping", "Payment"];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
      }}
    >
      {steps.map((label, i) => {
        const idx    = i + 1;
        const done   = idx < current;
        const active = idx === current;

        return (
          <div key={label} style={{ display: "flex", alignItems: "center" }}>
            {/* Circle + label */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: done ? T.green : active ? T.fg : T.surfaceAlt,
                  border: `2px solid ${done ? T.green : active ? T.fg : T.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: done || active ? "#fff" : T.fgMuted,
                  transition: "all 0.3s",
                }}
              >
                {done ? "✓" : idx}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: active ? T.fg : T.fgMuted,
                }}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < 2 && (
              <div
                style={{
                  width: 80,
                  height: 2,
                  background: done ? T.green : T.border,
                  margin: "0 8px",
                  marginBottom: 22,
                  transition: "background 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
