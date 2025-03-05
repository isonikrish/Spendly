"use server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function createBudget(name: string, amount: number, icon: string) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: number;
  };
  const userId = decoded.id;
  try {
    const budget = await prisma.budgets.create({
      data: {
        name,
        amount,
        icon,
        userId,
      },
    });
    return { success: true, data: budget };
  } catch (e) {
    return {
      success: false,
      message: {
        environmentName: "Server",
        error: e,
      },
    };
  }
}

export async function getBudgets() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: number;
  };
  const userId = decoded.id;
  try {
    const budgets = await prisma.budgets.findMany({
      where: {
        userId: Number(userId),
      },
    });
    return { success: true, data: budgets };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ msg: "No id provided" }, { status: 400 });
    }
    const parsedId = parseInt(id);
    const budget = await prisma.budgets.findUnique({
      where: { id: parsedId },
    });

    if (!budget) {
      return NextResponse.json({ msg: "No budget found" }, { status: 400 });
    }

    return NextResponse.json(budget, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
