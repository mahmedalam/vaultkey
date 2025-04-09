CREATE TYPE "public"."categories" AS ENUM('Personal', 'Work', 'Finance', 'Shopping', 'Social', 'Entertainment', 'Gaming', 'Travel', 'Health', 'Education', 'Other');--> statement-breakpoint
CREATE TYPE "public"."security_levels" AS ENUM('Low', 'Medium', 'High');--> statement-breakpoint
ALTER TABLE "passwords" ADD COLUMN "Personal" "categories" NOT NULL;--> statement-breakpoint
ALTER TABLE "passwords" ADD COLUMN "Low" "security_levels" NOT NULL;