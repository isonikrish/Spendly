import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { emojiIcon, sourceName, amount } = await req.json();

    const parsedAmount = parseInt(amount, 10);
    if (!emojiIcon || !sourceName || isNaN(parsedAmount)) {
      return NextResponse.json({ msg: "Invalid Fields" }, { status: 400 });
    }

    const userId = await getToken();

    if (!userId) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const newIncomeSource = await prisma.incomes.create({
      data: {
        icon: emojiIcon,
        name: sourceName,
        amount: parsedAmount,
        userId,
      },
    });
    if (!newIncomeSource) {
      return NextResponse.json(
        { msg: "Failed to add new income source" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { msg: "Added new income source" },
      { status: 200 }
    );
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

    const incomeSources = await prisma.incomes.findMany({
      where: {
        userId,
      },
    });
    if (incomeSources.length === 0) {
      return NextResponse.json(
        { msg: "No income source added" },
        { status: 404 }
      );
    }

    return NextResponse.json(incomeSources, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ msg: "No id provided" }, { status: 400 });
    }
    const parsedId = parseInt(id);
    await prisma.incomes.delete({
      where: { id: parsedId },
    });
    return NextResponse.json({ msg: "Deleted Income Source" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
