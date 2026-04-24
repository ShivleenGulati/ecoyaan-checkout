"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import CartStep from "@/components/CartStep";
import AddressStep from "@/components/AddressStep";
import ConfirmStep from "@/components/ConfirmStep";
import SuccessStep from "@/components/SuccessStep";

export default function CheckoutClient() {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const { addresses, selectedAddressId } = useCart();

  const canProceed = () => {
    if (step === 2) return !!selectedAddressId;
    return true;
  };

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
    else setSuccess(true);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const stepTitles = ["", "Review Cart", "Shipping Address", "Confirm & Pay"];
  const nextLabels = ["", "Proceed to Checkout →", "Review Order →", "Pay Securely 🔒"];

  return (
    <div className="checkout-wrapper">
      <Header currentStep={step} />

      <main className="main-content">
        {!success && (
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.3rem",
              color: "var(--green-dark)",
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            {stepTitles[step]}
          </h1>
        )}

        {success ? (
          <SuccessStep />
        ) : step === 1 ? (
          <CartStep />
        ) : step === 2 ? (
          <AddressStep />
        ) : (
          <ConfirmStep />
        )}
      </main>

      {/* Sticky bottom bar */}
      {!success && (
        <div className="sticky-bar">
          {step > 1 && (
            <button className="btn btn-secondary" onClick={handleBack}>
              ← Back
            </button>
          )}
          <button
            className={`btn ${step === 3 ? "btn-pay" : "btn-primary"}`}
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {nextLabels[step]}
          </button>
        </div>
      )}
    </div>
  );
}
