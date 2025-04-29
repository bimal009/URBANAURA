import { integer, pgTable, text, decimal, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 5, scale: 2 }).default("0.00").notNull(),
  stock: integer("stock").default(0).notNull(),
  imageUrl: text("image_url"),
  category: text("category").default("normal").notNull(),
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

export const cart = pgTable("cart", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  productId: text("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  cart: many(cart),
}));

export const productsRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems),
  cart: many(cart),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const cartRelations = relations(cart, ({ one }) => ({
  user: one(users, {
    fields: [cart.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [cart.productId],
    references: [products.id],
  }),
}));

// Schemas
export const InsertOrderItemSchema = createInsertSchema(orderItems);
export const InsertOrderSchema = createInsertSchema(orders);
export const InsertProductSchema = createInsertSchema(products);
export const InsertUserSchema = createInsertSchema(users);
export const InsertCartSchema = createInsertSchema(cart);

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

// npx drizzle-kit push to push inn data base