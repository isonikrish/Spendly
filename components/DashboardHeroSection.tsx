import { getDetails } from "@/app/api/dashboard/route";
import FinanSmartAi from "./FinanSmartAi";
import { CircleDollarSign, PiggyBank, ReceiptText, Wallet } from "lucide-react";
import { JSX } from "react";

export default async function DashboardHeroSection() {
  const { data, totalBudget, totalSpent, numberOfBudgets, totalIncome } =
    await getDetails();
  return (
    <div>
      <h1 className="font-bold text-5xl">Hi, {data?.name} 👋 </h1>
      <p className="text-xl font-semibold text-[#bcbcbc] mt-2">
        Here&apos;s what happenning with your money, Let&apos;s Manage your
        expense
      </p>
      <FinanSmartAi />
      <div className="flex flex-wrap items-center mt-10 gap-5 w-full">
        <InfoCard
          title={"Total Budget"}
          amount={"₹" + totalBudget}
          icon={<PiggyBank />}
        />
        <InfoCard
          title={"Total Spend"}
          amount={"₹" + totalSpent}
          icon={<ReceiptText />}
        />
        <InfoCard
          title={"No. of Budgets"}
          amount={numberOfBudgets ?? 0}
          icon={<Wallet />}
        />
        <InfoCard
          title={"Total Income"}
          amount={"₹" + totalIncome}
          icon={<CircleDollarSign />}
        />
      </div>
    </div>
  );
}

function InfoCard({
  title,
  amount,
  icon,
}: {
  title: string;
  amount: string | number;
  icon: JSX.Element;
}) {
  return (
    <div className="border border-white rounded-sm p-5 m-2 flex items-center justify-around w-auto gap-10 flex-grow min-w-[200px]">
      <div className="flex flex-col items-center justify-center gap-5 text-cneter">
        <div className="font-semibold text-xl text-center">{title}</div>
        <div className="font-bold text-4xl text-green-500">{amount}</div>
      </div>
      <div className="flex justify-center items-center bg-[#193295] rounded-full size-20 p-4">
        {icon}
      </div>
    </div>
  );
}
