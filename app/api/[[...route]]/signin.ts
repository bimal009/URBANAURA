import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { InsertUserSchema, users } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { db } from "@/db/db";
import * as bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";

const signup = new Hono()

.post(
  "/",
  zValidator("json", InsertUserSchema.pick({ username: true, email: true, password: true })),
  async (c) => {
    try {
      const { password, email, username } = await c.req.valid("json");

      if (!email || !password || !username) {
        return c.json({ message: "Fill the required fields" }, 400);
      }

      // Check if user exists by email OR username
      const existingUser = await db
        .select()
        .from(users)
        .where(
          or(
            eq(users.email, email.toLowerCase()),
            eq(users.username, username)
          )
        )
        .then((res) => res[0]);

      if (existingUser) {
        if (existingUser.email === email.toLowerCase()) {
          return c.json({ message: "Email already registered" }, 409);
        } else {
          return c.json({ message: "Username already taken" }, 409);
        }
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
      console.error("Error registering user:", error);
      return c.json({ error: "Failed to register user" }, 500);
    }
  }
);

export default signup;