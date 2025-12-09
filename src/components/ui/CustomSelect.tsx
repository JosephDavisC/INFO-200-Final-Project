"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface CustomSelectProps {
  label?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CustomSelect({
  label,
  options,
  placeholder = "Select an option",
  value,
  onChange,
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div
        className={cn(
          "border border-black rounded-md bg-white transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "shadow-lg" : ""
        )}
      >
        {/* Select Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full px-4 h-[57px]",
            "focus:outline-none focus:ring-2 focus:ring-uw-purple",
            "flex items-center justify-center gap-2",
            "text-[#4A3182] text-xl font-bold",
            isOpen && "border-b border-black"
          )}
        >
          <span className="flex-1 text-center">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={cn(
              "w-6 h-6 transition-transform duration-300 flex-shrink-0",
              isOpen && "rotate-180"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-center px-2.5 py-[15px]",
                "text-[#4A3182] text-xl font-bold",
                "hover:bg-gray-50 transition-colors",
                value === option.value && "bg-gray-100"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
