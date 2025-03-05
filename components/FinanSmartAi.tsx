"use client";
import getFinancialAdvice from "@/lib/generateAdvice";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
interface FinancialData {
  totalBudget: string | number;
  totalIncome: string | number;
  totalSpent: string | number;
}

function FinanSmartAi({ totalBudget, totalIncome, totalSpent }: FinancialData) {
  const [advice, setAdvice] = useState("");
  async function fetchAdvice() {
    const result = await getFinancialAdvice(
      totalBudget,
      totalIncome,
      totalSpent
    );
    if (result) {
      setAdvice(result);
    }
  }
  useEffect(() => {
    fetchAdvice();
  });
  return (
    <div className="h-auto w-full border border-white rounded-md p-5 my-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold flex gap-2 items-center">
            Spendly AI <Sparkles />
          </h1>
          {advice}
        </div>
      </div>
    </div>
  );
}

export default FinanSmartAi;
