# Finance Tracker (Naira Budget App)

A simple personal finance tracker built with Next.js that lets you:
- add income/expense transactions,
- set monthly budgets by category,
- see over/under budget status,
- view spending distribution in a donut chart,
- persist data in localStorage.

## Stack
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Recharts (for donut chart)

## How To Run
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## What I Built And Why I Made Certain Choices
1. Currency set to Naira (`NGN`, `en-NG`) so all amounts render in local format.
Why: the app targets Nigerian usage and should display familiar money formatting.

2. Basic budget flow:
- budget input screen for per-category limits,
- budget status panel showing spent vs budget,
- helper text for over/under budget by amount.
Why: gives immediate feedback and makes budgeting actionable, not just descriptive.

3. Modular overview screen:
- `SpendingBreakdownCard`
- `BudgetStatusCard`
- `TransactionListCard`
Why: easier maintenance, clearer ownership, and simpler future feature changes.

4. Replaced custom donut SVG with Recharts.
Why: reduced manual chart logic and improved extensibility for tooltips/interaction.

5. localStorage state management via a custom `useLocalStorage` hook.
Why: lightweight persistence without backend setup.

## What I’d Improve With More Time
1. Add form validation and friendly error states (invalid amounts, future/past date rules, etc.).
2. Add transaction edit functionality and category-level filters.
3. Add automated tests (unit + component) for finance calculations and critical UI flows.
4. Add accessibility improvements (keyboard flows, aria messaging, contrast checks).
5. Add optional backend sync/auth so data persists across devices.

## Challenges I Faced
1. Import alias/file-structure mismatches during setup.
2. Tailwind/PostCSS scanner issues in dev environment.
3. Keeping UI refactors clean while preserving behavior and styles.
4. Ensuring old localStorage values did not override new Naira-oriented defaults.

## Time Spent (Approximate)
Around **5-7 hours** total, including setup fixes, refactors, chart integration, budget UX improvements, and cleanup.
