import { StatProps } from "../types";


export function Stat({ label, value, accent }: StatProps) {
  return (
    <div className="flex-1 text-center">
      <p className="text-[11px] tracking-widest text-[#6b7280] uppercase">{label}</p>
      <p className="md:text-[22px]  text-sm font-extrabold mt-0.5" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}
