import { cn } from "@/lib/utils";

export interface DividerProps {
  text?: string;
  className?: string;
}

function Divider({ text, className }: DividerProps) {
  if (!text) {
    return <div className={cn("h-px bg-gray-300", className)} />;
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex-1 h-px bg-gray-300" />
      <span className="text-gray-400 text-sm">{text}</span>
      <div className="flex-1 h-px bg-gray-300" />
    </div>
  );
}

export { Divider };
