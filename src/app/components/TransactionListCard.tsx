"use client";

import { CATEGORY_MAP, MONTHS } from "@/lib/constants";
import { formatCurrency } from "@/utils/finance";
import { Transaction } from "@/types";

interface TransactionListCardProps {
  monthTxns: Transaction[];
  selectedMonth: number;
  onDelete: (id: number) => void;
}

export function TransactionListCard({
  monthTxns,
  selectedMonth,
  onDelete,
}: TransactionListCardProps) {
  return (
    <div className="md:col-span-2 bg-[#111118] border border-[#1e1e2e] rounded-xl p-5">
      <p className="text-[11px] tracking-[0.12em] text-[#4b5563] uppercase">
        Transactions - {MONTHS[selectedMonth]}
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
                <p className="text-[10px] md:text-sm text-[#4b5563]">
                  {cat?.label} - {t.date}
                </p>
              </div>
              <span
                className={`text-[14px] font-bold ${
                  t.type === "income" ? "text-[#10b981]" : "text-[#f9fafb]"
                }`}
              >
                {t.type === "income" ? "+" : "-"}
                {formatCurrency(t.amount)}
              </span>
              <button
                onClick={() => onDelete(t.id)}
                className="text-[#374151] hover:text-[#9ca3af] text-[12px] px-1.5 py-0.5 rounded transition-colors cursor-pointer"
                aria-label="Delete transaction"
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
