import { Transaction, CategoryId, CategorySpend, Category } from "@/types";

/** Format a number as Nigerian Naira currency (no decimals). */
export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

/** Filter transactions to a specific month+year. */
export function filterByMonth(
  transactions: Transaction[],
  month: number,
  year: number
): Transaction[] {
  return transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
}

/** Sum amounts for a given transaction type. */
export function sumByType(
  transactions: Transaction[],
  type: "income" | "expense"
): number {
  return transactions
    .filter((t) => t.type === type)
    .reduce((acc, t) => acc + t.amount, 0);
}

/** Sum expenses for a single category. */
export function sumByCategory(
  transactions: Transaction[],
  categoryId: CategoryId
): number {
  return transactions
    .filter((t) => t.type === "expense" && t.category === categoryId)
    .reduce((acc, t) => acc + t.amount, 0);
}

/** Build per-category spend data (only categories with spend > 0). */
export function buildCategorySpend(
  transactions: Transaction[],
  categories: Category[]
): CategorySpend[] {
  return categories
    .map((cat) => ({
      ...cat,
      value: sumByCategory(transactions, cat.id),
    }))
    .filter((c) => c.value > 0);
}

/** Clamp a value between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Today's date as YYYY-MM-DD. */
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
