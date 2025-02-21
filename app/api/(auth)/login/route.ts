import { loginSchema } from "@/lib/zodSchemas";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "@/lib/generateToken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validatedData = loginSchema.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        { status: 400 }
      );
    }
    const { email, password } = validatedData.data;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return NextResponse.json({ msg: "No user found" }, { status: 400 });
    }
    const passwordCompared = await bcrypt.compare(password, user.password);
    if (!passwordCompared) {
      return NextResponse.json({ msg: "Incorrect password" }, { status: 400 });
    }

    const response = NextResponse.json({ msg: "Success" }, { status: 200 });
    if (!user?.id) {
      return NextResponse.json({ id: user?.id, name: user?.name, email: user?.email, password: user?.password }, { status: 500 });
    }
    const res = generateTokenAndSetCookie(user?.id, response);
    return res;
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
