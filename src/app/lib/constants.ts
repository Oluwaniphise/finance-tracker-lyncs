import { Category, CategoryId, Budgets, Transaction } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "housing",   label: "Housing",   color: "#6366f1", icon: "⌂" },
  { id: "food",      label: "Food",      color: "#f59e0b", icon: "◈" },
  { id: "transport", label: "Transport", color: "#10b981", icon: "→" },
  { id: "health",    label: "Health",    color: "#ef4444", icon: "♡" },
  { id: "leisure",   label: "Leisure",   color: "#8b5cf6", icon: "✦" },
];

export const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
] as const;

export const DEFAULT_BUDGETS: Budgets = {
  housing:   500000,
  food:      180000,
  transport:  60000,
  health:     40000,
  leisure:    90000,
};

const pad = (n: number) => String(n).padStart(2, "0");
const now  = new Date();
const yr   = now.getFullYear();
const mo   = pad(now.getMonth() + 1);

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 1, type: "income",  amount: 1250000, category: "housing",   description: "Salary",             date: `${yr}-${mo}-01` },
  { id: 2, type: "expense", amount: 450000,  category: "housing",   description: "Rent",               date: `${yr}-${mo}-02` },
  { id: 3, type: "expense", amount: 120000,  category: "food",      description: "Groceries & dining", date: `${yr}-${mo}-05` },
  { id: 4, type: "expense", amount: 35000,   category: "transport", description: "Monthly pass",       date: `${yr}-${mo}-06` },
  { id: 5, type: "expense", amount: 25000,   category: "health",    description: "Gym",                date: `${yr}-${mo}-07` },
  { id: 6, type: "expense", amount: 60000,   category: "leisure",   description: "Concerts & books",   date: `${yr}-${mo}-10` },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
) as Record<CategoryId, Category>;
