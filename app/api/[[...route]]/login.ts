import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { InsertUserSchema, users } from "@/db/schema";
import { db } from "@/db/db";
import * as bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { tokenGen } from "@/utils/tokenGen";

const login = new Hono();

login.post(
  "/",
  zValidator("json", InsertUserSchema.pick({ email: true, password: true })),
  async (c) => {
    try {
      const { email, password } = await c.req.valid("json");

      if (!email || !password) {
        return c.json({ error: "Please provide both email and password." }, 400);
      }

      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email.toLowerCase()))
        .then((res) => res[0]);

      if (!user) {
        return c.json({ error: "User does not exist." }, 404);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return c.json({ error: "Incorrect password." }, 401);
      }

      const token = await tokenGen({
        email: user.email,
        id: user.id,
      });

      return c.json({
        message: "Login successful",
        token,
      }, 200);

    } catch (error) {
      console.error("Login error:", error);
      return c.json({ error: "An error occurred during login." }, 500);
    }
  }
);

export default login;
