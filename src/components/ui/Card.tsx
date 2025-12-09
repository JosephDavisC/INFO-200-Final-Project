import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "w-full border-2 border-gray-300 rounded-2xl p-8 bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}

export { Card };
