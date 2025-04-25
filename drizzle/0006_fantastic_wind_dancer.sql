ALTER TABLE "users" RENAME COLUMN "username" TO "name";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "role" TO "updated_at";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL;