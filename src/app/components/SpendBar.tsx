import { clamp } from "@/utils/finance";
import { SpendBarProps } from "../types";



export function SpendBar({ spent, budget, color }: SpendBarProps) {
  const pct  = clamp((spent / budget) * 100, 0, 100);
  const over = spent > budget;

  return (
    <div className="h-1 rounded-full bg-[#1e1e2e] overflow-hidden mt-1.5">
      <div
        className="h-full rounded-full transition-[width] duration-400 ease-in-out"
        style={{
          width: `${pct}%`,
          background: over ? "#ef4444" : color,
        }}
      />
    </div>
  );
}
