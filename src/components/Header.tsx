"use client";

interface HeaderProps {
  currentStep: number;
}

const steps = [
  { num: 1, label: "Cart" },
  { num: 2, label: "Address" },
  { num: 3, label: "Payment" },
];

export default function Header({ currentStep }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-leaf">🌿</span>
        Ecoyaan
      </div>

      <div className="stepper">
        {steps.map((step, idx) => (
          <div key={step.num} style={{ display: "flex", alignItems: "center" }}>
            <div className="step-item">
              <div
                className={`step-circle ${
                  currentStep === step.num
                    ? "active"
                    : currentStep > step.num
                    ? "done"
                    : ""
                }`}
              >
                {currentStep > step.num ? "✓" : step.num}
              </div>
              <span
                className={`step-label ${
                  currentStep === step.num
                    ? "active"
                    : currentStep > step.num
                    ? "done"
                    : ""
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`step-connector ${currentStep > step.num ? "done" : ""}`}
              />
            )}
          </div>
        ))}
      </div>
    </header>
  );
}
