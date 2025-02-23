import { getBudgets } from "@/app/api/budget/route";
import DashboardBudgetCard from "./DashboardBudgetCard";
import ExpenseListTable from "./ExpenseListTable";
import BarChartDashboard from "./BarChartDashboard";

async function DashboardMainContent() {
  const budgets = await getBudgets();
  const chartData = {
    data: budgets.data
      ? budgets.data.map(
          (budget: { name: string; amount: number; spent: number }) => ({
            name: budget.name,
            amount: budget.amount,
            spent: budget.spent,
          })
        )
      : [],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
      <div className="lg:col-span-2">
        <BarChartDashboard data={chartData.data} />
        <ExpenseListTable />
      </div>
      <div className="grid gap-5 border rounded-2xl shadow-lg shadow-gray-800 w-auto p-5">
        <h2 className="font-bold text-3xl my-2">Latest Budgets</h2>
        <div className="grid gap-5">
          {budgets.data &&
            budgets.data
              .slice(0, 4)
              .map(
                (budget: {
                  icon: string;
                  name: string;
                  amount: number;
                  spent: number;
                  id: number;
                }) => (
                  <div key={budget.id} className="w-full">
                    <DashboardBudgetCard budget={budget} />
                  </div>
                )
              )}
        </div>
      </div>
    </div>
  );
}

export default DashboardMainContent;
