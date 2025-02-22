"use client";
import useApp from "@/stores/useApp";
import AddIncome from "./_components/AddIncome";
import { useEffect } from "react";
import { Trash } from "lucide-react";

function Incomes() {
  const { incomeSources, fetchIncomeSources, deleteIncomeSource } = useApp();

  useEffect(() => {
    fetchIncomeSources();
  }, []);

  return (
    <div className="px-10 py-5">
      <h1 className="text-2xl font-bold mb-6">My Income Sources</h1>

      <div className="flex flex-wrap gap-4">
        <AddIncome />

        {incomeSources?.length === 0 ? (
          <p className="text-gray-500 text-lg font-medium mt-4">
            No income sources found.
          </p>
        ) : (
          incomeSources?.map((income) => (
            <div
              key={income.id}
              className="border w-[300px] h-[160px] rounded-lg p-4 shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{income.icon || "✅"}</span>
                <Trash className="cursor-pointer text-red-500 hover:text-red-700" onClick={()=>deleteIncomeSource(income.id)}/>
              </div>
              <p className="text-lg font-semibold">{income.name}</p>
              <p className="text-lg font-bold text-blue-600">${income.amount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Incomes;
