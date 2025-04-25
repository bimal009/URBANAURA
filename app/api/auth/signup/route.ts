import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import * as bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = signupSchema.parse(body);

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .then((res) => res[0]);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db.insert(users).values({
      id: createId(),
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
    }).returning();

    return NextResponse.json(
      {
        message: "User created successfully",
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
} 