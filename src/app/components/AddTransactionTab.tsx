"use client";

import { CATEGORIES } from "@/lib/constants";
import { TransactionDraft } from "@/hooks/useFinance";
import { TransactionType, CategoryId, AddTransactionTabProps } from "@/types";

export function AddTransactionTab({
  draft,
  onChange,
  onSubmit,
}: AddTransactionTabProps) {
  const setDraftField = (patch: Partial<TransactionDraft>) =>
    onChange({ ...draft, ...patch });

  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 max-w-md mx-auto">
      <p className="text-[11px] tracking-[0.12em] text-[#4b5563] uppercase">
        New transaction
      </p>

      <div className="mt-5 flex flex-col gap-3.5">
        {/* Type toggle */}
        <div className="flex gap-2">
          {(["expense", "income"] as TransactionType[]).map((t) => (
            <button
              key={t}
              onClick={() => setDraftField({ type: t })}
              className={`flex-1 py-2.5 rounded-lg border text-[13px] font-medium cursor-pointer transition-colors ${
                draft.type === t
                  ? t === "income"
                    ? "bg-[#0a1a12] border-[#10b981] text-[#10b981]"
                    : "bg-[#1a0a0a] border-[#ef4444] text-[#ef4444]"
                  : "bg-transparent border-[#1e1e2e] text-[#6b7280] hover:border-[#374151]"
              }`}
            >
              {t === "income" ? "Income" : "Expense"}
            </button>
          ))}
        </div>

        <Field label="Amount">
          <input
            type="number"
            placeholder="0"
            value={draft.amount}
            onChange={(e) => setDraftField({ amount: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Category">
          <select
            value={draft.category}
            onChange={(e) =>
              setDraftField({ category: e.target.value as CategoryId })
            }
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Description">
          <input
            type="text"
            placeholder="Optional note"
            value={draft.description}
            onChange={(e) => setDraftField({ description: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Date">
          <input
            type="date"
            value={draft.date}
            onChange={(e) => setDraftField({ date: e.target.value })}
            className={inputCls}
          />
        </Field>

        <button
          onClick={onSubmit}
          className="bg-[#6366f1] hover:bg-[#4f52c9] text-white rounded-lg py-3 text-[14px] font-bold tracking-wider cursor-pointer transition-colors"
        >
          Add transaction
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-[12px] text-[#6b7280] tracking-wider uppercase">
      {label}
      {children}
    </label>
  );
}

const inputCls =
  "bg-[#0d0d14] border border-[#1e1e2e] rounded-lg px-3 py-2.5 text-[#f9fafb] text-[14px] outline-none w-full focus:border-[#6366f1] transition-colors";
