"use client";

import { useState } from "react";
import { useFinance } from "@/hooks/useFinance";
import { Header }           from "@/components/Header";
import { SummaryStrip }     from "@/components/SummaryStrip";
import { Nav, TabId }       from "@/components/Nav";
import { OverviewTab }      from "@/components/OverviewTab";
import { AddTransactionTab } from "@/components/AddTransactionTab";
import { BudgetTab }        from "@/components/BudgetTab";

export default function Page() {
  const [tab, setTab] = useState<TabId>("overview");

  const {
    budgets,
    selectedMonth,
    draft,
    monthTxns,
    income,
    expenses,
    net,
    categorySpend,
    setSelectedMonth,
    setDraft,
    addTransaction,
    deleteTransaction,
    saveBudgets,
  } = useFinance();

  function handleAddTransaction() {
    const ok = addTransaction();
    if (ok) setTab("overview");
  }

  return (
    <div className="min-h-screen bg-[#0d0d14] text-[#f9fafb] font-mono">
      <Header
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      <SummaryStrip income={income} expenses={expenses} net={net} />

      <Nav active={tab} onChange={setTab} />

      <main className="p-7">
        {tab === "overview" && (
          <OverviewTab
            monthTxns={monthTxns}
            categorySpend={categorySpend}
            expenses={expenses}
            budgets={budgets}
            selectedMonth={selectedMonth}
            onDelete={deleteTransaction}
          />
        )}

        {tab === "add" && (
          <AddTransactionTab
            draft={draft}
            onChange={setDraft}
            onSubmit={handleAddTransaction}
          />
        )}

        {tab === "budget" && (
          <BudgetTab
            budgets={budgets}
            onSave={(next) => { saveBudgets(next); setTab("overview"); }}
          />
        )}
      </main>
    </div>
  );
}
