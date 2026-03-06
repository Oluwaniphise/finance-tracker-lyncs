import { Stat } from "@/components/Stat";
import { formatCurrency } from "@/utils/finance";
import { SummaryStripProps } from "../types";


export function SummaryStrip({ income, expenses, net }: SummaryStripProps) {
  return (
    <div className="flex items-center px-7 py-4 border-b border-[#1e1e2e]">
      <Stat label="Income"   value={formatCurrency(income)}   accent="#10b981" />
      <div className="w-px h-9 bg-[#1e1e2e] mx-2" />
      <Stat label="Expenses" value={formatCurrency(expenses)} accent="#ef4444" />
      <div className="w-px h-9 bg-[#1e1e2e] mx-2" />
      <Stat label="Net"      value={formatCurrency(net)}      accent={net >= 0 ? "#10b981" : "#ef4444"} />
    </div>
  );
}
