import { TABS } from "../lib/data";
import { NavProps } from "../types";
export type { TabId } from "../types";


export function Nav({ active, onChange }: NavProps) {
  return (
    <nav className="flex px-7 border-b border-[#1e1e2e]">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`px-4 py-3.5 text-[13px] tracking-[0.03em] border-b-2 cursor-pointer transition-colors ${
            active === id
              ? "text-[#f9fafb] border-[#6366f1]"
              : "text-[#6b7280] border-transparent hover:text-[#9ca3af]"
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
