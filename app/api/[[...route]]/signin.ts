import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { InsertUserSchema, users } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { db } from "@/db/db";
import * as bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

const signin = new Hono()

.post(
  "/",
  zValidator("json", InsertUserSchema.pick({ username: true, email: true, password: true })),
  async (c) => {
    try {
      const { password, email, username } = await c.req.valid("json");

      if (!email || !password || !username) {
        return c.json({ message: "Fill the required fields" }, 400);
      }

    
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email.toLowerCase()))
        .then((res) => res[0]);

      if (existingUser) {
        return c.json({ message: "User already exists" }, 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [newUser] = await db.insert(users).values({
        id: createId(),
        email: email.toLowerCase(),
        username,
        password: hashedPassword,
      }).returning();

      return c.json(
        {
          message: "User created successfully",
          data: newUser,
        },
        201
      );
    } catch (error) {
      console.error("Error inserting user:", error);
      return c.json({ error: "Failed to insert user" }, 500);
    }
  }
);

export default signin;
