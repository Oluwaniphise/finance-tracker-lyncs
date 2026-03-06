import { MONTHS } from "@/lib/constants";
import { HeaderProps } from "../types";



export function Header({ selectedMonth, onMonthChange }: HeaderProps) {
  return (
    <header className="flex items-center justify-between flex-wrap gap-3 px-7 py-5 border-b border-[#1e1e2e]">
      <div>
        <p className="text-[22px] font-black tracking-[0.25em] text-[#f9fafb]">LYNCS FLOW</p>
        <p className="text-[10px] tracking-[0.2em] text-[#4b5563] uppercase">personal finance</p>
      </div>

      <div className="flex gap-0.5 flex-wrap">
        {MONTHS.map((m, i) => (
          <button
            key={m}
            onClick={() => onMonthChange(i)}
            className={`px-2 py-1 text-[11px] rounded cursor-pointer tracking-[0.05em] transition-colors ${
              i === selectedMonth
                ? "bg-[#1e1e2e] text-[#f9fafb]"
                : "text-[#4b5563] hover:text-[#9ca3af]"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </header>
  );
}
