"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { INITIAL_TRANSACTIONS, DEFAULT_BUDGETS } from "@/lib/constants";
import {
  filterByMonth,
  sumByType,
  buildCategorySpend,
  todayISO,
} from "@/utils/finance";
import { Transaction, Budgets, TransactionType, CategoryId } from "@/types";
import { CATEGORIES } from "@/lib/constants";

export interface TransactionDraft {
  type: TransactionType;
  amount: string;
  category: CategoryId;
  description: string;
  date: string;
}

const DEFAULT_DRAFT: TransactionDraft = {
  type: "expense",
  amount: "",
  category: "food",
  description: "",
  date: todayISO(),
};

const now = new Date();

export function useFinance() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "flow_txns_v2",
    INITIAL_TRANSACTIONS,
  );
  const [budgets, setBudgets] = useLocalStorage<Budgets>(
    "flow_budgets_v2",
    DEFAULT_BUDGETS,
  );

  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const selectedYear = now.getFullYear();

  const [draft, setDraft] = useState<TransactionDraft>(DEFAULT_DRAFT);

  const monthTxns = filterByMonth(transactions, selectedMonth, selectedYear);

  const income = sumByType(monthTxns, "income");
  const expenses = sumByType(monthTxns, "expense");
  const net = income - expenses;

  const categorySpend = buildCategorySpend(monthTxns, CATEGORIES);

  function addTransaction(): boolean {
    if (!draft.amount || !draft.date) return false;
    const txn: Transaction = {
      id: Date.now(),
      type: draft.type,
      amount: Number(draft.amount),
      category: draft.category,
      description: draft.description,
      date: draft.date,
    };
    setTransactions((prev) => [...prev, txn]);
    setDraft(DEFAULT_DRAFT);
    return true;
  }

  function deleteTransaction(id: number) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function saveBudgets(next: Budgets) {
    setBudgets(next);
  }

  return {
    transactions,
    budgets,
    selectedMonth,
    selectedYear,
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
  };
}
