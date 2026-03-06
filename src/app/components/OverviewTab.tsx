"use client";

import { CATEGORIES, CATEGORY_MAP } from "@/lib/constants";
import { formatCurrency, sumByCategory } from "@/utils/finance";
import { Donut } from "@/components/Donut";
import { SpendBar } from "@/components/SpendBar";
import { OverviewTabProps } from "@/types";
import { MONTHS } from "@/lib/constants";



export function OverviewTab({
  monthTxns,
  categorySpend,
  expenses,
  budgets,
  selectedMonth,
  onDelete,
}: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Donut + legend */}
      <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5">
        <p className="text-[11px] tracking-[0.12em] text-[#4b5563] uppercase">Spending breakdown</p>
        <div className="flex flex-col md:flex-row gap-6 items-center mt-4">
          <div className="relative shrink-0">
            <Donut data={categorySpend} total={expenses} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-[11px] text-[#6b7280]">total</p>
              <p className="text-[15px] font-bold text-[#f9fafb]">{formatCurrency(expenses)}</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            {categorySpend.map((c) => (
              <div key={c.id} className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
                  <span className="text-[13px] text-[#9ca3af]">{c.label}</span>
                </div>
                <span className="text-[13px] font-semibold text-[#f9fafb]">{formatCurrency(c.value)}</span>
              </div>
            ))}
            {categorySpend.length === 0 && (
              <span className="text-[13px] text-[#6b7280]">No expenses yet</span>
            )}
          </div>
        </div>
      </div>

      {/* Budget progress */}
      <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5">
        <p className="text-[11px] tracking-[0.12em] text-[#4b5563] uppercase">Budget status</p>
        <div className="mt-4 flex flex-col gap-3.5">
          {CATEGORIES.map((cat) => {
            const spent  = sumByCategory(monthTxns, cat.id);
            const budget = budgets[cat.id];
            const over   = spent > budget;
            const delta  = Math.abs(spent - budget);
            return (
              <div key={cat.id}>
                <div className="flex justify-between">
                  <span className="text-[13px] text-[#9ca3af]">{cat.icon} {cat.label}</span>
                  <span className={`text-[13px] font-semibold ${over ? "text-[#ef4444]" : "text-[#f9fafb]"}`}>
                    {formatCurrency(spent)}{" "}
                    <span className="text-[#4b5563] font-normal">/ {formatCurrency(budget)}</span>
                  </span>
                </div>
                <SpendBar spent={spent} budget={budget} color={cat.color} />
                <p className={`mt-1 text-[11px] ${over ? "text-[#ef4444]" : "text-[#10b981]"}`}>
                  {over
                    ? `Over budget by ${formatCurrency(delta)}. Consider reducing ${cat.label.toLowerCase()} spending.`
                    : `Under budget by ${formatCurrency(delta)}. Nice control on ${cat.label.toLowerCase()} spending.`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction list */}
      <div className="md:col-span-2 bg-[#111118] border border-[#1e1e2e] rounded-xl p-5">
        <p className="text-[11px] tracking-[0.12em] text-[#4b5563] uppercase">
          Transactions — {MONTHS[selectedMonth]}
        </p>
        <div className="mt-3 flex flex-col gap-0">
          {monthTxns.length === 0 && (
            <p className="text-[13px] text-[#6b7280] py-3">No transactions this month.</p>
          )}
          {[...monthTxns].reverse().map((t) => {
            const cat = CATEGORY_MAP[t.category];
            return (
              <div
                key={t.id}
                className="flex items-center gap-2.5 py-2.5 border-b border-[#1a1a26] last:border-0"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: cat?.color ?? "#6b7280" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-[#f9fafb] truncate">
                    {t.description || cat?.label}
                  </p>
                  <p className="text-[12px] text-[#4b5563]">
                    {cat?.label} · {t.date}
                  </p>
                </div>
                <span
                  className={`text-[14px] font-bold ${
                    t.type === "income" ? "text-[#10b981]" : "text-[#f9fafb]"
                  }`}
                >
                  {t.type === "income" ? "+" : "−"}{formatCurrency(t.amount)}
                </span>
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-[#374151] hover:text-[#9ca3af] text-[12px] px-1.5 py-0.5 rounded transition-colors cursor-pointer"
                  aria-label="Delete transaction"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
