import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, amount, budgetId } = await req.json();

    const parsedAmount = parseFloat(amount);
    const parsedBudgetId = parseInt(budgetId);
    if (!name || !amount || isNaN(parsedAmount) || !budgetId) {
      return NextResponse.json({ msg: "Invalid Fields" }, { status: 400 });
    }

    const userId = await getToken();

    if (!userId) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    const newExpense = await prisma.expenses.create({
      data: {
        name,
        amount: parsedAmount,
        userId,
        budgetId: parsedBudgetId,
      },
    });
    if (!newExpense) {
      return NextResponse.json({ msg: "Failed to create expense" });
    }

    const budget = await prisma.budgets.update({
      where: { id: parsedBudgetId },
      data: {
        spent: { increment: parsedAmount },
      },
    });
    if (!budget) {
      return NextResponse.json({ msg: "Failed to update budget" });
    }
    return NextResponse.json({ msg: "Created expense" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
export async function GET() {
  try {
    const userId = await getToken();

    if (!userId) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    const expenses = await prisma.expenses.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        amount: true,
        Budgets: true,
      },
    });

    if (expenses.length === 0) {
      return NextResponse.json({ msg: "No Expenses found" }, { status: 404 });
    }

    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
