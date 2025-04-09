import { pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const categoriesEnum = pgEnum("categories", [
  "Personal",
  "Work",
  "Finance",
  "Shopping",
  "Social",
  "Entertainment",
  "Gaming",
  "Travel",
  "Health",
  "Education",
  "Other",
]);

export const securityLevelsEnum = pgEnum("security_levels", [
  "Low",
  "Medium",
  "High",
]);

export const passwordsTable = pgTable("passwords", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  note: text("note"),
  category: categoriesEnum(categoriesEnum.enumValues[0]).notNull(),
  securityLevel: securityLevelsEnum(securityLevelsEnum.enumValues[0]).notNull(),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});
