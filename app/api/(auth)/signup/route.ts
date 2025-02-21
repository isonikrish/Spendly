import { createAccount } from "@/lib/zodSchemas";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validatedData = createAccount.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        { status: 400 }
      );
    }
    const { name, email, password } = validatedData.data;
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return NextResponse.json({ msg: "User already exists" }, { status: 400 });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    if (!newUser) {
      return NextResponse.json(
        { msg: "Error in creating a user" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        msg: "Successfull signup",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
