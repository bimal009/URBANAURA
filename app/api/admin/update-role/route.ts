import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import jwt from "jsonwebtoken";

const updateRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["user", "admin"]),
});

export async function POST(request: Request) {
  try {
    // Get the token from the request headers
    const token = request.headers.get("authorization")?.split(" ")[1];
    
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify the token and check if the user is an admin
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
    
    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Only admins can update roles" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, role } = updateRoleSchema.parse(body);

    // Update the user's role
    const [updatedUser] = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User role updated successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
} 