import { getBudgets } from "@/app/api/budget/route";
import BudgetButton from "@/components/BudgetButton";
import BudgetCard from "@/components/BudgetCard";

async function Budgets() {
  const budgets = await getBudgets();

  return (
    <div className="h-[calc(100vh-69px)] w-auto p-10">
      <h1 className="font-bold text-5xl">My Budgets</h1>
      <div className="flex flex-wrap mt-10 gap-3">
        <BudgetButton />

        {budgets.data &&
          budgets.data.map(
            (budget: {
              icon: string;
              name: string;
              amount: number;
              spent: number;
              id: number;
            }) => <BudgetCard key={budget.id} budget={budget} />
          )}
      </div>
    </div>
  );
}

export default Budgets;
