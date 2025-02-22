import { Progress } from "@/components/ui/progress";

interface Budget {
  icon: string;
  name: string;
  amount: number;
  spent: number;
}

export default function BudgetCard({ budget }: { budget: Budget }) {
  return (
    <div className="h-52 w-96 flex flex-col border-2 border-white rounded-lg p-6 mr-5 ">
      <div className="flex justify-between items-center h-14">
        <div className="flex justify-between items-center gap-3">
          <div className="h-16 w-16 border-white border rounded-full flex items-center justify-center p-5">
            <div className="h-full w-full flex justify-center items-center">
              {budget.icon}
            </div>
          </div>
          <div className="font-semibold text-2xl text-white">{budget.name}</div>
        </div>
        <div className="font-semibold text-3xl text-green-400  p-2 rounded-lg shadow-md">
          {`$${budget.amount}`}
        </div>
      </div>
      <div className="text-white my-6">
        <div className="flex justify-between items-center my-3  ">
          <div>{`$${budget.spent}`}</div>
          <div>{`$${budget.amount - budget.spent}`}</div>
        </div>
        <div>
          <Progress value={(budget.amount * budget.spent) / 100}></Progress>
        </div>
      </div>
    </div>
  );
}
