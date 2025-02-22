import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const id = await getToken();
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return NextResponse.json({ msg: "No User found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (_error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
