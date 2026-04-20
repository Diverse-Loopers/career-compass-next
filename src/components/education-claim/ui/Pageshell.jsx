// components/ui/PageShell.jsx
// Shared page wrapper: brand, heading, step indicator, content slot, action buttons.

import StepIndicator from "@/components/education-claim/ui/StepIndicator";

export default function PageShell({
  heading,
  subheading,
  currentStep,
  children,
  primaryLabel,
  primaryAction,
  secondaryLabel,
  secondaryAction,
  tertiaryLabel,
  tertiaryAction,
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-3 sm:px-5
      pt-10 pb-16 font-['DM_Sans'] overflow-x-hidden w-full">

      {/* Brand */}
      <div className="w-full max-w-[640px] mb-7 px-1 sm:px-0">
        <span className="text-[17px] font-bold text-gray-900 tracking-tight">
          SkillVerify
        </span>
      </div>

      {/* Heading */}
      <div className="w-full max-w-[640px] mb-7 px-1 sm:px-0">
        <h1 className="font-['Playfair_Display'] text-[28px] sm:text-[30px] font-bold
          text-gray-900 tracking-tight mb-1.5">
          {heading}
        </h1>
        {subheading && (
          <p className="text-sm text-gray-500">{subheading}</p>
        )}
      </div>

      {/* Step indicator */}
      {currentStep && (
        <div className="w-full max-w-[640px] px-1 sm:px-0">
          <StepIndicator currentStep={currentStep} />
        </div>
      )}

      {/* Main content */}
      <div className="w-full max-w-[640px] flex flex-col gap-5">
        {children}
      </div>

      {/* Action buttons */}
      {(primaryLabel || secondaryLabel || tertiaryLabel) && (
        <div className="w-full max-w-[640px] mt-6 flex flex-col gap-2.5">
          {primaryLabel && (
            <button
              type="button"
              onClick={primaryAction}
              className="w-full py-[15px] bg-gray-900 hover:bg-blue-700 text-white rounded-xl
                text-[15px] font-bold tracking-[-0.01em] transition-colors duration-200 cursor-pointer"
            >
              {primaryLabel}
            </button>
          )}
          {secondaryLabel && (
            <button
              type="button"
              onClick={secondaryAction}
              className="w-full py-[13px] bg-transparent text-gray-700 border-[1.5px]
                border-gray-200 hover:border-gray-400 rounded-xl text-[14px] font-semibold
                transition-colors duration-200 cursor-pointer"
            >
              {secondaryLabel}
            </button>
          )}
          {tertiaryLabel && (
            <button
              type="button"
              onClick={tertiaryAction}
              className="w-full py-[13px] bg-transparent text-red-500 border-[1.5px]
                border-red-200 hover:border-red-400 rounded-xl text-[14px] font-semibold
                transition-colors duration-200 cursor-pointer"
            >
              {tertiaryLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}