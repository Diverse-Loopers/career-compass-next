import { CheckIcon } from "@/components/education-claim/ui/Icons";

const DEFAULT_STEPS = ["Basic Info", "Identity Proof", "Education", "Employment"];

export default function StepIndicator({ currentStep, steps = DEFAULT_STEPS }) {
  return (
    <div className="flex items-center mb-9 overflow-hidden">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isCompleted = currentStep > stepNum;
        const isActive = currentStep === stepNum;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none min-w-0">
            {/* Bubble + label */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
                  text-[12px] sm:text-[13px] font-bold transition-colors duration-300 flex-shrink-0
                  ${isCompleted
                    ? "bg-green-600 text-white"
                    : isActive
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-400"
                  }`}
              >
                {isCompleted ? <CheckIcon /> : stepNum}
              </div>
              <span
                className={`hidden sm:block text-[10px] sm:text-[11px] font-bold tracking-wide
                  sm:tracking-widest uppercase truncate min-w-0 transition-colors duration-300
                  ${isCompleted
                    ? "text-green-600"
                    : isActive
                    ? "text-blue-700"
                    : "text-gray-400"
                  }`}
              >
                {label}
              </span>
            </div>

            {/* Connector — not after last */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1.5 sm:mx-3 min-w-0 transition-colors duration-300
                  ${currentStep > stepNum ? "bg-green-600" : "bg-gray-300"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}