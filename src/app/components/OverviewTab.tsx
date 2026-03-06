"use client";

import { BudgetStatusCard } from "@/components/BudgetStatusCard";
import { SpendingBreakdownCard } from "@/components/SpendingBreakdownCard";
import { TransactionListCard } from "@/components/TransactionListCard";
import { OverviewTabProps } from "@/types";

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
      <SpendingBreakdownCard categorySpend={categorySpend} expenses={expenses} />
      <BudgetStatusCard monthTxns={monthTxns} budgets={budgets} />
      <TransactionListCard
        monthTxns={monthTxns}
        selectedMonth={selectedMonth}
        onDelete={onDelete}
      />
    </div>
  );
}
