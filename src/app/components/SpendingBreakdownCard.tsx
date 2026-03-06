"use client";

import { Donut } from "@/components/Donut";
import { formatCurrency } from "@/utils/finance";
import { CategorySpend } from "@/types";

interface SpendingBreakdownCardProps {
  categorySpend: CategorySpend[];
  expenses: number;
}

export function SpendingBreakdownCard({
  categorySpend,
  expenses,
}: SpendingBreakdownCardProps) {
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5">
      <p className="text-[11px] tracking-[0.12em] text-[#4b5563] uppercase">
        Spending breakdown
      </p>
      <div className="flex flex-col md:flex-row gap-6 items-center mt-4">
        <div className="relative shrink-0">
          <Donut data={categorySpend} total={expenses} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-[11px] text-[#6b7280]">total</p>
            <p className="text-[15px] font-bold text-[#f9fafb]">
              {formatCurrency(expenses)}
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {categorySpend.map((c) => (
            <div key={c.id} className="flex gap-3 justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: c.color }}
                />
                <span className="text-[13px] text-[#9ca3af]">{c.label}</span>
              </div>
              <span className="text-[13px] font-semibold text-[#f9fafb]">
                {formatCurrency(c.value)}
              </span>
            </div>
          ))}
          {categorySpend.length === 0 && (
            <span className="text-[13px] text-[#6b7280]">No expenses yet</span>
          )}
        </div>
      </div>
    </div>
  );
}
