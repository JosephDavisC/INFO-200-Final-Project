import { type ReactNode } from "react";

export interface StepCardProps {
  step: number;
  icon: ReactNode;
  title: string;
  description: string;
  estimatedTime: string;
  showArrow?: boolean;
}

export function StepCard({
  step,
  icon,
  title,
  description,
  estimatedTime,
  showArrow = true,
}: StepCardProps) {
  return (
    <div className="flex items-start gap-3 lg:gap-4">
      <div className="flex flex-col items-center w-full">
        {/* Icon Box */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-uw-purple rounded-lg sm:rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 mb-1">{icon}</div>
          <span className="text-[10px] sm:text-xs font-medium">STEP {step}</span>
        </div>

        {/* Content */}
        <div className="mt-3 sm:mt-4 text-center w-full">
          <h3 className="text-uw-purple font-semibold text-base sm:text-lg">{title}</h3>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 mx-auto px-2">
            {description}
          </p>
          <div className="border-t border-gray-200 mt-3 sm:mt-4 pt-2 sm:pt-3">
            <p className="text-gray-500 text-[10px] sm:text-xs">Estimated time: {estimatedTime}</p>
          </div>
        </div>
      </div>

      {/* Arrow */}
      {showArrow && (
        <div className="hidden lg:flex items-center h-20 sm:h-24 text-uw-gold flex-shrink-0">
          <ChevronIcon />
        </div>
      )}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

// Step Icons
export function DocumentIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v2H8v-2zm0 4h8v2H8v-2z" />
    </svg>
  );
}

export function DocumentsIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
      <path d="M16 2H8a2 2 0 00-2 2v2H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2h2a2 2 0 002-2V8l-6-6zm-2 18H4V8h2v8a2 2 0 002 2h6v2zm4-4H8V4h5v5h5v7z" />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export function CheckCircleIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}
