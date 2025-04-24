import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import * as bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { tokenGen } from "@/utils/tokenGen";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .then((res) => res[0]);

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const token = await tokenGen({
      email: user.email,
      id: user.id,
    });

    return NextResponse.json(
      {
        message: "Login successful",
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
} 