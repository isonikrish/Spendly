"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function getDetails() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: number;
  };
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: decode.id,
      },
      select: {
        name: true,
        email: true,
        id: true,
        Budgets: {
          select: {
            amount: true,
            spent: true,
          },
        },
        Incomes: {
          select: {
            amount: true,
          },
        },
      },
    });

    let totalBudget = 0;
    let totalSpent = 0;
    let numberOfBudgets = 0;
    let totalIncome = 0;

    if (data && data.Budgets) {
      totalBudget = data.Budgets.reduce(
        (sum, budget) => sum + budget.amount,
        0
      );
      totalSpent = data.Budgets.reduce((sum, budget) => sum + budget.spent, 0);
      numberOfBudgets = data.Budgets.length;
    }

    if (data && data.Incomes) {
      totalIncome = data.Incomes.reduce(
        (sum, income) => sum + income.amount,
        0
      );
    }

    return {
      data,
      totalBudget,
      totalSpent,
      numberOfBudgets,
      totalIncome,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getExpenses() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: number;
  };
  try {
    const data = await prisma.expenses.findMany({
      where: {
        userId: decode.id,
      },
      select: {
        id: true,
        name: true,
        amount: true,
        createdAt: true,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
