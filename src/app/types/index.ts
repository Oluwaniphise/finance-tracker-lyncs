import { TransactionDraft } from "../hooks/useFinance";

export type TransactionType = "income" | "expense";

export type CategoryId =
  | "housing"
  | "food"
  | "transport"
  | "health"
  | "leisure";

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  category: CategoryId;
  description: string;
  date: string; // YYYY-MM-DD
}

export interface Category {
  id: CategoryId;
  label: string;
  color: string;
  icon: string;
}

export interface BudgetTabProps {
  budgets: Budgets;
  onSave: (budgets: Budgets) => void;
}

export interface SpendBarProps {
  spent: number;
  budget: number;
  color: string;
}

export interface StatProps {
  label: string;
  value: string;
  accent: string;
}

export interface SummaryStripProps {
  income: number;
  expenses: number;
  net: number;
}

export interface DonutProps {
  data: CategorySpend[];
  total: number;
  size?: number;
  strokeWidth?: number;
}

export interface HeaderProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export interface AddTransactionTabProps {
  draft: TransactionDraft;
  onChange: (draft: TransactionDraft) => void;
  onSubmit: () => void;
}

export type Budgets = Record<CategoryId, number>;

export interface CategorySpend extends Category {
  value: number;
}

export type TabId = "overview" | "add" | "budget";

export type NavProps = {
  active: TabId;
  onChange: (tab: TabId) => void;
};


export interface OverviewTabProps {
  monthTxns:      Transaction[];
  categorySpend:  CategorySpend[];
  expenses:       number;
  budgets:        Budgets;
  selectedMonth:  number;
  onDelete:       (id: number) => void;
}