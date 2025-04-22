import { integer, pgTable, text ,decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});



export const products = pgTable("products", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    stock: integer("stock").default(0).notNull(),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
    status: text("status").default('pending'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });

  export const orderItems = pgTable("order_items", {
    id: text("id").primaryKey(),
    orderId: text("order_id").notNull(),
    productId: text("product_id").notNull(),
    quantity: integer("quantity").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  });
  
  
  export const InsertOrderItemSchema = createInsertSchema(orderItems);
  export const InsertOrderSchema = createInsertSchema(orders);
export const InsertProductSchema = createInsertSchema(products);
export const InsertUserSchema = createInsertSchema(users);
// npx drizzle-kit push to push inn data base