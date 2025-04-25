ALTER TABLE "products" ADD COLUMN "discount" numeric(5, 2) DEFAULT '0.00' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "category" text DEFAULT 'normal' NOT NULL;