"use client";

import { CATEGORIES } from "@/lib/constants";
import { SpendBar } from "@/components/SpendBar";
import { formatCurrency, sumByCategory } from "@/utils/finance";
import { Budgets, Transaction } from "@/types";

interface BudgetStatusCardProps {
  monthTxns: Transaction[];
  budgets: Budgets;
}

export function BudgetStatusCard({ monthTxns, budgets }: BudgetStatusCardProps) {
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5">
      <p className="text-[11px] tracking-[0.12em] text-[#4b5563] uppercase">
        Budget status
      </p>
      <div className="mt-4 flex flex-col gap-3.5">
        {CATEGORIES.map((cat) => {
          const spent = sumByCategory(monthTxns, cat.id);
          const budget = budgets[cat.id];
          const over = spent > budget;
          const delta = Math.abs(spent - budget);

          return (
            <div key={cat.id}>
              <div className="flex justify-between">
                <span className="text-[13px] text-[#9ca3af]">
                  {cat.icon} {cat.label}
                </span>
                <span
                  className={`text-[13px] font-semibold ${over ? "text-[#ef4444]" : "text-[#f9fafb]"}`}
                >
                  {formatCurrency(spent)}{" "}
                  <span className="text-[#4b5563] font-normal">
                    / {formatCurrency(budget)}
                  </span>
                </span>
              </div>
              <SpendBar spent={spent} budget={budget} color={cat.color} />
              <p className={`mt-1 text-[10px] ${over ? "text-[#ef4444]" : "text-[#10b981]"}`}>
                {over
                  ? `Over budget by ${formatCurrency(delta)}. Consider reducing ${cat.label.toLowerCase()} spending.`
                  : `Under budget by ${formatCurrency(delta)}. Nice control on ${cat.label.toLowerCase()} spending.`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
