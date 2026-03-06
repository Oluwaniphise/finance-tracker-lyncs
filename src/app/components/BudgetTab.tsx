"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import { Budgets, BudgetTabProps } from "@/types";



export function BudgetTab({ budgets, onSave }: BudgetTabProps) {
  const [local, setLocal] = useState<Budgets>(budgets);

  function handleSave() {
    onSave(local);
  }

  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 max-w-md mx-auto">
      <p className="text-[11px] tracking-[0.12em] text-[#4b5563] uppercase">Monthly budgets</p>

      <div className="mt-5 flex flex-col gap-3.5">
        {CATEGORIES.map((cat) => (
          <label
            key={cat.id}
            className="flex flex-col gap-1.5 text-[12px] text-[#6b7280] tracking-wider uppercase"
          >
            {cat.icon} {cat.label}
            <input
              type="number"
              value={local[cat.id]}
              onChange={(e) =>
                setLocal((prev) => ({
                  ...prev,
                  [cat.id]: Number(e.target.value) || 0,
                }))
              }
              className="bg-[#0d0d14] border border-[#1e1e2e] rounded-lg px-3 py-2.5 text-[#f9fafb] text-[14px] outline-none focus:border-[#6366f1] transition-colors"
            />
          </label>
        ))}

        <button
          onClick={handleSave}
          className="bg-[#6366f1] hover:bg-[#4f52c9] text-white rounded-lg py-3 text-[14px] font-bold tracking-wider cursor-pointer transition-colors"
        >
          Save budgets
        </button>
      </div>
    </div>
  );
}
